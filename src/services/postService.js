import db from '../common/db.js';
import { Comentario, Post } from '../common/models/index.js';
import { bairroService } from './bairroService.js';
import { usuarioService } from './usuarioService.js';

function hydrateComentario(comentario) {
  if (!comentario) return null;
  const autor = usuarioService.getById(comentario.autorId);

  return Object.assign(
    Object.create(Object.getPrototypeOf(comentario)),
    comentario,
    { autor },
  );
}

function hydratePost(post) {
  if (!post) return null;

  const autor = usuarioService.getById(post.autorId);
  const bairro = bairroService.getById(post.bairroId);
  const comentarios = (post.comentarios ?? []).map(hydrateComentario);

  return Object.assign(Object.create(Object.getPrototypeOf(post)), post, {
    autor,
    bairro,
    comentarios,
  });
}

export const postService = {
  getAll() {
    return db.getAllFrom('posts').map(hydratePost);
  },

  getById(id) {
    const post = db.getById('posts', Number(id));
    return hydratePost(post);
  },

  getByBairro(bairroId) {
    return db
      .getBy('posts', (post) => post.bairroId === Number(bairroId))
      .map(hydratePost);
  },

  create(data) {
    const novoPost = data instanceof Post ? data : new Post(data);
    const saved = db.writeEntity('posts', novoPost);
    return hydratePost(saved);
  },

  addComentario(postId, comentarioData) {
    const post = db.getById('posts', Number(postId));
    if (!post) return null;

    const nextComentarioId =
      (post.comentarios?.reduce(
        (max, item) => (item.id > max ? item.id : max),
        0,
      ) ?? 0) + 1;

    const novoComentario =
      comentarioData instanceof Comentario
        ? comentarioData
        : new Comentario({ id: nextComentarioId, ...comentarioData });

    if (!novoComentario.id) novoComentario.id = nextComentarioId;

    post.comentarios.push(novoComentario);
    db.writeEntity('posts', post);
    return hydratePost(post);
  },

  apoiar(postId) {
    const post = db.getById('posts', Number(postId));
    if (!post) return null;

    post.apoios = (post.apoios ?? 0) + 1;
    db.writeEntity('posts', post);
    return hydratePost(post);
  },
};

export default postService;
