import {
  CategoriaOcorrencia,
  StatusOcorrencia,
} from '@/common/models/index.js';
import { formatRelativeDays } from '@/common/utils/formatters.js';
import Surface from '@/components/Surface';
import { Link } from 'react-router';
import styled from 'styled-components';

const MAX_OCORRENCIAS = 2;

const StyledSection = styled.section`
  > .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.75rem;

    > h3 {
      line-height: 1.25rem;
      color: var(--cor-grafite);
      font-size: 1.1rem;
    }

    > a {
      text-decoration: none;
      color: var(--cor-secundaria);
      font-size: 0.875rem;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const StyledSurface = styled(Surface)`
  > .ocorrencia-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--cor-borda);

    &:last-child {
      border-bottom: none;
    }
  }

  .categoria-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 10px;
    background-color: rgb(from var(--cor-secundaria) r g b / 15%);
    color: var(--cor-secundaria);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1rem;
  }

  .ocorrencia-body {
    flex: 1;
    min-width: 0;
  }

  .ocorrencia-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .ocorrencia-titulo {
    font-weight: 600;
    color: var(--cor-grafite);
    font-size: 0.95rem;
    line-height: 1.3;
  }

  .ocorrencia-meta {
    font-size: 0.825rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    margin-top: 0.2rem;
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
    margin-top: 0.75rem;

    > span {
      height: 4px;
      border-radius: 999px;
      background-color: var(--cor-borda);

      &.filled {
        background-color: var(--cor-primaria);
      }
    }
  }

  .empty-state {
    padding: 1.5rem;
    text-align: center;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    font-size: 0.9rem;
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

function formatLocationLabel(localizacao) {
  if (!localizacao) return 'Localização não informada';
  if (localizacao.numero && localizacao.numero !== 'S/N') {
    return `${localizacao.logradouro}, ${localizacao.numero}`;
  }
  return localizacao.logradouro;
}

export default function MinhasOcorrenciasSection({ ocorrencias = [] }) {
  const visiveis = ocorrencias.slice(0, MAX_OCORRENCIAS);

  return (
    <StyledSection>
      <div className="section-header">
        <h3>Suas ocorrências</h3>
        <Link to="/minhas-ocorrencias">Ver todas</Link>
      </div>
      <StyledSurface>
        {visiveis.length === 0 ? (
          <div className="empty-state">
            Nenhuma ocorrência registrada para este bairro.
          </div>
        ) : (
          visiveis.map((ocorrencia) => {
            const statusInfo = getStatusInfo(ocorrencia.status);
            return (
              <div key={ocorrencia.id} className="ocorrencia-item">
                <div className="categoria-icon">
                  {getCategoryIcon(ocorrencia.categoria)}
                </div>
                <div className="ocorrencia-body">
                  <div className="ocorrencia-top">
                    <div>
                      <p className="ocorrencia-titulo">{ocorrencia.titulo}</p>
                      <p className="ocorrencia-meta">
                        {formatLocationLabel(ocorrencia.localizacao)} ·{' '}
                        {formatRelativeDays(ocorrencia.dataCriacao)}
                      </p>
                    </div>
                    <span className={`status-badge ${statusInfo.className}`}>
                      {statusInfo.label}
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
              </div>
            );
          })
        )}
      </StyledSurface>
    </StyledSection>
  );
}
