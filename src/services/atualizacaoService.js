import db from '../common/db.js';
import { Anexo, Atualizacao } from '../common/models/index.js';
import { bairroService } from './bairroService.js';
import { usuarioService } from './usuarioService.js';

function hydrateAtualizacao(atualizacao) {
  if (!atualizacao) return null;

  const autor = usuarioService.getById(atualizacao.autorId);
  const bairro = bairroService.getById(atualizacao.bairroId);
  const anexos = (atualizacao.anexos ?? []).map((anexo) =>
    anexo instanceof Anexo ? anexo : new Anexo(anexo),
  );

  return Object.assign(
    Object.create(Object.getPrototypeOf(atualizacao)),
    atualizacao,
    {
      autor,
      bairro,
      anexos,
    },
  );
}

export const atualizacaoService = {
  getAll() {
    return db.getAllFrom('atualizacoes').map(hydrateAtualizacao);
  },

  getById(id) {
    const atualizacao = db.getById('atualizacoes', Number(id));
    return hydrateAtualizacao(atualizacao);
  },

  getByBairro(bairroId) {
    return db
      .getBy('atualizacoes', (atu) => atu.bairroId === Number(bairroId))
      .map(hydrateAtualizacao);
  },

  getByTipo(tipo) {
    return db
      .getBy('atualizacoes', (atu) => atu.tipo === tipo)
      .map(hydrateAtualizacao);
  },

  create(data) {
    const novaAtualizacao =
      data instanceof Atualizacao ? data : new Atualizacao(data);
    const saved = db.writeEntity('atualizacoes', novaAtualizacao);
    return hydrateAtualizacao(saved);
  },
};

export default atualizacaoService;
