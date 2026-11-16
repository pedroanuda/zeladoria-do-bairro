import db from '../common/db.js';
import { Usuario } from '../common/models/index.js';
import { bairroService } from './bairroService.js';

function hydrateUsuario(usuario) {
  if (!usuario) return null;
  const bairro = bairroService.getById(usuario.bairroId);

  return Object.assign(Object.create(Object.getPrototypeOf(usuario)), usuario, {
    bairro,
  });
}

export const usuarioService = {
  getAll() {
    return db.getAllFrom('usuarios').map(hydrateUsuario);
  },

  getById(id) {
    const usuario = db.getById('usuarios', Number(id));
    return hydrateUsuario(usuario);
  },

  getByBairro(bairroId) {
    return db
      .getBy('usuarios', (user) => user.bairroId === Number(bairroId))
      .map(hydrateUsuario);
  },

  getCurrentUser() {
    // Retorna a usuária padrão logada na simulação (Ana Beatriz Silva - ID 1)
    return this.getById(1);
  },

  create(data) {
    const novoUsuario = data instanceof Usuario ? data : new Usuario(data);
    const saved = db.writeEntity('usuarios', novoUsuario);
    return hydrateUsuario(saved);
  },
};

export default usuarioService;
