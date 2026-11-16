import {
  Anexo,
  Atualizacao,
  Bairro,
  CargoUsuario,
  CategoriaOcorrencia,
  Comentario,
  Evento,
  Iniciativa,
  Localizacao,
  Ocorrencia,
  OcorrenciaAtualizacao,
  Participacao,
  Post,
  PrioridadeOcorrencia,
  StatusOcorrencia,
  TipoAtualizacao,
  Usuario,
} from './models/index.js';

const bairros = [
  new Bairro({
    id: 1,
    nome: 'Vila Mariana',
    cidade: 'São Paulo',
    uf: 'SP',
  }),
  new Bairro({
    id: 2,
    nome: 'Pinheiros',
    cidade: 'São Paulo',
    uf: 'SP',
  }),
  new Bairro({
    id: 3,
    nome: 'Mooca',
    cidade: 'São Paulo',
    uf: 'SP',
  }),
];

const localizacoes = [
  new Localizacao({
    id: 1,
    logradouro: 'Rua Domingos de Morais',
    numero: '1850',
    complemento: 'Em frente à saída do metrô',
    cep: '04010-200',
    pontoReferencia: 'Estação Vila Mariana',
    bairroId: 1,
  }),
  new Localizacao({
    id: 2,
    logradouro: 'Rua França Pinto',
    numero: '412',
    complemento: 'Calçada lateral',
    cep: '04016-002',
    pontoReferencia: 'Próximo à padaria esquina com Rua Morgado de Mateus',
    bairroId: 1,
  }),
  new Localizacao({
    id: 3,
    logradouro: 'Praça Nossa Senhora Aparecida',
    numero: 'S/N',
    complemento: 'Canteiro central',
    cep: '04075-010',
    pontoReferencia: 'Ao lado do parquinho infantil',
    bairroId: 1,
  }),
  new Localizacao({
    id: 4,
    logradouro: 'Rua Joaquim Távora',
    numero: '980',
    complemento: '',
    cep: '04015-012',
    pontoReferencia: 'Em frente ao ponto de ônibus',
    bairroId: 1,
  }),
  new Localizacao({
    id: 5,
    logradouro: 'Rua dos Pinheiros',
    numero: '620',
    complemento: '',
    cep: '05422-001',
    pontoReferencia: 'Esquina com Rua Joaquim Antunes',
    bairroId: 2,
  }),
  new Localizacao({
    id: 6,
    logradouro: 'Praça Benedito Calixto',
    numero: 'S/N',
    complemento: 'Área da feira de antiguidades',
    cep: '05406-040',
    pontoReferencia: 'Coreto central da praça',
    bairroId: 2,
  }),
  new Localizacao({
    id: 7,
    logradouro: 'Rua da Mooca',
    numero: '2450',
    complemento: '',
    cep: '03104-003',
    pontoReferencia: 'Próximo ao Largo São Rafael',
    bairroId: 3,
  }),
  new Localizacao({
    id: 8,
    logradouro: 'Rua Juventus',
    numero: '690',
    complemento: 'Portão principal',
    cep: '03124-020',
    pontoReferencia: 'Em frente ao Clube Atlético Juventus',
    bairroId: 3,
  }),
];

