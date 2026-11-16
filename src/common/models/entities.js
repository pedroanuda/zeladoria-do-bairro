import {
  CargoUsuario,
  PrioridadeOcorrencia,
  StatusOcorrencia,
  TipoAtualizacao,
} from './enums.js';

export class Bairro {
  constructor({ id = null, nome, cidade, uf }) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    this.uf = uf;
  }
}

export class Localizacao {
  constructor({
    id = null,
    logradouro,
    numero = 'S/N',
    complemento = '',
    cep = '',
    pontoReferencia = '',
    bairroId,
  }) {
    this.id = id;
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.cep = cep;
    this.pontoReferencia = pontoReferencia;
    this.bairroId = bairroId;
  }
}

export class Usuario {
  constructor({
    id = null,
    nome,
    email,
    telefone,
    cargo = CargoUsuario.MORADOR,
    bairroId,
  }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cargo = cargo;
    this.bairroId = bairroId;
  }
}

export class Anexo {
  constructor({ id = null, nome, tipo, tamanho, caminho }) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.tamanho = tamanho;
    this.caminho = caminho;
  }
}

export class OcorrenciaAtualizacao {
  constructor({ id = null, status, observacao, autorId, data = new Date() }) {
    this.id = id;
    this.status = status;
    this.observacao = observacao;
    this.autorId = autorId;
    this.data = data instanceof Date ? data : new Date(data);
  }
}

export class Ocorrencia {
  constructor({
    id = null,
    titulo,
    descricao,
    localizacaoId,
    anexos = [],
    categoria,
    status = StatusOcorrencia.ABERTA,
    solicitanteId,
    apoios = 0,
    prioridade = PrioridadeOcorrencia.MEDIA,
    dataCriacao = new Date(),
    atualizacoes = [],
    atribuidoParaId = null,
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.localizacaoId = localizacaoId;
    this.anexos = anexos.map((anexo) =>
      anexo instanceof Anexo ? anexo : new Anexo(anexo),
    );
    this.categoria = categoria;
    this.status = status;
    this.solicitanteId = solicitanteId;
    this.apoios = apoios;
    this.prioridade = prioridade;
    this.dataCriacao =
      dataCriacao instanceof Date ? dataCriacao : new Date(dataCriacao);
    this.atualizacoes = atualizacoes.map((atualizacao) =>
      atualizacao instanceof OcorrenciaAtualizacao
        ? atualizacao
        : new OcorrenciaAtualizacao(atualizacao),
    );
    this.atribuidoParaId = atribuidoParaId;
  }
}

export class Evento {
  constructor({
    id = null,
    nome,
    descricao,
    data,
    marcadoEm = new Date(),
    criadorId,
    bairroId,
    localizacaoId = null,
  }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data instanceof Date ? data : new Date(data);
    this.marcadoEm =
      marcadoEm instanceof Date ? marcadoEm : new Date(marcadoEm);
    this.criadorId = criadorId;
    this.bairroId = bairroId;
    this.localizacaoId = localizacaoId;
  }
}

export class Participacao {
  constructor({ id = null, eventoId, usuarioId, confirmadaEm = new Date() }) {
    this.id = id;
    this.eventoId = eventoId;
    this.usuarioId = usuarioId;
    this.confirmadaEm =
      confirmadaEm instanceof Date ? confirmadaEm : new Date(confirmadaEm);
  }
}

export class Iniciativa {
  constructor({
    id = null,
    nome,
    descricao,
    eventoRelacionadoId = null,
    demandaRelacionadaId = null,
    criadorId,
    bairroId,
  }) {
    if (eventoRelacionadoId !== null && demandaRelacionadaId !== null) {
      throw new Error(
        'Uma iniciativa deve estar relacionada a uma ocorrência OU a um evento, não a ambos simultaneamente.',
      );
    }

    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.eventoRelacionadoId = eventoRelacionadoId;
    this.demandaRelacionadaId = demandaRelacionadaId;
    this.criadorId = criadorId;
    this.bairroId = bairroId;
  }
}

export class Atualizacao {
  constructor({
    id = null,
    titulo,
    conteudo,
    tipo = TipoAtualizacao.COMUNICADO,
    anexos = [],
    autorId,
    bairroId,
    dataCriacao = new Date(),
  }) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.tipo = tipo;
    this.anexos = anexos.map((anexo) =>
      anexo instanceof Anexo ? anexo : new Anexo(anexo),
    );
    this.autorId = autorId;
    this.bairroId = bairroId;
    this.dataCriacao =
      dataCriacao instanceof Date ? dataCriacao : new Date(dataCriacao);
  }
}

export class Comentario {
  constructor({ id = null, conteudo, autorId, dataCriacao = new Date() }) {
    this.id = id;
    this.conteudo = conteudo;
    this.autorId = autorId;
    this.dataCriacao =
      dataCriacao instanceof Date ? dataCriacao : new Date(dataCriacao);
  }
}

export class Post {
  constructor({
    id = null,
    titulo,
    conteudo,
    autorId,
    bairroId,
    apoios = 0,
    dataCriacao = new Date(),
    comentarios = [],
  }) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.autorId = autorId;
    this.bairroId = bairroId;
    this.apoios = apoios;
    this.dataCriacao =
      dataCriacao instanceof Date ? dataCriacao : new Date(dataCriacao);
    this.comentarios = comentarios.map((comentario) =>
      comentario instanceof Comentario
        ? comentario
        : new Comentario(comentario),
    );
  }
}
