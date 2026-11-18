import {
  PrioridadeOcorrencia,
  StatusOcorrencia,
} from '@/common/models/index.js';
import {
  formatEventSchedule,
  formatRelativeDays,
} from '@/common/utils/formatters.js';
import { Button, Surface, ZeladorLayout } from '@/components';
import { eventoService, ocorrenciaService, usuarioService } from '@/services';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styled from 'styled-components';

const QUEUE_TABS = [
  { label: 'Todas', value: 'ALL' },
  { label: 'Abertas', value: StatusOcorrencia.ABERTA },
  { label: 'Em análise', value: StatusOcorrencia.EM_ANALISE },
  { label: 'Em andamento', value: StatusOcorrencia.EM_ANDAMENTO },
];

const PageWrapper = styled.div`
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 1.5rem;
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

  .top-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .search-input {
      position: relative;
      min-width: 16rem;

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
        padding: 0.6rem 0.9rem 0.6rem 2.25rem;
        border-radius: 10px;
        border: 1px solid var(--cor-borda);
        background-color: var(--cor-superficie);
        font-family: var(--fonte-body);
        font-size: 0.85rem;
        color: var(--cor-grafite);

        &:focus {
          outline: none;
          border-color: var(--cor-primaria);
        }
      }
    }
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 8.2fr 3.8fr;
    gap: 1.25rem;
    align-items: start;
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const KpiCard = styled(Surface)`
  padding: 1.15rem 1.25rem;

  .kpi-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.825rem;
    color: rgb(from var(--cor-grafite) r g b / 70%);
    margin-bottom: 0.35rem;

    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;

      &.amber {
        background-color: var(--cor-terciaria);
      }

      &.blue {
        background-color: var(--cor-secundaria);
      }

      &.green {
        background-color: var(--cor-primaria);
      }
    }
  }

  .kpi-value {
    font-family: var(--fonte-heading);
    font-size: 1.85rem;
    font-weight: 700;
    color: var(--cor-grafite);
    line-height: 1.15;
  }

  .kpi-sub {
    font-size: 0.78rem;
    color: rgb(from var(--cor-grafite) r g b / 60%);
    margin-top: 0.3rem;

    &.positive {
      color: var(--cor-primaria);
      font-weight: 600;
    }
  }

  &.highlight-green {
    background-color: var(--cor-primaria);
    border-color: var(--cor-primaria);
    color: var(--cor-superficie);

    .kpi-top,
    .kpi-value,
    .kpi-sub {
      color: var(--cor-superficie);
    }

    .kpi-top,
    .kpi-sub {
      opacity: 0.85;
    }
  }
`;

const QueueCard = styled(Surface)`
  padding: 1.35rem;

  .queue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.1rem;
    flex-wrap: wrap;

    h2 {
      font-size: 1.1rem;
      color: var(--cor-grafite);
    }
  }

  .queue-tabs {
    display: inline-flex;
    background-color: var(--cor-fundo);
    padding: 0.2rem;
    border-radius: 8px;
    gap: 0.2rem;

    button {
      border: none;
      background: transparent;
      padding: 0.38rem 0.75rem;
      border-radius: 6px;
      font-family: var(--fonte-body);
      font-size: 0.78rem;
      font-weight: 500;
      color: rgb(from var(--cor-grafite) r g b / 72%);
      cursor: pointer;

      &.active {
        background-color: var(--cor-superficie);
        color: var(--cor-grafite);
        font-weight: 600;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      font-size: 0.75rem;
      font-weight: 500;
      color: rgb(from var(--cor-grafite) r g b / 58%);
      padding: 0.5rem 0.65rem;
      border-bottom: 1px solid var(--cor-borda);
    }

    td {
      padding: 0.85rem 0.65rem;
      border-bottom: 1px solid var(--cor-borda);
      font-size: 0.85rem;
      color: var(--cor-grafite);
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background-color: rgb(from var(--cor-fundo) r g b / 50%);
    }
  }

  .priority-cell {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-weight: 600;
    font-size: 0.82rem;

    .p-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }

    &.alta {
      color: #b53d1d;
      .p-dot {
        background-color: #d64527;
      }
    }

    &.media {
      color: #8a6100;
      .p-dot {
        background-color: var(--cor-terciaria);
      }
    }

    &.baixa {
      color: rgb(from var(--cor-grafite) r g b / 65%);
      .p-dot {
        background-color: #90a4ae;
      }
    }
  }

  .ocorrencia-link {
    text-decoration: none;
    color: var(--cor-grafite);
    font-weight: 600;
    display: block;
    line-height: 1.3;

    &:hover {
      color: var(--cor-primaria);
    }
  }

  .ocorrencia-sub {
    font-size: 0.76rem;
    color: rgb(from var(--cor-grafite) r g b / 58%);
    margin-top: 0.15rem;
  }

  .status-pill {
    display: inline-block;
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;

    &.aberta {
      background-color: rgb(from var(--cor-terciaria) r g b / 25%);
      color: #7a5200;
    }

    &.em-analise {
      background-color: rgb(from var(--cor-secundaria) r g b / 16%);
      color: var(--cor-secundaria);
    }

    &.em-andamento {
      background-color: var(--cor-secundaria);
      color: var(--cor-superficie);
    }
  }
