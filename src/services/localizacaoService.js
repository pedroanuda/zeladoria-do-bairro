import db from '../common/db.js';
import { Localizacao } from '../common/models/index.js';
import { bairroService } from './bairroService.js';

function hydrateLocalizacao(localizacao) {
  if (!localizacao) return null;
  const bairro = bairroService.getById(localizacao.bairroId);

  return Object.assign(
    Object.create(Object.getPrototypeOf(localizacao)),
    localizacao,
    { bairro },
  );
}

export const localizacaoService = {
  getAll() {
    return db.getAllFrom('localizacoes').map(hydrateLocalizacao);
  },

  getById(id) {
    const localizacao = db.getById('localizacoes', Number(id));
    return hydrateLocalizacao(localizacao);
  },

  getByBairro(bairroId) {
    return db
      .getBy('localizacoes', (loc) => loc.bairroId === Number(bairroId))
      .map(hydrateLocalizacao);
  },

  create(data) {
    const novaLocalizacao =
      data instanceof Localizacao ? data : new Localizacao(data);
    const saved = db.writeEntity('localizacoes', novaLocalizacao);
    return hydrateLocalizacao(saved);
  },
};

export default localizacaoService;
