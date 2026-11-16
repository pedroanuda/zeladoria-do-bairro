import db from '../common/db.js';
import { Evento, Participacao } from '../common/models/index.js';
import { bairroService } from './bairroService.js';
import { localizacaoService } from './localizacaoService.js';
import { usuarioService } from './usuarioService.js';

function hydrateParticipacao(participacao) {
  if (!participacao) return null;
  const usuario = usuarioService.getById(participacao.usuarioId);

  return Object.assign(
    Object.create(Object.getPrototypeOf(participacao)),
    participacao,
    { usuario },
  );
}

function hydrateEvento(evento) {
  if (!evento) return null;

  const criador = usuarioService.getById(evento.criadorId);
  const bairro = bairroService.getById(evento.bairroId);
  const localizacao = evento.localizacaoId
    ? localizacaoService.getById(evento.localizacaoId)
    : null;
  const participacoes = db
    .getBy('participacoes', (part) => part.eventoId === evento.id)
    .map(hydrateParticipacao);
  const participantes = participacoes
    .map((part) => part.usuario)
    .filter(Boolean);

  return Object.assign(Object.create(Object.getPrototypeOf(evento)), evento, {
    criador,
    bairro,
    localizacao,
    participacoes,
    participantes,
  });
}

export const eventoService = {
  getAll() {
    return db.getAllFrom('eventos').map(hydrateEvento);
  },

  getById(id) {
    const evento = db.getById('eventos', Number(id));
    return hydrateEvento(evento);
  },

  getByBairro(bairroId) {
    return db
      .getBy('eventos', (evento) => evento.bairroId === Number(bairroId))
      .map(hydrateEvento);
  },

  create(data) {
    const novoEvento = data instanceof Evento ? data : new Evento(data);
    const saved = db.writeEntity('eventos', novoEvento);
    return hydrateEvento(saved);
  },

  confirmarParticipacao(eventoId, usuarioId) {
    const existing = db.getBy(
      'participacoes',
      (part) =>
        part.eventoId === Number(eventoId) &&
        part.usuarioId === Number(usuarioId),
    );

    if (existing.length > 0) {
      return hydrateParticipacao(existing[0]);
    }

    const novaParticipacao = new Participacao({
      eventoId: Number(eventoId),
      usuarioId: Number(usuarioId),
      confirmadaEm: new Date(),
    });

    const saved = db.writeEntity('participacoes', novaParticipacao);
    return hydrateParticipacao(saved);
  },
};

export default eventoService;
