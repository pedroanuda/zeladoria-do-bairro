import {
  CategoriaOcorrencia,
  StatusOcorrencia,
} from '@/common/models/index.js';
import { formatRelativeDays } from '@/common/utils/formatters.js';
import { Button, Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import { ocorrenciaService, usuarioService } from '@/services';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styled from 'styled-components';

const STATUS_FILTERS = [
  { label: 'Todas', value: 'ALL' },
  { label: 'Aberta', value: StatusOcorrencia.ABERTA },
  { label: 'Em análise', value: StatusOcorrencia.EM_ANALISE },
  { label: 'Em andamento', value: StatusOcorrencia.EM_ANDAMENTO },
  { label: 'Concluída', value: StatusOcorrencia.CONCLUIDA },
  { label: 'Arquivada', value: StatusOcorrencia.ARQUIVADA },
];

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2rem 5rem 3rem;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.5rem;
    gap: 1rem;

    h1 {
      font-size: 1.75rem;
      color: var(--cor-grafite);
      line-height: 1.25;
    }

    p {
      font-size: 0.925rem;
      color: rgb(from var(--cor-grafite) r g b / 68%);
      margin-top: 0.25rem;
    }
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .ocorrencias-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  @media (max-width: 1024px) {
    margin: 1.5rem 2rem 2.5rem;

    .summary-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;

    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .summary-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const SummaryCard = styled(Surface)`
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;

  .summary-icon {
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    flex-shrink: 0;

    &.green {
      background-color: rgb(from var(--cor-primaria) r g b / 15%);
      color: var(--cor-primaria);
    }

    &.blue {
      background-color: rgb(from var(--cor-secundaria) r g b / 15%);
      color: var(--cor-secundaria);
    }

    &.amber {
      background-color: rgb(from var(--cor-terciaria) r g b / 25%);
      color: #7a5200;
    }
  }

  .summary-value {
    font-family: var(--fonte-heading);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--cor-grafite);
    line-height: 1.15;
  }

  .summary-label {
    font-size: 0.8rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    margin-top: 0.1rem;
  }
`;

const FiltersBar = styled(Surface)`
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;

  .top-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .scope-tabs {
    display: inline-flex;
    background-color: var(--cor-fundo);
    padding: 0.25rem;
    border-radius: 10px;
    gap: 0.25rem;

    button {
      border: none;
      background: transparent;
      padding: 0.45rem 0.9rem;
      border-radius: 8px;
      font-family: var(--fonte-body);
      font-size: 0.85rem;
      font-weight: 500;
      color: rgb(from var(--cor-grafite) r g b / 75%);
      cursor: pointer;

      &.active {
        background-color: var(--cor-superficie);
        color: var(--cor-primaria);
        font-weight: 600;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      }
    }
  }

  .search-box {
    position: relative;
    min-width: 17rem;

    @media (max-width: 640px) {
      min-width: 0;
      width: 100%;
    }

    i {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: rgb(from var(--cor-grafite) r g b / 45%);
      font-size: 0.85rem;
    }

    input {
      width: 100%;
      padding: 0.55rem 0.85rem 0.55rem 2.25rem;
      border-radius: 10px;
      border: 1px solid var(--cor-borda);
      font-family: var(--fonte-body);
      font-size: 0.85rem;
      color: var(--cor-grafite);

      &:focus {
        outline: none;
        border-color: var(--cor-primaria);
      }
    }
  }

  .status-pills {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      border: 1px solid var(--cor-borda);
      background-color: var(--cor-superficie);
      color: rgb(from var(--cor-grafite) r g b / 80%);
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      font-family: var(--fonte-body);
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        border-color: var(--cor-primaria);
      }

      &.active {
        background-color: var(--cor-primaria);
        border-color: var(--cor-primaria);
        color: var(--cor-superficie);
        font-weight: 600;
      }
    }
  }
`;

const OcorrenciaCard = styled(Surface)`
  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: var(--cor-primaria);
  }

  > .card-link {
    display: flex;
    align-items: flex-start;
    gap: 1.1rem;
    padding: 1.25rem;
    text-decoration: none;
    color: inherit;
  }

  .categoria-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 10px;
    background-color: rgb(from var(--cor-secundaria) r g b / 15%);
    color: var(--cor-secundaria);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  .card-body {
    flex: 1;
    min-width: 0;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .code-pill {
    font-size: 0.75rem;
    color: rgb(from var(--cor-grafite) r g b / 60%);
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .titulo {
    font-weight: 600;
    font-size: 1rem;
    color: var(--cor-grafite);
    line-height: 1.3;
  }

  .descricao-resumo {
    font-size: 0.85rem;
    color: rgb(from var(--cor-grafite) r g b / 72%);
    margin-top: 0.35rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
    margin-top: 0.65rem;
    font-size: 0.8rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);

    span {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;

    &.em-andamento,
    &.em-analise {
      background-color: var(--cor-secundaria);
      color: var(--cor-superficie);
    }

    &.aberta {
      background-color: rgb(from var(--cor-terciaria) r g b / 25%);
      color: #7a5200;
    }

    &.concluida {
      background-color: rgb(from var(--cor-primaria) r g b / 18%);
      color: var(--cor-primaria);
    }

    &.arquivada {
      background-color: var(--cor-borda);
      color: var(--cor-grafite);
    }
  }

  .progress-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.35rem;
    margin-top: 0.85rem;

    > span {
      height: 4px;
      border-radius: 999px;
      background-color: var(--cor-borda);

      &.filled {
        background-color: var(--cor-primaria);
      }
    }
  }
`;

function getCategoryIcon(categoria) {
  switch (categoria) {
    case CategoriaOcorrencia.PAVIMENTACAO:
      return <i className="fa-solid fa-person-walking" />;
    case CategoriaOcorrencia.LIMPEZA:
      return <i className="fa-regular fa-trash-can" />;
    case CategoriaOcorrencia.ILUMINACAO:
      return <i className="fa-regular fa-lightbulb" />;
    case CategoriaOcorrencia.AREAS_VERDES:
      return <i className="fa-solid fa-tree" />;
    case CategoriaOcorrencia.DRENAGEM:
      return <i className="fa-solid fa-water" />;
    case CategoriaOcorrencia.SEGURANCA:
      return <i className="fa-solid fa-shield-halved" />;
    default:
      return <i className="fa-solid fa-circle-exclamation" />;
  }
}

function getStatusInfo(status) {
  switch (status) {
    case StatusOcorrencia.ABERTA:
      return { className: 'aberta', label: 'Aberta', steps: 1 };
    case StatusOcorrencia.EM_ANALISE:
      return { className: 'em-analise', label: 'Em análise', steps: 2 };
    case StatusOcorrencia.EM_ANDAMENTO:
      return { className: 'em-andamento', label: 'Em andamento', steps: 3 };
    case StatusOcorrencia.CONCLUIDA:
      return { className: 'concluida', label: 'Concluída', steps: 4 };
    case StatusOcorrencia.ARQUIVADA:
      return { className: 'arquivada', label: 'Arquivada', steps: 0 };
    default:
      return { className: 'aberta', label: status, steps: 1 };
  }
}

export default function MinhasOcorrencias() {
  const navigate = useNavigate();
  const currentUser = usuarioService.getCurrentUser();
  const [scope, setScope] = useState('minhas');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const todasDoUsuario = ocorrenciaService.getBySolicitante(
    currentUser?.id ?? 1,
  );
  const todasDoBairro = ocorrenciaService.getByBairro(
    currentUser?.bairroId ?? 1,
  );

  const baseList = scope === 'minhas' ? todasDoUsuario : todasDoBairro;

  const filtradas = baseList.filter((oc) => {
    const matchesStatus = statusFilter === 'ALL' || oc.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      oc.titulo.toLowerCase().includes(query) ||
      oc.descricao.toLowerCase().includes(query) ||
      oc.localizacao?.logradouro?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const emAndamentoCount = baseList.filter(
    (oc) =>
      oc.status === StatusOcorrencia.EM_ANDAMENTO ||
      oc.status === StatusOcorrencia.EM_ANALISE,
  ).length;
  const concluidasCount = baseList.filter(
    (oc) => oc.status === StatusOcorrencia.CONCLUIDA,
  ).length;
  const totalApoios = baseList.reduce((acc, oc) => acc + (oc.apoios ?? 0), 0);

  return (
    <>
      <Header />
      <StyledMain>
        <div className="page-header">
          <div>
            <h1>Minhas ocorrências</h1>
            <p>
              Acompanhe o andamento das solicitações registradas em{' '}
              {currentUser?.bairro?.nome ?? 'seu bairro'}.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/ocorrencias/nova')}
          >
            <i className="fa-solid fa-plus" />
            Nova ocorrência
          </Button>
        </div>

        <div className="summary-grid">
          <SummaryCard>
            <div className="summary-icon blue">
              <i className="fa-regular fa-folder-open" />
            </div>
            <div>
              <p className="summary-value">{baseList.length}</p>
              <p className="summary-label">Total registradas</p>
            </div>
          </SummaryCard>

          <SummaryCard>
            <div className="summary-icon amber">
              <i className="fa-solid fa-helmet-safety" />
            </div>
            <div>
              <p className="summary-value">{emAndamentoCount}</p>
              <p className="summary-label">Em atendimento</p>
            </div>
          </SummaryCard>

          <SummaryCard>
            <div className="summary-icon green">
              <i className="fa-solid fa-circle-check" />
            </div>
            <div>
              <p className="summary-value">{concluidasCount}</p>
              <p className="summary-label">Concluídas</p>
            </div>
          </SummaryCard>

          <SummaryCard>
            <div className="summary-icon blue">
              <i className="fa-solid fa-arrow-up" />
            </div>
            <div>
              <p className="summary-value">{totalApoios}</p>
              <p className="summary-label">Apoios de vizinhos</p>
            </div>
          </SummaryCard>
        </div>

        <FiltersBar>
          <div className="top-controls">
            <div className="scope-tabs">
              <button
                type="button"
                className={scope === 'minhas' ? 'active' : ''}
                onClick={() => setScope('minhas')}
              >
                Minhas solicitações ({todasDoUsuario.length})
              </button>
              <button
                type="button"
                className={scope === 'bairro' ? 'active' : ''}
                onClick={() => setScope('bairro')}
              >
                Todas de {currentUser?.bairro?.nome ?? 'Vila Mariana'} (
                {todasDoBairro.length})
              </button>
            </div>

            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por rua ou problema..."
              />
            </div>
          </div>

          <div className="status-pills">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={statusFilter === f.value ? 'active' : ''}
                onClick={() => setStatusFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FiltersBar>

        {filtradas.length === 0 ? (
          <Surface
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              color: 'rgb(from var(--cor-grafite) r g b / 65%)',
            }}
          >
            Nenhuma ocorrência encontrada para os filtros selecionados.
          </Surface>
        ) : (
          <div className="ocorrencias-list">
            {filtradas.map((oc) => {
              const statusInfo = getStatusInfo(oc.status);
              const codigo = `#ZB-${String(oc.id).padStart(4, '0')}`;
              const endereco = oc.localizacao
                ? `${oc.localizacao.logradouro}${oc.localizacao.numero !== 'S/N' ? `, ${oc.localizacao.numero}` : ''}`
                : 'Localização não informada';

              return (
                <OcorrenciaCard key={oc.id}>
                  <Link to={`/ocorrencias/${oc.id}`} className="card-link">
                    <div className="categoria-icon">
                      {getCategoryIcon(oc.categoria)}
                    </div>
                    <div className="card-body">
                      <div className="top-row">
                        <div>
                          <p className="code-pill">
                            {codigo} · {oc.categoria}
                          </p>
                          <p className="titulo">{oc.titulo}</p>
                        </div>
                        <span
                          className={`status-badge ${statusInfo.className}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>

                      <p className="descricao-resumo">{oc.descricao}</p>

                      <div className="meta-row">
                        <span>
                          <i className="fa-solid fa-location-dot" />
                          {endereco}
                        </span>
                        <span>
                          <i className="fa-regular fa-clock" />
                          {formatRelativeDays(oc.dataCriacao)}
                        </span>
                        <span>
                          <i className="fa-solid fa-arrow-up" />
                          {oc.apoios} apoios
                        </span>
                      </div>

                      <div className="progress-bar" aria-hidden="true">
                        {[1, 2, 3, 4].map((step) => (
                          <span
                            key={step}
                            className={step <= statusInfo.steps ? 'filled' : ''}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                </OcorrenciaCard>
              );
            })}
          </div>
        )}
      </StyledMain>
      <Footer />
    </>
  );
}