const usuarios = [
  new Usuario({
    id: 1,
    nome: 'Ana Beatriz Silva',
    email: 'ana.silva@email.com',
    telefone: '(11) 98765-4321',
    cargo: CargoUsuario.MORADOR,
    bairroId: 1,
  }),
  new Usuario({
    id: 2,
    nome: 'Carlos Eduardo Mendes',
    email: 'carlos.mendes@email.com',
    telefone: '(11) 97654-3210',
    cargo: CargoUsuario.LIDER_COMUNITARIO,
    bairroId: 1,
  }),
  new Usuario({
    id: 3,
    nome: 'Roberto Alves (Subprefeitura)',
    email: 'roberto.zeladoria@prefeitura.sp.gov.br',
    telefone: '(11) 96543-2109',
    cargo: CargoUsuario.ZELADOR,
    bairroId: 1,
  }),
  new Usuario({
    id: 4,
    nome: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    telefone: '(11) 95432-1098',
    cargo: CargoUsuario.MORADOR,
    bairroId: 1,
  }),
  new Usuario({
    id: 5,
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    telefone: '(11) 94321-0987',
    cargo: CargoUsuario.LIDER_COMUNITARIO,
    bairroId: 2,
  }),
  new Usuario({
    id: 6,
    nome: 'Paulo Henrique Souza',
    email: 'paulo.souza@prefeitura.sp.gov.br',
    telefone: '(11) 93210-9876',
    cargo: CargoUsuario.GESTOR,
    bairroId: 2,
  }),
  new Usuario({
    id: 7,
    nome: 'Giuseppe Romano',
    email: 'giuseppe.romano@email.com',
    telefone: '(11) 92109-8765',
    cargo: CargoUsuario.MORADOR,
    bairroId: 3,
  }),
];

