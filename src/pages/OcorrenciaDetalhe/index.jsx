import { StatusOcorrencia } from '@/common/models/index.js';
import { formatRelativeDays } from '@/common/utils/formatters.js';
import { Button, Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import { ocorrenciaService, usuarioService } from '@/services';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import styled from 'styled-components';

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 1.75rem 5rem 3rem;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    text-decoration: none;
    color: rgb(from var(--cor-grafite) r g b / 70%);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1.25rem;

    &:hover {
      color: var(--cor-primaria);
    }
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 8fr 4fr;
    gap: 1.5rem;
    align-items: start;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: 2.2fr 1fr;
    gap: 0.85rem;
    height: 19rem;

    &.single-photo {
      grid-template-columns: 1fr;
    }
  }

  .photo-box {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background-color: #9ba7ad;
    border: 1px solid var(--cor-borda);

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .photo-counter {
      position: absolute;
      right: 0.85rem;
      bottom: 0.85rem;
      background-color: rgba(38, 50, 56, 0.78);
      color: var(--cor-superficie);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
    }
  }

  .info-block {
    padding: 0.25rem 0;

    .meta-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.6rem;
      flex-wrap: wrap;
    }

    .categoria-pill {
      background-color: rgb(from var(--cor-secundaria) r g b / 15%);
      color: var(--cor-secundaria);
      font-size: 0.78rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
    }

    .code-date {
      font-size: 0.825rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
    }

    h1 {
      font-size: 1.75rem;
      color: var(--cor-grafite);
      line-height: 1.25;
      margin-bottom: 0.45rem;
    }

    .location-line {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.9rem;
      color: rgb(from var(--cor-grafite) r g b / 75%);
      margin-bottom: 0.9rem;

      i {
        color: rgb(from var(--cor-grafite) r g b / 60%);
      }
    }

    .description {
      font-size: 0.95rem;
      line-height: 1.55;
      color: var(--cor-grafite);
    }
  }

  @media (max-width: 1024px) {
    margin: 1.5rem 2rem 2.5rem;

    .detail-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;

    .gallery-grid {
      grid-template-columns: 1fr;
      height: auto;

      .photo-box {
        height: 13rem;
      }
    }
  }
`;

const TimelineCard = styled(Surface)`
  padding: 1.5rem;

  > h3 {
    font-size: 1.1rem;
    color: var(--cor-grafite);
    margin-bottom: 1.25rem;
  }

  .timeline {
    display: flex;
    flex-direction: column;
  }

  .timeline-step {
    display: flex;
    gap: 0.9rem;
    position: relative;
    padding-bottom: 1.35rem;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .step-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 1.6rem;

    .dot {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      z-index: 1;

      &.done {
        background-color: var(--cor-primaria);
        color: var(--cor-superficie);
      }

      &.active {
        background-color: var(--cor-secundaria);
        color: var(--cor-superficie);
        box-shadow: 0 0 0 4px rgb(from var(--cor-secundaria) r g b / 20%);
      }

      &.pending {
        background-color: var(--cor-superficie);
        border: 2px solid var(--cor-borda);
      }
    }

    .connector {
      flex: 1;
      width: 2px;
      margin-top: 0.25rem;
      margin-bottom: -1.1rem;
      background-color: var(--cor-borda);

      &.done {
        background-color: var(--cor-primaria);
      }
    }
  }

  .step-content {
    flex: 1;
    padding-top: 0.05rem;

    .step-title {
      font-weight: 600;
      font-size: 0.925rem;
      color: var(--cor-grafite);

      &.active {
        color: var(--cor-secundaria);
      }

      &.pending {
        font-weight: 500;
        color: rgb(from var(--cor-grafite) r g b / 65%);
      }
    }

    .step-meta {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 62%);
      margin-top: 0.15rem;
    }

    .step-quote {
      margin-top: 0.6rem;
      padding: 0.65rem 0.9rem;
      border-radius: 8px;
      background-color: var(--cor-fundo);
      font-size: 0.85rem;
      color: var(--cor-grafite);
      line-height: 1.4;
    }
  }
`;

const SidebarCard = styled(Surface)`
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label {
      font-size: 0.85rem;
      color: rgb(from var(--cor-grafite) r g b / 70%);
      font-weight: 500;
    }
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;

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

  .forecast-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding-bottom: 1.1rem;
    border-bottom: 1px solid var(--cor-borda);

    .clock-box {
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 10px;
      background-color: rgb(from var(--cor-secundaria) r g b / 15%);
      color: var(--cor-secundaria);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .forecast-title {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--cor-grafite);
    }

    .forecast-sub {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      margin-top: 0.1rem;
    }
  }

  .support-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-bottom: 1.1rem;
    border-bottom: 1px solid var(--cor-borda);

    .support-count {
      font-weight: 700;
      font-size: 1rem;
      color: var(--cor-grafite);
    }

    .support-sub {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      margin-top: 0.1rem;
    }
  }

  .zelador-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .avatar {
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 50%;
      background-color: var(--cor-secundaria);
      color: var(--cor-superficie);
      font-weight: 700;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .zelador-name {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--cor-grafite);
    }

    .zelador-role {
      font-size: 0.78rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
    }
  }