`;

const CategoryBreakdownCard = styled(Surface)`
  padding: 1.25rem;

  h3 {
    font-size: 1rem;
    color: var(--cor-grafite);
    margin-bottom: 1rem;
  }

  .cat-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .cat-row-top {
    display: flex;
    justify-content: space-between;
    font-size: 0.825rem;
    margin-bottom: 0.3rem;
    color: var(--cor-grafite);

    strong {
      font-weight: 700;
    }
  }

  .bar-track {
    height: 6px;
    border-radius: 999px;
    background-color: var(--cor-borda);
    overflow: hidden;

    .bar-fill {
      height: 100%;
      border-radius: 999px;
      background-color: var(--cor-primaria);
    }
  }
`;

const NextEventAmberCard = styled.div`
  padding: 1.25rem;
  border-radius: 10px;
  background-color: rgb(from var(--cor-terciaria) r g b / 22%);

  .card-tag {
    font-size: 0.82rem;
    font-weight: 700;
    color: #6b4b07;
    margin-bottom: 0.45rem;
  }

  h4 {
    font-size: 0.95rem;
    color: var(--cor-grafite);
    margin-bottom: 0.2rem;
  }

  .event-meta {
    font-size: 0.8rem;
    color: #5f4206;
    margin-bottom: 0.65rem;
  }

  a {
    font-size: 0.82rem;
    font-weight: 600;
    color: #5f4206;
    text-decoration: underline;
  }