const ocorrencias = [
  // Cenário 1: Em andamento, com múltiplos anexos, histórico de atualizações e atribuída a um zelador
  new Ocorrencia({
    id: 1,
    titulo: 'Buraco profundo na ciclovia da Domingos de Morais',
    descricao:
      'Há um buraco grande na faixa da ciclovia que já causou quedas de ciclistas. O asfalto cedeu após as últimas chuvas.',
    localizacaoId: 1,
    anexos: [
      new Anexo({
        id: 1,
        nome: 'buraco-ciclovia-frente.jpg',
        tipo: 'image/jpeg',
        tamanho: 425984,
        caminho: '/uploads/ocorrencias/buraco-ciclovia-frente.jpg',
      }),
      new Anexo({
        id: 2,
        nome: 'buraco-ciclovia-detalhe.jpg',
        tipo: 'image/jpeg',
        tamanho: 318464,
        caminho: '/uploads/ocorrencias/buraco-ciclovia-detalhe.jpg',
      }),
    ],
    categoria: CategoriaOcorrencia.PAVIMENTACAO,
    status: StatusOcorrencia.EM_ANDAMENTO,
    solicitanteId: 1,
    apoios: 24,
    prioridade: PrioridadeOcorrencia.ALTA,
    dataCriacao: new Date('2026-11-02T09:15:00-03:00'),
    atribuidoParaId: 3,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 1,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Ocorrência registrada pelo morador.',
        autorId: 1,
        data: new Date('2026-11-02T09:15:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 2,
        status: StatusOcorrencia.EM_ANALISE,
        observacao:
          'Vistoria técnica agendada para avaliação da sub-base da ciclovia.',
        autorId: 3,
        data: new Date('2026-11-04T14:30:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 3,
        status: StatusOcorrencia.EM_ANDAMENTO,
        observacao:
          'Equipe de tapa-buraco sinalizou o local e iniciou o reparo.',
        autorId: 3,
        data: new Date('2026-11-10T08:45:00-03:00'),
      }),
    ],
  }),

  // Cenário 2: Recém-aberta, sem atribuição e sem anexos
  new Ocorrencia({
    id: 2,
    titulo: 'Dois postes com lâmpadas queimadas na Rua França Pinto',
    descricao:
      'O trecho entre os números 390 e 430 fica totalmente escuro à noite, gerando insegurança para quem volta do trabalho.',
    localizacaoId: 2,
    anexos: [],
    categoria: CategoriaOcorrencia.ILUMINACAO,
    status: StatusOcorrencia.ABERTA,
    solicitanteId: 1,
    apoios: 11,
    prioridade: PrioridadeOcorrencia.MEDIA,
    dataCriacao: new Date('2026-11-14T20:10:00-03:00'),
    atribuidoParaId: null,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 4,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Ocorrência aberta e aguardando triagem.',
        autorId: 1,
        data: new Date('2026-11-14T20:10:00-03:00'),
      }),
    ],
  }),

  // Cenário 3: Concluída (ciclo de vida completo)
  new Ocorrencia({
    id: 3,
    titulo: 'Galho de árvore prestes a cair sobre o parquinho',
    descricao:
      'Galho seco de grande porte ficou pendurado após ventania na Praça Nossa Senhora Aparecida.',
    localizacaoId: 3,
    anexos: [
      new Anexo({
        id: 3,
        nome: 'galho-praca.png',
        tipo: 'image/png',
        tamanho: 512000,
        caminho: '/uploads/ocorrencias/galho-praca.png',
      }),
    ],
    categoria: CategoriaOcorrencia.AREAS_VERDES,
    status: StatusOcorrencia.CONCLUIDA,
    solicitanteId: 2,
    apoios: 38,
    prioridade: PrioridadeOcorrencia.URGENTE,
    dataCriacao: new Date('2026-10-20T11:00:00-03:00'),
    atribuidoParaId: 3,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 5,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Solicitação de poda emergencial registrada.',
        autorId: 2,
        data: new Date('2026-10-20T11:00:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 6,
        status: StatusOcorrencia.EM_ANDAMENTO,
        observacao: 'Defesa Civil e equipe de manejo arbóreo no local.',
        autorId: 3,
        data: new Date('2026-10-21T09:00:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 7,
        status: StatusOcorrencia.CONCLUIDA,
        observacao:
          'Poda preventiva concluída e resíduos recolhidos com sucesso.',
        autorId: 3,
        data: new Date('2026-10-22T16:20:00-03:00'),
      }),
    ],
  }),

  // Cenário 4: Em análise, com anexo de foto, solicitada por outro morador do mesmo bairro
  new Ocorrencia({
    id: 4,
    titulo: 'Descarte irregular de entulho próximo ao ponto de ônibus',
    descricao:
      'Sacos de entulho de obra e restos de móveis foram deixados na calçada, obstruindo a passagem de pedestres e cadeirantes.',
    localizacaoId: 4,
    anexos: [
      new Anexo({
        id: 4,
        nome: 'entulho-calcada.jpg',
        tipo: 'image/jpeg',
        tamanho: 289120,
        caminho: '/uploads/ocorrencias/entulho-calcada.jpg',
      }),
    ],
    categoria: CategoriaOcorrencia.LIMPEZA,
    status: StatusOcorrencia.EM_ANALISE,
    solicitanteId: 4,
    apoios: 9,
    prioridade: PrioridadeOcorrencia.MEDIA,
    dataCriacao: new Date('2026-11-12T15:40:00-03:00'),
    atribuidoParaId: 3,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 8,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Registro inicial enviado.',
        autorId: 4,
        data: new Date('2026-11-12T15:40:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 9,
        status: StatusOcorrencia.EM_ANALISE,
        observacao: 'Incluído no roteiro semanal de coleta de grandes objetos.',
        autorId: 3,
        data: new Date('2026-11-13T10:15:00-03:00'),
      }),
    ],
  }),

  // Cenário 5: Ocorrência Arquivada (duplicada/improcedente)
  new Ocorrencia({
    id: 5,
    titulo: 'Semáforo de pedestres piscando intermitente',
    descricao:
      'O foco de pedestres na esquina da Domingos de Morais estava em amarelo piscante durante a manhã.',
    localizacaoId: 1,
    anexos: [],
    categoria: CategoriaOcorrencia.SEGURANCA,
    status: StatusOcorrencia.ARQUIVADA,
    solicitanteId: 1,
    apoios: 2,
    prioridade: PrioridadeOcorrencia.BAIXA,
    dataCriacao: new Date('2026-10-15T08:00:00-03:00'),
    atribuidoParaId: 3,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 10,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Solicitação aberta.',
        autorId: 1,
        data: new Date('2026-10-15T08:00:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 11,
        status: StatusOcorrencia.ARQUIVADA,
        observacao:
          'Manutenção programada da CET já havia normalizado o equipamento no mesmo dia.',
        autorId: 3,
        data: new Date('2026-10-15T14:00:00-03:00'),
      }),
    ],
  }),

  // Cenário 6: Ocorrência em outro bairro (Pinheiros)
  new Ocorrencia({
    id: 6,
    titulo: 'Bueiro entupido causando alagamento em dias de chuva',
    descricao:
      'Boca de lobo totalmente obstruída por folhas e lixo na esquina com a Rua Joaquim Antunes.',
    localizacaoId: 5,
    anexos: [
      new Anexo({
        id: 5,
        nome: 'bueiro-pinheiros.jpg',
        tipo: 'image/jpeg',
        tamanho: 370000,
        caminho: '/uploads/ocorrencias/bueiro-pinheiros.jpg',
      }),
    ],
    categoria: CategoriaOcorrencia.DRENAGEM,
    status: StatusOcorrencia.EM_ANDAMENTO,
    solicitanteId: 5,
    apoios: 19,
    prioridade: PrioridadeOcorrencia.ALTA,
    dataCriacao: new Date('2026-11-08T17:25:00-03:00'),
    atribuidoParaId: 6,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 12,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Abertura de chamado de limpeza de boca de lobo.',
        autorId: 5,
        data: new Date('2026-11-08T17:25:00-03:00'),
      }),
      new OcorrenciaAtualizacao({
        id: 13,
        status: StatusOcorrencia.EM_ANDAMENTO,
        observacao: 'Equipe de hidrojateamento programada para esta semana.',
        autorId: 6,
        data: new Date('2026-11-11T11:00:00-03:00'),
      }),
    ],
  }),

  // Cenário 7: Ocorrência no bairro Mooca
  new Ocorrencia({
    id: 7,
    titulo: 'Calçada com desnível acentuado na Rua Juventus',
    descricao:
      'Raízes de árvore levantaram o piso intertravado, dificultando a circulação de idosos.',
    localizacaoId: 8,
    anexos: [],
    categoria: CategoriaOcorrencia.PAVIMENTACAO,
    status: StatusOcorrencia.ABERTA,
    solicitanteId: 7,
    apoios: 7,
    prioridade: PrioridadeOcorrencia.MEDIA,
    dataCriacao: new Date('2026-11-13T09:50:00-03:00'),
    atribuidoParaId: null,
    atualizacoes: [
      new OcorrenciaAtualizacao({
        id: 14,
        status: StatusOcorrencia.ABERTA,
        observacao: 'Ocorrência aberta pelo morador.',
        autorId: 7,
        data: new Date('2026-11-13T09:50:00-03:00'),
      }),
    ],
  }),
];

