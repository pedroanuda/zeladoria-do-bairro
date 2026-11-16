import db from '../common/db.js';
import {
  Anexo,
  Ocorrencia,
  OcorrenciaAtualizacao,
} from '../common/models/index.js';
import { localizacaoService } from './localizacaoService.js';
import { usuarioService } from './usuarioService.js';

function hydrateOcorrenciaAtualizacao(atualizacao) {
  if (!atualizacao) return null;
  const autor = usuarioService.getById(atualizacao.autorId);

  return Object.assign(
    Object.create(Object.getPrototypeOf(atualizacao)),
    atualizacao,
    { autor },
  );
}

function hydrateOcorrencia(ocorrencia) {
  if (!ocorrencia) return null;

  const localizacao = localizacaoService.getById(ocorrencia.localizacaoId);
  const bairro = localizacao?.bairro ?? null;
  const solicitante = usuarioService.getById(ocorrencia.solicitanteId);
  const atribuidoPara = ocorrencia.atribuidoParaId
    ? usuarioService.getById(ocorrencia.atribuidoParaId)
    : null;
  const atualizacoes = (ocorrencia.atualizacoes ?? []).map(
    hydrateOcorrenciaAtualizacao,
  );
  const anexos = (ocorrencia.anexos ?? []).map((anexo) =>
    anexo instanceof Anexo ? anexo : new Anexo(anexo),
  );

  return Object.assign(
    Object.create(Object.getPrototypeOf(ocorrencia)),
    ocorrencia,
    {
      localizacao,
      bairro,
      solicitante,
      atribuidoPara,
      atualizacoes,
      anexos,
    },
  );
}

export const ocorrenciaService = {
  getAll() {
    return db.getAllFrom('ocorrencias').map(hydrateOcorrencia);
  },

  getById(id) {
    const ocorrencia = db.getById('ocorrencias', Number(id));
    return hydrateOcorrencia(ocorrencia);
  },

  getBySolicitante(solicitanteId) {
    return db
      .getBy(
        'ocorrencias',
        (ocorrencia) => ocorrencia.solicitanteId === Number(solicitanteId),
      )
      .map(hydrateOcorrencia);
  },

  getByBairro(bairroId) {
    return this.getAll().filter(
      (ocorrencia) => ocorrencia.localizacao?.bairroId === Number(bairroId),
    );
  },

  getByStatus(status) {
    return db
      .getBy('ocorrencias', (ocorrencia) => ocorrencia.status === status)
      .map(hydrateOcorrencia);
  },

  create(data) {
    const novaOcorrencia =
      data instanceof Ocorrencia ? data : new Ocorrencia(data);
    const saved = db.writeEntity('ocorrencias', novaOcorrencia);
    return hydrateOcorrencia(saved);
  },

  addAtualizacao(ocorrenciaId, atualizacaoData) {
    const ocorrencia = db.getById('ocorrencias', Number(ocorrenciaId));
    if (!ocorrencia) return null;

    const nextAtualizacaoId =
      (ocorrencia.atualizacoes?.reduce(
        (max, item) => (item.id > max ? item.id : max),
        0,
      ) ?? 0) + 1;

    const novaAtualizacao =
      atualizacaoData instanceof OcorrenciaAtualizacao
        ? atualizacaoData
        : new OcorrenciaAtualizacao({
            id: nextAtualizacaoId,
            ...atualizacaoData,
          });

    if (!novaAtualizacao.id) novaAtualizacao.id = nextAtualizacaoId;

    ocorrencia.atualizacoes.push(novaAtualizacao);
    if (novaAtualizacao.status) {
      ocorrencia.status = novaAtualizacao.status;
    }

    db.writeEntity('ocorrencias', ocorrencia);
    return hydrateOcorrencia(ocorrencia);
  },

  apoiar(ocorrenciaId) {
    const ocorrencia = db.getById('ocorrencias', Number(ocorrenciaId));
    if (!ocorrencia) return null;

    ocorrencia.apoios = (ocorrencia.apoios ?? 0) + 1;
    db.writeEntity('ocorrencias', ocorrencia);
    return hydrateOcorrencia(ocorrencia);
  },
};

export default ocorrenciaService;