`;

function PrimaryPhotoIllustration() {
  return (
    <svg viewBox="0 0 500 300" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="300" fill="#99a5ac" />
      <rect x="0" y="190" width="500" height="110" fill="#adb8be" />
      <rect x="0" y="176" width="500" height="14" fill="#cfd6da" />
      <rect x="52" y="62" width="86" height="114" rx="4" fill="#aeb9bf" />
      <rect x="176" y="112" width="148" height="94" rx="8" fill="#4d5960" />
      <rect x="212" y="84" width="78" height="36" rx="5" fill="#424d54" />
      <rect x="372" y="34" width="14" height="156" fill="#525f66" />
    </svg>
  );
}

function SecondaryPhotoIllustration() {
  return (
    <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="300" fill="#323d43" />
      <rect x="0" y="210" width="240" height="90" fill="#3d4950" />
      <circle cx="102" cy="58" r="42" fill="rgba(242, 181, 68, 0.22)" />
      <circle cx="102" cy="58" r="19" fill="#f2b544" />
      <rect x="96" y="77" width="11" height="142" fill="#8b969c" />
    </svg>
  );
}

function formatDayMonth(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

function getStatusBadgeInfo(status) {
  switch (status) {
    case StatusOcorrencia.ABERTA:
      return { className: 'aberta', label: 'Aberta' };
    case StatusOcorrencia.EM_ANALISE:
      return { className: 'em-analise', label: 'Em análise' };
    case StatusOcorrencia.EM_ANDAMENTO:
      return { className: 'em-andamento', label: 'Em andamento' };
    case StatusOcorrencia.CONCLUIDA:
      return { className: 'concluida', label: 'Resolvida' };
    case StatusOcorrencia.ARQUIVADA:
      return { className: 'arquivada', label: 'Arquivada' };
    default:
      return { className: 'aberta', label: status };
  }
}

function getStepLabel(status, index) {
  if (index === 0 && status === StatusOcorrencia.ABERTA) return 'Registrada';
  switch (status) {
    case StatusOcorrencia.ABERTA:
      return 'Aberta';
    case StatusOcorrencia.EM_ANALISE:
      return 'Em análise';
    case StatusOcorrencia.EM_ANDAMENTO:
      return 'Em andamento';
    case StatusOcorrencia.CONCLUIDA:
      return 'Resolvida';
    case StatusOcorrencia.ARQUIVADA:
      return 'Arquivada';
    default:
      return status;
  }
}

export default function OcorrenciaDetalhe() {
  const { id } = useParams();
  const currentUser = usuarioService.getCurrentUser();
  const [ocorrencia, setOcorrencia] = useState(() =>
    ocorrenciaService.getById(id),
  );
  const [apoiado, setApoiado] = useState(false);

  if (!ocorrencia) {
    return (
      <>
        <Header />
        <StyledMain>
          <Link to="/minhas-ocorrencias" className="back-link">
            <i className="fa-solid fa-chevron-left" /> Minhas ocorrências
          </Link>
          <Surface style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Ocorrência não encontrada</h3>
            <p style={{ marginTop: '0.5rem' }}>
              Verifique o endereço ou retorne para a listagem de ocorrências.
            </p>
          </Surface>
        </StyledMain>
        <Footer />
      </>
    );
  }

  const handleApoiar = () => {
    if (apoiado) return;
    const atualizada = ocorrenciaService.apoiar(ocorrencia.id);
    if (atualizada) {
      setOcorrencia(atualizada);
      setApoiado(true);
    }
  };

  const badgeInfo = getStatusBadgeInfo(ocorrencia.status);
  const codigoFormatado = `#ZB-${String(ocorrencia.id).padStart(4, '0')}`;
  const loc = ocorrencia.localizacao;
  const enderecoCompleto = loc
    ? `${loc.logradouro}${loc.numero && loc.numero !== 'S/N' ? `, ${loc.numero}` : ''} · ${loc.bairro?.nome ?? ''}${loc.pontoReferencia ? ` (${loc.pontoReferencia})` : ''}`
    : 'Localização não informada';

  const atualizacoes = ocorrencia.atualizacoes ?? [];
  const isFinalizada =
    ocorrencia.status === StatusOcorrencia.CONCLUIDA ||
    ocorrencia.status === StatusOcorrencia.ARQUIVADA;

  const previsaoData = new Date(ocorrencia.dataCriacao);
  previsaoData.setDate(previsaoData.getDate() + 10);

  const zeladorNome =
    ocorrencia.atribuidoPara?.nome?.replace(' (Subprefeitura)', '') ??
    'Equipe da Subprefeitura';
  const zeladorInicial = zeladorNome.charAt(0).toUpperCase();

  return (
    <>
      <Header />
      <StyledMain>
        <Link to="/minhas-ocorrencias" className="back-link">
          <i className="fa-solid fa-chevron-left" /> Minhas ocorrências
        </Link>

        <div className="detail-grid">
          <div className="left-column">
            <div className="gallery-grid">
              <div className="photo-box">
                <PrimaryPhotoIllustration />
                <span className="photo-counter">
                  1 / {Math.max(2, ocorrencia.anexos?.length || 2)}
                </span>
              </div>
              <div className="photo-box">
                <SecondaryPhotoIllustration />
              </div>
            </div>

            <div className="info-block">
              <div className="meta-row">
                <span className="categoria-pill">{ocorrencia.categoria}</span>
                <span className="code-date">
                  {codigoFormatado} · registrada{' '}
                  {formatRelativeDays(ocorrencia.dataCriacao)}
                </span>
              </div>
              <h1>{ocorrencia.titulo}</h1>
              <p className="location-line">
                <i className="fa-solid fa-location-dot" />
                <span>{enderecoCompleto}</span>
              </p>
              <p className="description">{ocorrencia.descricao}</p>
            </div>

            <TimelineCard>
              <h3>Andamento</h3>
              <div className="timeline">
                {atualizacoes.map((atu, index) => {
                  const isLastActual = index === atualizacoes.length - 1;
                  const isActive = isLastActual && !isFinalizada;
                  const authorLabel =
                    atu.autorId === currentUser?.id
                      ? 'por você'
                      : `Zelador ${atu.autor?.nome?.split(' ')[0] ?? 'Responsável'}`;
                  const showQuote =
                    index > 0 &&
                    atu.observacao &&
                    (!isActive || atualizacoes.length <= 2);

                  return (
                    <div key={atu.id ?? index} className="timeline-step">
                      <div className="step-indicator">
                        <div className={`dot ${isActive ? 'active' : 'done'}`}>
                          {!isActive && <i className="fa-solid fa-check" />}
                        </div>
                        {(index < atualizacoes.length - 1 || !isFinalizada) && (
                          <div
                            className={`connector ${isActive ? '' : 'done'}`}
                          />
                        )}
                      </div>
                      <div className="step-content">
                        <p className={`step-title ${isActive ? 'active' : ''}`}>
                          {getStepLabel(atu.status, index)}
                        </p>
                        <p className="step-meta">
                          {formatDayMonth(atu.data)} ·{' '}
                          {isActive && atu.observacao
                            ? atu.observacao
                            : authorLabel}
                        </p>
                        {showQuote && (
                          <div className="step-quote">“{atu.observacao}”</div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {!isFinalizada && (
                  <div className="timeline-step">
                    <div className="step-indicator">
                      <div className="dot pending" />
                    </div>
                    <div className="step-content">
                      <p className="step-title pending">Resolvida</p>
                      <p className="step-meta">Você será avisado</p>
                    </div>
                  </div>
                )}
              </div>
            </TimelineCard>
          </div>

          <SidebarCard>
            <div className="status-header">
              <span className="label">Status atual</span>
              <span className={`status-badge ${badgeInfo.className}`}>
                {badgeInfo.label}
              </span>
            </div>

            <div className="forecast-row">
              <div className="clock-box">
                <i className="fa-regular fa-clock" />
              </div>
              <div>
                <p className="forecast-title">
                  {ocorrencia.status === StatusOcorrencia.CONCLUIDA
                    ? 'Demanda concluída'
                    : `Previsão: ${formatDayMonth(previsaoData)}`}
                </p>
                <p className="forecast-sub">
                  {ocorrencia.status === StatusOcorrencia.CONCLUIDA
                    ? 'Atendimento finalizado pela zeladoria'
                    : 'Atendimento agendado pela zeladoria'}
                </p>
              </div>
            </div>

            <div className="support-block">
              <div>
                <p className="support-count">
                  {ocorrencia.apoios} vizinhos apoiam
                </p>
                <p className="support-sub">Mais apoios aumentam a prioridade</p>
              </div>
              <Button
                variant="primary"
                onClick={handleApoiar}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <i className="fa-solid fa-arrow-up" />
                {apoiado
                  ? 'Você apoiou esta ocorrência'
                  : 'Apoiar esta ocorrência'}
              </Button>
            </div>

            <div className="zelador-row">
              <div className="avatar">{zeladorInicial}</div>
              <div>
                <p className="zelador-name">{zeladorNome}</p>
                <p className="zelador-role">
                  {ocorrencia.atribuidoPara
                    ? 'Zelador responsável'
                    : 'Aguardando atribuição'}
                </p>
              </div>
            </div>
          </SidebarCard>
        </div>
      </StyledMain>
      <Footer />
    </>
  );
}