const eventos = [
  // Evento 1: Futuro com múltiplos participantes confirmados
  new Evento({
    id: 1,
    nome: 'Mutirão de Plantio e Revitalização da Praça N. Sra. Aparecida',
    descricao:
      'Encontro comunitário para plantio de mudas nativas, pintura dos bancos e limpeza dos canteiros da praça.',
    data: new Date('2026-11-22T09:00:00-03:00'),
    marcadoEm: new Date('2026-11-01T10:00:00-03:00'),
    criadorId: 2,
    bairroId: 1,
    localizacaoId: 3,
  }),

  // Evento 2: Futuro ainda sem participações confirmadas
  new Evento({
    id: 2,
    nome: 'Reunião Mensal do Conselho Comunitário de Zeladoria',
    descricao:
      'Pauta: priorização das demandas de iluminação pública e pavimentação do trimestre junto à Subprefeitura.',
    data: new Date('2026-11-28T19:00:00-03:00'),
    marcadoEm: new Date('2026-11-10T18:30:00-03:00'),
    criadorId: 2,
    bairroId: 1,
    localizacaoId: 1,
  }),

  // Evento 3: Evento em Pinheiros
  new Evento({
    id: 3,
    nome: 'Feira de Troca de Mudas e Compostagem Doméstica',
    descricao:
      'Oficina prática de compostagem para apartamentos e distribuição gratuita de adubo orgânico.',
    data: new Date('2026-11-29T10:00:00-03:00'),
    marcadoEm: new Date('2026-11-05T14:00:00-03:00'),
    criadorId: 5,
    bairroId: 2,
    localizacaoId: 6,
  }),
];