`;

function getPriorityInfo(prioridade) {
  if (
    prioridade === PrioridadeOcorrencia.ALTA ||
    prioridade === PrioridadeOcorrencia.URGENTE
  ) {
    return { className: 'alta', label: 'Alta', weight: 3 };
  }
  if (prioridade === PrioridadeOcorrencia.MEDIA) {
    return { className: 'media', label: 'Média', weight: 2 };
  }
  return { className: 'baixa', label: 'Baixa', weight: 1 };
}

function getStatusClass(status) {
  if (status === StatusOcorrencia.EM_ANDAMENTO) return 'em-andamento';
  if (status === StatusOcorrencia.EM_ANALISE) return 'em-analise';
  return 'aberta';
}

export default function ZeladorPainel() {
  const navigate = useNavigate();
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;

  const [tab, setTab] = useState('ALL');
  const [search, setSearch] = useState('');

  const todasBairro = ocorrenciaService.getByBairro(bairroId);
  const ativas = todasBairro.filter(
    (oc) =>
      oc.status !== StatusOcorrencia.CONCLUIDA &&
      oc.status !== StatusOcorrencia.ARQUIVADA,
  );
  const abertasCount = todasBairro.filter(
    (oc) => oc.status === StatusOcorrencia.ABERTA,
  ).length;
  const emAndamentoCount = todasBairro.filter(
    (oc) =>
      oc.status === StatusOcorrencia.EM_ANDAMENTO ||
      oc.status === StatusOcorrencia.EM_ANALISE,
  ).length;
  const resolvidasCount = todasBairro.filter(
    (oc) => oc.status === StatusOcorrencia.CONCLUIDA,
  ).length;

  const filaFiltrada = ativas
    .filter((oc) => {
      const matchesTab = tab === 'ALL' || oc.status === tab;
      const q = search.trim().toLowerCase();
      const codigo = `#zb-${String(oc.id).padStart(4, '0')}`;
      const matchesSearch =
        !q ||
        oc.titulo.toLowerCase().includes(q) ||
        codigo.includes(q) ||
        oc.localizacao?.logradouro?.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      const pDiff =
        getPriorityInfo(b.prioridade).weight -
        getPriorityInfo(a.prioridade).weight;
      if (pDiff !== 0) return pDiff;
      return (b.apoios ?? 0) - (a.apoios ?? 0);
    });

  // Agrupamento por categoria das demandas ativas
  const contagemCategorias = {};
  for (const oc of ativas) {
    contagemCategorias[oc.categoria] =
      (contagemCategorias[oc.categoria] ?? 0) + 1;
  }
  const categoriasOrdenadas = Object.entries(contagemCategorias).sort(
    (a, b) => b[1] - a[1],
  );
  const maxCat = Math.max(1, categoriasOrdenadas[0]?.[1] ?? 1);

  const proximoEvento = eventoService
    .getByBairro(bairroId)
    .slice()
    .sort((a, b) => a.data - b.data)[0];

  const primeiroNome = zelador?.nome?.split(' ')[0] ?? 'Roberto';

  return (
    <ZeladorLayout>
      <PageWrapper>
        <div className="top-bar">
          <div>
            <p className="sub-location">
              {zelador?.bairro?.nome ?? 'Vila Mariana'} · Terça, 17 de novembro
            </p>
            <h1>Bom dia, {primeiroNome}</h1>
          </div>

          <div className="top-actions">
            <div className="search-input">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar protocolo, rua..."
              />
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/zelador/comunicacao')}
            >
              <i className="fa-solid fa-plus" />
              Nova publicação
            </Button>
          </div>
        </div>

        <div className="kpi-grid">
          <KpiCard>
            <div className="kpi-top">
              <span>Abertas</span>
              <span className="dot amber" />
            </div>
            <p className="kpi-value">{abertasCount}</p>
            <p className="kpi-sub">Aguardando triagem inicial</p>
          </KpiCard>

          <KpiCard>
            <div className="kpi-top">
              <span>Em andamento</span>
              <span className="dot blue" />
            </div>
            <p className="kpi-value">{emAndamentoCount}</p>
            <p className="kpi-sub">Em análise ou execução no bairro</p>
          </KpiCard>

          <KpiCard>
            <div className="kpi-top">
              <span>Resolvidas no mês</span>
              <span className="dot green" />
            </div>
            <p className="kpi-value">{resolvidasCount + 30}</p>
            <p className="kpi-sub positive">+6 vs. outubro</p>
          </KpiCard>

          <KpiCard className="highlight-green">
            <div className="kpi-top">
              <span>Tempo médio de resolução</span>
            </div>
            <p className="kpi-value">4,2 dias</p>
            <p className="kpi-sub">Meta do bairro: 5 dias</p>
          </KpiCard>
        </div>

        <div className="main-grid">
          <QueueCard>
            <div className="queue-header">
              <h2>Fila priorizada</h2>
              <div className="queue-tabs">
                {QUEUE_TABS.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className={tab === t.value ? 'active' : ''}
                    onClick={() => setTab(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Prioridade</th>
                  <th>Ocorrência</th>
                  <th>Local</th>
                  <th>Apoios</th>
                  <th>Status</th>
                  <th>Registrada</th>
                </tr>
              </thead>
              <tbody>
                {filaFiltrada.map((oc) => {
                  const pInfo = getPriorityInfo(oc.prioridade);
                  const codigo = `#ZB-${String(oc.id).padStart(4, '0')}`;
                  const localStr = oc.localizacao
                    ? `${oc.localizacao.logradouro}${oc.localizacao.numero !== 'S/N' ? `, ${oc.localizacao.numero}` : ''}`
                    : '—';

                  return (
                    <tr key={oc.id}>
                      <td>
                        <span className={`priority-cell ${pInfo.className}`}>
                          <span className="p-dot" />
                          {pInfo.label}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/ocorrencias/${oc.id}`}
                          className="ocorrencia-link"
                        >
                          {oc.titulo}
                        </Link>
                        <p className="ocorrencia-sub">
                          {oc.categoria} · {codigo}
                        </p>
                      </td>
                      <td>{localStr}</td>
                      <td>
                        <strong>{oc.apoios}</strong>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${getStatusClass(oc.status)}`}
                        >
                          {oc.status}
                        </span>
                      </td>
                      <td
                        style={{
                          color: 'rgb(from var(--cor-grafite) r g b / 62%)',
                        }}
                      >
                        {formatRelativeDays(oc.dataCriacao)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </QueueCard>

          <div className="right-column">
            <CategoryBreakdownCard>
              <h3>Abertas por categoria</h3>
              <div className="cat-list">
                {categoriasOrdenadas.map(([cat, count]) => (
                  <div key={cat}>
                    <div className="cat-row-top">
                      <span>{cat}</span>
                      <strong>{count}</strong>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${(count / maxCat) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CategoryBreakdownCard>

            {proximoEvento && (
              <NextEventAmberCard>
                <p className="card-tag">Próximo evento</p>
                <h4>{proximoEvento.nome}</h4>
                <p className="event-meta">
                  {formatEventSchedule(proximoEvento.data)} ·{' '}
                  {proximoEvento.participacoes?.length ?? 0} confirmados
                </p>
                <Link to="/zelador/eventos">Gerenciar evento</Link>
              </NextEventAmberCard>
            )}
          </div>
        </div>
      </PageWrapper>
    </ZeladorLayout>
  );
}
