import {
  formatEventBadgeDate,
  formatEventSchedule,
} from '@/common/utils/formatters.js';
import { Button, Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import {
  bairroService,
  eventoService,
  iniciativaService,
  usuarioService,
} from '@/services';
import { useState } from 'react';
import { Link } from 'react-router';
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
    margin-bottom: 0.75rem;

    &:hover {
      color: var(--cor-primaria);
    }
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.75rem;
    gap: 1rem;
    flex-wrap: wrap;

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

  .bairro-selector {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--cor-primaria);
    font-size: 0.875rem;
    margin-bottom: 0.35rem;

    select {
      appearance: none;
      border: none;
      background: transparent;
      font-family: var(--fonte-body);
      font-size: 0.875rem;
      color: rgb(from var(--cor-grafite) r g b / 80%);
      font-weight: 500;
      cursor: pointer;
      padding-right: 0.25rem;

      &:focus {
        outline: none;
      }
    }

    .chevron-icon {
      font-size: 0.7rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      pointer-events: none;
    }
  }

  .eventos-grid {
    display: grid;
    grid-template-columns: 8fr 4fr;
    gap: 1.5rem;
    align-items: start;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  @media (max-width: 1024px) {
    margin: 1.5rem 2rem 2.5rem;

    .eventos-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;
  }
`;

const EventoCard = styled(Surface)`
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 1.15rem;
    gap: 0.9rem;
  }

  .calendar-badge {
    width: 4rem;
    height: 4rem;
    border-radius: 12px;
    background-color: var(--cor-fundo);
    border: 1px solid var(--cor-borda);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    line-height: 1.1;

    .day {
      font-family: var(--fonte-heading);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--cor-primaria);
    }

    .month {
      font-size: 0.72rem;
      font-weight: 700;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      letter-spacing: 0.05em;
    }
  }

  .evento-body {
    flex: 1;
    min-width: 0;

    h3 {
      font-size: 1.1rem;
      color: var(--cor-grafite);
      line-height: 1.3;
      margin-bottom: 0.35rem;
    }

    .evento-desc {
      font-size: 0.9rem;
      color: rgb(from var(--cor-grafite) r g b / 78%);
      line-height: 1.48;
      margin-bottom: 0.85rem;
    }

    .meta-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1.1rem;
      font-size: 0.825rem;
      color: rgb(from var(--cor-grafite) r g b / 68%);
      margin-bottom: 1.1rem;

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }

      i {
        color: var(--cor-secundaria);
      }
    }

    .participacao-bar {
      padding-top: 0.95rem;
      border-top: 1px solid var(--cor-borda);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .participantes-info {
      display: flex;
      align-items: center;
      gap: 0.65rem;

      .avatars {
        display: flex;
        align-items: center;

        .avatar-circle {
          width: 1.85rem;
          height: 1.85rem;
          border-radius: 50%;
          background-color: var(--cor-secundaria);
          color: var(--cor-superficie);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--cor-superficie);
          margin-left: -0.45rem;

          &:first-child {
            margin-left: 0;
          }
        }
      }

      .count-text {
        font-size: 0.825rem;
        color: rgb(from var(--cor-grafite) r g b / 72%);
        font-weight: 500;
      }
    }

    .confirmed-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.95rem;
      border-radius: 10px;
      background-color: rgb(from var(--cor-primaria) r g b / 15%);
      color: var(--cor-primaria);
      font-size: 0.85rem;
      font-weight: 600;
    }
  }
`;

const SidebarSurface = styled(Surface)`
  padding: 1.25rem;

  > h3 {
    font-size: 1.05rem;
    color: var(--cor-grafite);
    margin-bottom: 0.25rem;
  }

  > .sub {
    font-size: 0.8rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    padding-bottom: 0.85rem;
    border-bottom: 1px solid var(--cor-borda);
  }

  .ini-item {
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--cor-borda);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    h4 {
      font-size: 0.9rem;
      color: var(--cor-grafite);
      margin-bottom: 0.2rem;
    }

    p {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 68%);
      line-height: 1.38;
      margin-bottom: 0.4rem;
    }

    a {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--cor-secundaria);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const TipsCard = styled.aside`
  padding: 1.25rem;
  border-radius: 10px;
  background-color: rgb(from var(--cor-terciaria) r g b / 22%);

  h3 {
    font-size: 0.95rem;
    color: #5f4206;
    margin-bottom: 0.65rem;
  }

  p {
    font-size: 0.825rem;
    color: #5f4206;
    line-height: 1.45;
  }
`;