const participacoes = [
  new Participacao({
    id: 1,
    eventoId: 1,
    usuarioId: 1,
    confirmadaEm: new Date('2026-11-03T12:15:00-03:00'),
  }),
  new Participacao({
    id: 2,
    eventoId: 1,
    usuarioId: 2,
    confirmadaEm: new Date('2026-11-01T10:05:00-03:00'),
  }),
  new Participacao({
    id: 3,
    eventoId: 1,
    usuarioId: 4,
    confirmadaEm: new Date('2026-11-06T19:40:00-03:00'),
  }),
  new Participacao({
    id: 4,
    eventoId: 3,
    usuarioId: 5,
    confirmadaEm: new Date('2026-11-05T14:05:00-03:00'),
  }),
];

const iniciativas = [
  // Caso 1: Relacionada APENAS a um Evento (eventoRelacionadoId preenchido, demandaRelacionadaId null)
  new Iniciativa({
    id: 1,
    nome: 'Arrecadação de Mudas e Ferramentas para a Praça',
    descricao:
      'Campanha entre moradores e comércios locais para doação de mudas ornamentais, terra adubada e luvas para o nosso mutirão.',
    eventoRelacionadoId: 1,
    demandaRelacionadaId: null,
    criadorId: 2,
    bairroId: 1,
  }),

  // Caso 2: Relacionada APENAS a uma Ocorrência (demandaRelacionadaId preenchido, eventoRelacionadoId null)
  new Iniciativa({
    id: 2,
    nome: 'Sinalização Comunitária Segura na Ciclovia',
    descricao:
      'Ação dos ciclistas do bairro para monitorar e manter a sinalização refletiva no trecho em reparo da Rua Domingos de Morais.',
    eventoRelacionadoId: null,
    demandaRelacionadaId: 1,
    criadorId: 1,
    bairroId: 1,
  }),

  // Caso 3: Sem relação com Evento nem Ocorrência (ambos null)
  new Iniciativa({
    id: 3,
    nome: 'Rede Vizinhança Solidária e Calçada Limpa',
    descricao:
      'Iniciativa permanente de conscientização sobre horários da coleta seletiva e conservação das calçadas da Vila Mariana.',
    eventoRelacionadoId: null,
    demandaRelacionadaId: null,
    criadorId: 4,
    bairroId: 1,
  }),

  // Caso 4: Iniciativa em Pinheiros relacionada à ocorrência de drenagem
  new Iniciativa({
    id: 4,
    nome: 'Adote uma Boca de Lobo - Pinheiros',
    descricao:
      'Monitoramento colaborativo antes de tempestades para evitar acúmulo de sacolas plásticas nas grelhas de drenagem.',
    eventoRelacionadoId: null,
    demandaRelacionadaId: 6,
    criadorId: 5,
    bairroId: 2,
  }),
];

