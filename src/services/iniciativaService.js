import db from '../common/db.js';
import { Iniciativa } from '../common/models/index.js';
import { bairroService } from './bairroService.js';
import { eventoService } from './eventoService.js';
import { ocorrenciaService } from './ocorrenciaService.js';
import { usuarioService } from './usuarioService.js';

function hydrateIniciativa(iniciativa) {
  if (!iniciativa) return null;

  const criador = usuarioService.getById(iniciativa.criadorId);
  const bairro = bairroService.getById(iniciativa.bairroId);
  const eventoRelacionado = iniciativa.eventoRelacionadoId
    ? eventoService.getById(iniciativa.eventoRelacionadoId)
    : null;
  const demandaRelacionada = iniciativa.demandaRelacionadaId
    ? ocorrenciaService.getById(iniciativa.demandaRelacionadaId)
    : null;

  return Object.assign(
    Object.create(Object.getPrototypeOf(iniciativa)),
    iniciativa,
    {
      criador,
      bairro,
      eventoRelacionado,
      demandaRelacionada,
    },
  );
}

export const iniciativaService = {
  getAll() {
    return db.getAllFrom('iniciativas').map(hydrateIniciativa);
  },

  getById(id) {
    const iniciativa = db.getById('iniciativas', Number(id));
    return hydrateIniciativa(iniciativa);
  },

  getByBairro(bairroId) {
    return db
      .getBy('iniciativas', (ini) => ini.bairroId === Number(bairroId))
      .map(hydrateIniciativa);
  },

  create(data) {
    const novaIniciativa =
      data instanceof Iniciativa ? data : new Iniciativa(data);
    const saved = db.writeEntity('iniciativas', novaIniciativa);
    return hydrateIniciativa(saved);
  },
};

export default iniciativaService;