export default function Eventos() {
  const currentUser = usuarioService.getCurrentUser();
  const bairros = bairroService.getAll();
  const [selectedBairroId, setSelectedBairroId] = useState(
    currentUser?.bairroId ?? bairros[0]?.id ?? 1,
  );
  const [version, setVersion] = useState(0);

  const eventosBairro = eventoService
    .getByBairro(selectedBairroId)
    .slice()
    .sort((a, b) => a.data - b.data);
  void version;

  const iniciativasEventos = iniciativaService
    .getByBairro(selectedBairroId)
    .filter((ini) => Boolean(ini.eventoRelacionado));

  const handleConfirmarPresenca = (eventoId) => {
    eventoService.confirmarParticipacao(eventoId, currentUser?.id ?? 1);
    setVersion((v) => v + 1);
  };

  return (
    <>
      <Header />
      <StyledMain>
        <Link to="/home" className="back-link">
          <i className="fa-solid fa-chevron-left" /> Início
        </Link>

        <div className="page-header">
          <div>
            <div className="bairro-selector">
              <i className="fa-solid fa-location-dot" />
              <select
                aria-label="Selecionar bairro"
                value={selectedBairroId}
                onChange={(e) => setSelectedBairroId(Number(e.target.value))}
              >
                {bairros.map((bairro) => (
                  <option key={bairro.id} value={bairro.id}>
                    {bairro.nome}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down chevron-icon" />
            </div>
            <h1>Eventos do Bairro</h1>
            <p>
              Confira a programação de mutirões, encontros e reuniões
              comunitárias e confirme sua participação.
            </p>
          </div>
        </div>

        <div className="eventos-grid">
          <div className="left-column">
            {eventosBairro.length === 0 ? (
              <Surface
                style={{
                  padding: '2.5rem',
                  textAlign: 'center',
                  color: 'rgb(from var(--cor-grafite) r g b / 65%)',
                }}
              >
                Nenhum evento agendado para este bairro no momento.
              </Surface>
            ) : (
              eventosBairro.map((evento) => {
                const { day, monthShort } = formatEventBadgeDate(evento.data);
                const jaConfirmou = evento.participacoes?.some(
                  (part) => part.usuarioId === (currentUser?.id ?? 1),
                );
                const localTexto = evento.localizacao
                  ? `${evento.localizacao.logradouro}${evento.localizacao.numero !== 'S/N' ? `, ${evento.localizacao.numero}` : ''}${evento.localizacao.pontoReferencia ? ` (${evento.localizacao.pontoReferencia})` : ''}`
                  : evento.bairro?.nome;

                return (
                  <EventoCard key={evento.id}>
                    <div className="calendar-badge">
                      <span className="day">{day}</span>
                      <span className="month">{monthShort}</span>
                    </div>

                    <div className="evento-body">
                      <h3>{evento.nome}</h3>
                      <p className="evento-desc">{evento.descricao}</p>

                      <div className="meta-list">
                        <span>
                          <i className="fa-regular fa-clock" />
                          {formatEventSchedule(evento.data)}
                        </span>
                        <span>
                          <i className="fa-solid fa-location-dot" />
                          {localTexto}
                        </span>
                        <span>
                          <i className="fa-regular fa-user" />
                          Organizado por {evento.criador?.nome ?? 'Zeladoria'}
                        </span>
                      </div>

                      <div className="participacao-bar">
                        <div className="participantes-info">
                          {evento.participantes?.length > 0 && (
                            <div className="avatars">
                              {evento.participantes.slice(0, 4).map((user) => (
                                <div
                                  key={user.id}
                                  className="avatar-circle"
                                  title={user.nome}
                                >
                                  {user.nome.charAt(0).toUpperCase()}
                                </div>
                              ))}
                            </div>
                          )}
                          <span className="count-text">
                            {evento.participacoes?.length === 0
                              ? 'Seja o primeiro morador a confirmar presença'
                              : `${evento.participacoes?.length} ${evento.participacoes?.length === 1 ? 'morador confirmou' : 'moradores confirmaram'} presença`}
                          </span>
                        </div>

                        {jaConfirmou ? (
                          <span className="confirmed-pill">
                            <i className="fa-solid fa-check" />
                            Presença confirmada
                          </span>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => handleConfirmarPresenca(evento.id)}
                          >
                            <i className="fa-regular fa-calendar-check" />
                            Confirmar presença
                          </Button>
                        )}
                      </div>
                    </div>
                  </EventoCard>
                );
              })
            )}
          </div>

          <div className="right-column">
            <SidebarSurface>
              <h3>Iniciativas relacionadas</h3>
              <p className="sub">
                Ações comunitárias conectadas aos eventos deste bairro.
              </p>

              {iniciativasEventos.length === 0 ? (
                <p
                  style={{
                    paddingTop: '1rem',
                    fontSize: '0.85rem',
                    color: 'rgb(from var(--cor-grafite) r g b / 65%)',
                  }}
                >
                  Nenhuma iniciativa vinculada a eventos neste bairro.
                </p>
              ) : (
                iniciativasEventos.map((ini) => (
                  <div key={ini.id} className="ini-item">
                    <h4>{ini.nome}</h4>
                    <p>{ini.descricao}</p>
                    <Link to="/mural">Ver no Mural da Comunidade →</Link>
                  </div>
                ))
              )}
            </SidebarSurface>

            <TipsCard>
              <h3>Participação Comunitária</h3>
              <p>
                Ao confirmar presença em um evento ou mutirão, você ajuda a
                equipe de zeladoria e as lideranças do bairro a dimensionarem
                materiais, ferramentas e suporte necessários para a atividade.
              </p>
            </TipsCard>
          </div>
        </div>
      </StyledMain>
      <Footer />
    </>
  );
}