const atualizacoes = [
  // Tipo NOTICIA com anexos
  new Atualizacao({
    id: 1,
    titulo:
      'Subprefeitura conclui revitalização da iluminação em 4 vias do bairro',
    conteudo:
      'Foram substituídas 68 luminárias antigas por modelos de LED de maior eficiência energética, ampliando a visibilidade noturna nas ruas internas da Vila Mariana.',
    tipo: TipoAtualizacao.NOTICIA,
    anexos: [
      new Anexo({
        id: 6,
        nome: 'relatorio-iluminacao-led.pdf',
        tipo: 'application/pdf',
        tamanho: 845120,
        caminho: '/uploads/atualizacoes/relatorio-iluminacao-led.pdf',
      }),
    ],
    autorId: 3,
    bairroId: 1,
    dataCriacao: new Date('2026-11-11T16:00:00-03:00'),
  }),

  // Tipo COMUNICADO sem anexos
  new Atualizacao({
    id: 2,
    titulo: 'Alteração temporária no horário do Cata-Bagulho neste sábado',
    conteudo:
      'Informamos aos moradores da Vila Mariana que a operação Cata-Bagulho deste sábado ocorrerá excepcionalmente das 07h às 11h. Coloquem os materiais descartáveis na calçada até as 06h45.',
    tipo: TipoAtualizacao.COMUNICADO,
    anexos: [],
    autorId: 3,
    bairroId: 1,
    dataCriacao: new Date('2026-11-14T09:30:00-03:00'),
  }),

  // Tipo NOTICIA em Pinheiros
  new Atualizacao({
    id: 3,
    titulo:
      'Novo cronograma de limpeza preventiva de galerias pluviais em Pinheiros',
    conteudo:
      'As equipes de zeladoria atuarão ao longo da semana nas principais vias de Pinheiros para prevenção de alagamentos no período chuvoso.',
    tipo: TipoAtualizacao.NOTICIA,
    anexos: [],
    autorId: 6,
    bairroId: 2,
    dataCriacao: new Date('2026-11-12T11:20:00-03:00'),
  }),
];

const posts = [
  // Post 1: Com múltiplos comentários e vários apoios
  new Post({
    id: 1,
    titulo:
      'Quem mais apoia a instalação de lixeiras seletivas na Praça N. Sra. Aparecida?',
    conteudo:
      'Pessoal, agora que a poda das árvores foi concluída e teremos o mutirão de plantio no dia 22/11, seria excelente solicitarmos lixeiras separadas para recicláveis perto do parquinho!',
    autorId: 1,
    bairroId: 1,
    apoios: 16,
    dataCriacao: new Date('2026-11-13T18:20:00-03:00'),
    comentarios: [
      new Comentario({
        id: 1,
        conteudo:
          'Excelente ideia, Ana! Vou incluir esse pedido na pauta da nossa reunião do conselho no dia 28.',
        autorId: 2,
        dataCriacao: new Date('2026-11-13T19:05:00-03:00'),
      }),
      new Comentario({
        id: 2,
        conteudo:
          'Apoiadíssimo! Nos finais de semana as lixeiras atuais ficam cheias muito rápido.',
        autorId: 4,
        dataCriacao: new Date('2026-11-14T08:40:00-03:00'),
      }),
    ],
  }),

  // Post 2: Sem comentários ainda
  new Post({
    id: 2,
    titulo:
      'Dica: Ecoponto mais próximo para descarte de pequenos volumes de madeira',
    conteudo:
      'Para quem está reformando em casa, o Ecoponto Vila Mariana recebe até 1m³ de entulho ou restos de poda gratuitamente todos os dias. Evitem deixar na calçada fora do dia do Cata-Bagulho!',
    autorId: 2,
    bairroId: 1,
    apoios: 8,
    dataCriacao: new Date('2026-11-15T10:15:00-03:00'),
    comentarios: [],
  }),

  // Post 3: Post em outro bairro (Pinheiros)
  new Post({
    id: 3,
    titulo: 'Oficina de compostagem na Benedito Calixto confirmada!',
    conteudo:
      'Conseguimos parceria com produtores locais para distribuir composto orgânico e ensinar como montar minhocário doméstico no dia 29/11.',
    autorId: 5,
    bairroId: 2,
    apoios: 14,
    dataCriacao: new Date('2026-11-10T15:00:00-03:00'),
    comentarios: [
      new Comentario({
        id: 3,
        conteudo:
          'Parabéns pela iniciativa! A Subprefeitura dará suporte com tendas.',
        autorId: 6,
        dataCriacao: new Date('2026-11-10T16:30:00-03:00'),
      }),
    ],
  }),
];

export const mockValues = {
  bairros,
  localizacoes,
  usuarios,
  ocorrencias,
  eventos,
  participacoes,
  iniciativas,
  atualizacoes,
  posts,
};

export default mockValues;
