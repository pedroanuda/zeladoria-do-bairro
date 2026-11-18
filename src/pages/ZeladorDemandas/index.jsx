import {
  CategoriaOcorrencia,
  PrioridadeOcorrencia,
  StatusOcorrencia,
} from '@/common/models/index.js';
import { formatRelativeDays } from '@/common/utils/formatters.js';
import { Surface, ZeladorLayout } from '@/components';
import {
  iniciativaService,
  ocorrenciaService,
  usuarioService,
} from '@/services';
import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const PageWrapper = styled.div`
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 1.15rem;
    flex-wrap: wrap;

    .sub-location {
      font-size: 0.825rem;
      color: rgb(from var(--cor-grafite) r g b / 62%);
      margin-bottom: 0.15rem;
    }

    h1 {
      font-size: 1.75rem;
      color: var(--cor-grafite);
      line-height: 1.2;
    }
  }

  .top-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .view-switcher {
      display: inline-flex;
      background-color: var(--cor-superficie);
      border: 1px solid var(--cor-borda);
      border-radius: 10px;
      padding: 0.2rem;
      gap: 0.2rem;

      button {
        border: none;
        background: transparent;
        padding: 0.4rem 0.85rem;
        border-radius: 7px;
        font-family: var(--fonte-body);
        font-size: 0.82rem;
        font-weight: 500;
        color: rgb(from var(--cor-grafite) r g b / 75%);
        cursor: pointer;

        &.active {
          background-color: var(--cor-grafite);
          color: var(--cor-superficie);
          font-weight: 600;
        }
      }
    }
  }

  .filter-chips-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.35rem;
    flex-wrap: wrap;

    .chip {
      border: 1px solid var(--cor-borda);
      background-color: var(--cor-superficie);
      color: var(--cor-grafite);
      padding: 0.38rem 0.85rem;
      border-radius: 999px;
      font-family: var(--fonte-body);
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;

      &.active {
        background-color: rgb(from var(--cor-primaria) r g b / 14%);
        border-color: rgb(from var(--cor-primaria) r g b / 30%);
        color: var(--cor-primaria);
        font-weight: 600;
      }
    }

    select.chip {
      padding-right: 1.5rem;
    }
  }

  .kanban-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .kanban-col {
    background-color: #eaeeea;
    border-radius: 12px;
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .col-header {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.15rem 0.25rem 0.25rem;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--cor-grafite);

      .col-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;

        &.amber {
          background-color: var(--cor-terciaria);
        }

        &.lightblue {
          background-color: #6ab0de;
        }

        &.blue {
          background-color: var(--cor-secundaria);
        }

        &.green {
          background-color: var(--cor-primaria);
        }
      }

      .col-count {
        font-weight: 500;
        color: rgb(from var(--cor-grafite) r g b / 60%);
      }
    }
  }
`;

const KanbanCard = styled(Surface)`
  padding: 0.95rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .prio-pill {
    padding: 0.15rem 0.55rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 600;

    &.alta {
      background-color: #fde8e4;
      color: #b53d1d;
    }

    &.media {
      background-color: rgb(from var(--cor-terciaria) r g b / 28%);
      color: #7a5200;
    }

    &.baixa {
      background-color: var(--cor-fundo);
      color: rgb(from var(--cor-grafite) r g b / 70%);
    }

    &.resolvida {
      background-color: rgb(from var(--cor-primaria) r g b / 15%);
      color: var(--cor-primaria);
    }
  }

  .code {
    font-size: 0.75rem;
    color: rgb(from var(--cor-grafite) r g b / 55%);
    font-weight: 500;
  }

  .card-title {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--cor-grafite);
    text-decoration: none;
    line-height: 1.3;

    &:hover {
      color: var(--cor-primaria);
    }
  }

  .card-meta {
    font-size: 0.78rem;
    color: rgb(from var(--cor-grafite) r g b / 62%);
  }

  .mini-progress {
    height: 4px;
    border-radius: 999px;
    background-color: var(--cor-borda);
    overflow: hidden;
    margin: 0.2rem 0;

    > span {
      display: block;
      height: 100%;
      width: 68%;
      background-color: var(--cor-secundaria);
      border-radius: 999px;
    }
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
    gap: 0.5rem;
  }

  .cat-pill {
    padding: 0.18rem 0.55rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    background-color: rgb(from var(--cor-secundaria) r g b / 15%);
    color: var(--cor-secundaria);
  }

  .apoios {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--cor-grafite);
  }

  .advance-btn {
    margin-top: 0.35rem;
    width: 100%;
    padding: 0.42rem 0.65rem;
    border-radius: 8px;
    border: 1px solid var(--cor-borda);
    background-color: var(--cor-fundo);
    color: var(--cor-grafite);
    font-family: var(--fonte-body);
    font-size: 0.76rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      border-color: var(--cor-primaria);
      color: var(--cor-primaria);
    }
  }

  .publish-mural-btn {
    margin-top: 0.35rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: none;
    background-color: var(--cor-primaria);
    color: var(--cor-superficie);
    font-family: var(--fonte-body);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      opacity: 0.92;
    }
  }

  .published-note {
    font-size: 0.76rem;
    color: rgb(from var(--cor-grafite) r g b / 62%);
    margin-top: 0.15rem;
  }
`;

