export const CargoUsuario = Object.freeze({
  MORADOR: 'Morador',
  LIDER_COMUNITARIO: 'Líder Comunitário',
  ZELADOR: 'Agente de Zeladoria',
  GESTOR: 'Gestor Público',
});

export const StatusOcorrencia = Object.freeze({
  ABERTA: 'Aberta',
  EM_ANALISE: 'Em Análise',
  EM_ANDAMENTO: 'Em Andamento',
  CONCLUIDA: 'Concluída',
  ARQUIVADA: 'Arquivada',
});

export const PrioridadeOcorrencia = Object.freeze({
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  URGENTE: 'Urgente',
});

export const CategoriaOcorrencia = Object.freeze({
  ILUMINACAO: 'Iluminação Pública',
  PAVIMENTACAO: 'Pavimentação e Buracos',
  LIMPEZA: 'Limpeza e Descarte Irregular',
  AREAS_VERDES: 'Poda e Áreas Verdes',
  DRENAGEM: 'Drenagem e Esgoto',
  SEGURANCA: 'Segurança e Sinalização',
});

export const TipoAtualizacao = Object.freeze({
  NOTICIA: 'Noticia',
  COMUNICADO: 'Comunicado',
});