function getPrioBadge(prioridade) {
  if (
    prioridade === PrioridadeOcorrencia.ALTA ||
    prioridade === PrioridadeOcorrencia.URGENTE
  ) {
    return { className: 'alta', label: 'Alta' };
  }
  if (prioridade === PrioridadeOcorrencia.MEDIA) {
    return { className: 'media', label: 'Média' };
  }
  return { className: 'baixa', label: 'Baixa' };
}

function getShortCat(cat) {
  switch (cat) {
    case CategoriaOcorrencia.PAVIMENTACAO:
      return 'Infraestrutura';
    case CategoriaOcorrencia.ILUMINACAO:
      return 'Iluminação';
    case CategoriaOcorrencia.LIMPEZA:
      return 'Limpeza';
    case CategoriaOcorrencia.AREAS_VERDES:
      return 'Acessibilidade';
    case CategoriaOcorrencia.SEGURANCA:
      return 'Segurança';
    case CategoriaOcorrencia.DRENAGEM:
      return 'Drenagem';
    default:
      return cat;
  }
}

export default function ZeladorDemandas() {
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;

  const [onlyHighMedium, setOnlyHighMedium] = useState(false);
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [version, setVersion] = useState(0);

  const todas = ocorrenciaService.getByBairro(bairroId);
  const iniciativasBairro = iniciativaService.getByBairro(bairroId);
  void version;

  const filtradas = todas.filter((oc) => {
    if (onlyHighMedium && oc.prioridade === PrioridadeOcorrencia.BAIXA) {
      return false;
    }
    if (selectedCat !== 'ALL' && oc.categoria !== selectedCat) {
      return false;
    }
    return true;
  });

  const colAberta = filtradas.filter(
    (oc) => oc.status === StatusOcorrencia.ABERTA,
  );
  const colAnalise = filtradas.filter(
    (oc) => oc.status === StatusOcorrencia.EM_ANALISE,
  );
  const colAndamento = filtradas.filter(
    (oc) => oc.status === StatusOcorrencia.EM_ANDAMENTO,
  );
  const colResolvida = filtradas.filter(
    (oc) => oc.status === StatusOcorrencia.CONCLUIDA,
  );

  const handleAdvanceStatus = (ocorrencia, novoStatus, observacaoPadrao) => {
    ocorrenciaService.addAtualizacao(ocorrencia.id, {
      status: novoStatus,
      observacao: observacaoPadrao,
      autorId: zelador?.id ?? 3,
      data: new Date(),
    });
    setVersion((v) => v + 1);
  };

  const handlePublicarNoMural = (ocorrencia) => {
    iniciativaService.create({
      nome: ocorrencia.titulo,
      descricao: `Demanda concluída pela equipe de zeladoria em ${ocorrencia.localizacao?.logradouro ?? 'via do bairro'}.`,
      demandaRelacionadaId: ocorrencia.id,
      eventoRelacionadoId: null,
      criadorId: zelador?.id ?? 3,
      bairroId,
    });
    setVersion((v) => v + 1);
  };

  const renderCard = (oc, colType) => {
    const prio = getPrioBadge(oc.prioridade);
    const codigo = `#ZB-${String(oc.id).padStart(4, '0')}`;
    const localStr = oc.localizacao
      ? `${oc.localizacao.logradouro}${oc.localizacao.numero !== 'S/N' ? `, ${oc.localizacao.numero}` : ''}`
      : 'Local no bairro';

    const jaPublicadaNoMural = iniciativasBairro.some(
      (ini) => ini.demandaRelacionadaId === oc.id,
    );

    return (
      <KanbanCard key={oc.id}>
        <div className="card-top">
          {colType === 'RESOLVIDA' ? (
            <span className="prio-pill resolvida">✓ Resolvida</span>
          ) : (
            <span className={`prio-pill ${prio.className}`}>{prio.label}</span>
          )}
          <span className="code">{codigo}</span>
        </div>

        <Link to={`/ocorrencias/${oc.id}`} className="card-title">
          {oc.titulo}
        </Link>

        <p className="card-meta">
          {localStr} · {formatRelativeDays(oc.dataCriacao)}
        </p>

        {colType === 'ANDAMENTO' && (
          <div className="mini-progress">
            <span />
          </div>
        )}

        {colType !== 'RESOLVIDA' && (
          <div className="card-bottom">
            <span className="cat-pill">{getShortCat(oc.categoria)}</span>
            <span className="apoios">▲ {oc.apoios} apoios</span>
          </div>
        )}

        {colType === 'ABERTA' && (
          <button
            type="button"
            className="advance-btn"
            onClick={() =>
              handleAdvanceStatus(
                oc,
                StatusOcorrencia.EM_ANALISE,
                'Iniciada análise técnica pela zeladoria.',
              )
            }
          >
            Mover para Em análise →
          </button>
        )}

        {colType === 'ANALISE' && (
          <button
            type="button"
            className="advance-btn"
            onClick={() =>
              handleAdvanceStatus(
                oc,
                StatusOcorrencia.EM_ANDAMENTO,
                'Equipe de campo acionada para execução do serviço.',
              )
            }
          >
            Iniciar atendimento →
          </button>
        )}

        {colType === 'ANDAMENTO' && (
          <button
            type="button"
            className="advance-btn"
            onClick={() =>
              handleAdvanceStatus(
                oc,
                StatusOcorrencia.CONCLUIDA,
                'Serviço concluído e vistoriado pela zeladoria.',
              )
            }
          >
            Marcar como Resolvida ✓
          </button>
        )}

        {colType === 'RESOLVIDA' &&
          (jaPublicadaNoMural ? (
            <p className="published-note">
              Publicada no mural · {oc.apoios} reações
            </p>
          ) : (
            <button
              type="button"
              className="publish-mural-btn"
              onClick={() => handlePublicarNoMural(oc)}
            >
              Publicar no mural
            </button>
          ))}
      </KanbanCard>
    );
  };

  return (
    <ZeladorLayout>
      <PageWrapper>
        <div className="top-bar">
          <div>
            <p className="sub-location">
              Gestão de ocorrências · {zelador?.bairro?.nome ?? 'Vila Mariana'}
            </p>
            <h1>Demandas</h1>
          </div>

          <div className="top-controls">
            <div className="view-switcher">
              <button type="button" onClick={() => {}}>
                Lista
              </button>
              <button type="button" className="active">
                Quadro
              </button>
            </div>
          </div>
        </div>

        <div className="filter-chips-row">
          <button
            type="button"
            className={`chip ${onlyHighMedium ? 'active' : ''}`}
            onClick={() => setOnlyHighMedium((prev) => !prev)}
          >
            Prioridade: {onlyHighMedium ? 'Alta e Média' : 'Todas'}
          </button>

          <span className="chip active">Últimos 30 dias</span>

          <select
            className="chip"
            aria-label="Filtrar por categoria"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            <option value="ALL">+ Categoria (Todas)</option>
            {Object.values(CategoriaOcorrencia).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="kanban-grid">
          <div className="kanban-col">
            <div className="col-header">
              <span className="col-dot amber" />
              <span>Aberta</span>
              <span className="col-count">{colAberta.length}</span>
            </div>
            {colAberta.map((oc) => renderCard(oc, 'ABERTA'))}
          </div>

          <div className="kanban-col">
            <div className="col-header">
              <span className="col-dot lightblue" />
              <span>Em análise</span>
              <span className="col-count">{colAnalise.length}</span>
            </div>
            {colAnalise.map((oc) => renderCard(oc, 'ANALISE'))}
          </div>

          <div className="kanban-col">
            <div className="col-header">
              <span className="col-dot blue" />
              <span>Em andamento</span>
              <span className="col-count">{colAndamento.length}</span>
            </div>
            {colAndamento.map((oc) => renderCard(oc, 'ANDAMENTO'))}
          </div>

          <div className="kanban-col">
            <div className="col-header">
              <span className="col-dot green" />
              <span>Resolvida</span>
              <span className="col-count">{colResolvida.length} no mês</span>
            </div>
            {colResolvida.map((oc) => renderCard(oc, 'RESOLVIDA'))}
          </div>
        </div>
      </PageWrapper>
    </ZeladorLayout>
  );
}
