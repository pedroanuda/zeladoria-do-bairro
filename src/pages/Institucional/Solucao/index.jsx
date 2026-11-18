import { Button, Footer, InstitutionalHeader, Surface } from '@/components';
import { Link, useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2.25rem 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .hero-grid {
    display: grid;
    grid-template-columns: 6.5fr 5.5fr;
    gap: 2.5rem;
    align-items: center;
  }

  .hero-left {
    .badge-pill {
      display: inline-block;
      padding: 0.3rem 0.85rem;
      border-radius: 999px;
      background-color: rgb(from var(--cor-primaria) r g b / 14%);
      color: var(--cor-primaria);
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1.1rem;
    }

    h1 {
      font-size: 2.55rem;
      color: var(--cor-grafite);
      line-height: 1.15;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.02rem;
      color: rgb(from var(--cor-grafite) r g b / 75%);
      line-height: 1.58;
      margin-bottom: 1.5rem;
      max-width: 34rem;
    }

    .cta-row {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      flex-wrap: wrap;
      margin-bottom: 1.35rem;
    }

    .perks-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem 1.35rem;
      font-size: 0.825rem;
      color: rgb(from var(--cor-grafite) r g b / 72%);

      li {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;

        i {
          color: var(--cor-primaria);
        }
      }
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.15rem;
    gap: 1rem;

    h2 {
      font-size: 1.4rem;
      color: var(--cor-grafite);
    }

    a {
      text-decoration: none;
      color: var(--cor-secundaria);
      font-size: 0.9rem;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .iniciativas-showcase-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 1024px) {
    margin: 1.75rem 2rem 2.5rem;

    .hero-grid,
    .steps-grid,
    .iniciativas-showcase-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;

    .hero-left h1 {
      font-size: 1.85rem;
    }
  }
`;

const VisualShowcaseBox = styled.figure`
  position: relative;
  border-radius: 20px;
  background-color: var(--cor-secundaria);
  padding: 1.65rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-height: 24rem;
  justify-content: space-between;

  .bg-circle-dark {
    position: absolute;
    left: -3rem;
    bottom: 2rem;
    width: 14rem;
    height: 14rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }

  .bg-circle-amber {
    position: absolute;
    right: 1.35rem;
    bottom: 1.25rem;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    background-color: var(--cor-terciaria);
    pointer-events: none;
  }

  .floating-card {
    position: relative;
    z-index: 1;
    background-color: var(--cor-superficie);
    border-radius: 14px;
    padding: 0.95rem 1.1rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .card-ocorrencia {
    max-width: 19rem;

    .oc-top {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.55rem;

      .icon {
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 8px;
        background-color: rgb(from var(--cor-secundaria) r g b / 15%);
        color: var(--cor-secundaria);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
      }

      strong {
        display: block;
        font-size: 0.85rem;
        color: var(--cor-grafite);
      }

      span {
        font-size: 0.72rem;
        color: rgb(from var(--cor-grafite) r g b / 62%);
      }
    }

    .oc-mid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.72rem;
      color: rgb(from var(--cor-grafite) r g b / 70%);
      margin-bottom: 0.45rem;

      .pill {
        background-color: var(--cor-secundaria);
        color: var(--cor-superficie);
        padding: 0.15rem 0.55rem;
        border-radius: 999px;
        font-weight: 600;
        font-size: 0.68rem;
      }
    }

    .bars {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.25rem;

      span {
        height: 4px;
        border-radius: 999px;
        background-color: var(--cor-borda);

        &.on {
          background-color: var(--cor-primaria);
        }
      }
    }
  }

  .card-andamento {
    align-self: flex-end;
    width: 14.5rem;

    strong {
      display: block;
      font-size: 0.8rem;
      color: var(--cor-grafite);
      margin-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: var(--cor-grafite);

      li {
        display: flex;
        align-items: center;
        gap: 0.45rem;

        .dot {
          width: 0.95rem;
          height: 0.95rem;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          color: var(--cor-superficie);

          &.done {
            background-color: var(--cor-primaria);
          }

          &.active {
            background-color: var(--cor-secundaria);
          }

          &.pending {
            background-color: var(--cor-borda);
          }
        }
      }
    }
  }

  .card-concluida {
    max-width: 19.5rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;

    .check-circle {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--cor-primaria);
      color: var(--cor-superficie);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      flex-shrink: 0;
    }

    strong {
      display: block;
      font-size: 0.82rem;
      color: var(--cor-grafite);
    }

    span {
      font-size: 0.72rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
    }
  }
`;

const StepCard = styled(Surface)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  .step-icon {
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;

    &.green {
      background-color: rgb(from var(--cor-primaria) r g b / 14%);
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

  h3 {
    font-size: 1.05rem;
    color: var(--cor-grafite);
  }

  p {
    font-size: 0.88rem;
    color: rgb(from var(--cor-grafite) r g b / 72%);
    line-height: 1.5;
  }
`;

const ShowcaseIniciativaCard = styled(Surface)`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .banner {
    position: relative;
    height: 8rem;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: flex-end;
    overflow: hidden;

    &.green {
      background-color: var(--cor-primaria);
    }

    &.blue {
      background-color: var(--cor-secundaria);
    }

    &.dark {
      background-color: #323d43;
    }

    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .tag {
      position: relative;
      z-index: 1;
      padding: 0.22rem 0.65rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      background-color: var(--cor-superficie);
      color: var(--cor-primaria);

      &.amber {
        background-color: var(--cor-terciaria);
        color: var(--cor-grafite);
      }
    }
  }

  .body {
    padding: 1rem 1.15rem;

    h3 {
      font-size: 0.98rem;
      color: var(--cor-grafite);
      margin-bottom: 0.2rem;
    }

    p {
      font-size: 0.825rem;
      color: rgb(from var(--cor-grafite) r g b / 68%);
    }
  }
`;

export default function InstitucionalSolucao() {
  const navigate = useNavigate();

  return (
    <>
      <InstitutionalHeader />
      <StyledMain>
        <section className="hero-grid" aria-labelledby="solucao-titulo">
          <div className="hero-left">
            <span className="badge-pill">
              Zeladoria colaborativa do seu bairro
            </span>
            <h1 id="solucao-titulo">
              Cuide do seu bairro junto com quem mora nele.
            </h1>
            <p>
              Registre problemas nos espaços públicos, acompanhe cada solução e
              veja o que a zeladoria está fazendo perto de você.
            </p>

            <div className="cta-row">
              <Button
                variant="primary"
                onClick={() => navigate('/ocorrencias/nova')}
              >
                <i className="fa-solid fa-plus" />
                Registrar um problema
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/zelador/painel')}
              >
                <i className="fa-solid fa-shield-halved" />
                Sou zelador
              </Button>
            </div>

            <ul className="perks-list">
              <li>
                <i className="fa-solid fa-check" />
                <span>Registro em 1 minuto</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Acompanhe cada etapa</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Prestação de contas aberta</span>
              </li>
            </ul>
          </div>

          <VisualShowcaseBox aria-label="Prévia visual da interface da plataforma">
            <div className="bg-circle-dark" />
            <div className="bg-circle-amber" />

            <div className="floating-card card-ocorrencia">
              <div className="oc-top">
                <div className="icon">
                  <i className="fa-solid fa-person-walking" />
                </div>
                <div>
                  <strong>Calçada obstruída</strong>
                  <span>Rua das Acácias, 120</span>
                </div>
              </div>
              <div className="oc-mid">
                <span>23 vizinhos apoiam</span>
                <span className="pill">Em andamento</span>
              </div>
              <div className="bars">
                <span className="on" />
                <span className="on" />
                <span className="on" />
                <span />
              </div>
            </div>

            <div className="floating-card card-andamento">
              <strong>Andamento</strong>
              <ul>
                <li>
                  <span className="dot done">
                    <i className="fa-solid fa-check" />
                  </span>
                  <span>Registrada</span>
                </li>
                <li>
                  <span className="dot done">
                    <i className="fa-solid fa-check" />
                  </span>
                  <span>Em análise</span>
                </li>
                <li>
                  <span className="dot active" />
                  <strong
                    style={{
                      margin: 0,
                      color: 'var(--cor-secundaria)',
                      fontSize: '0.75rem',
                    }}
                  >
                    Em andamento
                  </strong>
                </li>
                <li>
                  <span className="dot pending" />
                  <span style={{ opacity: 0.6 }}>Resolvida</span>
                </li>
              </ul>
            </div>

            <div className="floating-card card-concluida">
              <div className="check-circle">
                <i className="fa-solid fa-check" />
              </div>
              <div>
                <strong>Praça Central revitalizada</strong>
                <span>Concluída pela zeladoria · publicada no mural</span>
              </div>
            </div>
          </VisualShowcaseBox>
        </section>

        <section aria-labelledby="como-funciona-titulo">
          <div className="section-header">
            <h2 id="como-funciona-titulo">Como funciona</h2>
          </div>

          <div className="steps-grid">
            <article>
              <StepCard>
                <div className="step-icon green">
                  <i className="fa-solid fa-camera" />
                </div>
                <h3>1. Registre</h3>
                <p>
                  Tire uma foto, informe o local e escolha a categoria. Se um
                  vizinho já tiver registrado o mesmo problema na rua, o sistema
                  avisa na hora para você somar seu apoio.
                </p>
              </StepCard>
            </article>

            <article>
              <StepCard>
                <div className="step-icon blue">
                  <i className="fa-regular fa-eye" />
                </div>
                <h3>2. Acompanhe</h3>
                <p>
                  Veja cada mudança de status e as observações técnicas do
                  zelador responsável. Quanto mais vizinhos apoiam uma demanda,
                  maior a prioridade na fila do bairro.
                </p>
              </StepCard>
            </article>

            <article>
              <StepCard>
                <div className="step-icon amber">
                  <i className="fa-solid fa-check" />
                </div>
                <h3>3. Veja o resultado</h3>
                <p>
                  Melhorias concluídas pela equipe de zeladoria vão direto para
                  o mural de iniciativas do bairro, junto com a agenda de
                  mutirões e comunicados oficiais.
                </p>
              </StepCard>
            </article>
          </div>
        </section>

        <section aria-labelledby="iniciativas-recentes-titulo">
          <div className="section-header">
            <h2 id="iniciativas-recentes-titulo">
              Iniciativas recentes no bairro
            </h2>
            <Link to="/mural">Ver mural completo</Link>
          </div>

          <div className="iniciativas-showcase-grid">
            <article>
              <ShowcaseIniciativaCard>
                <div className="banner green">
                  <svg
                    viewBox="0 0 320 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 95 Q160 65 320 90 L320 120 L0 120 Z"
                      fill="rgba(0, 0, 0, 0.16)"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 320 120"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <circle
                      cx="245"
                      cy="35"
                      r="55"
                      fill="rgba(255, 255, 255, 0.08)"
                    />
                    <rect
                      x="118"
                      y="68"
                      width="84"
                      height="7"
                      rx="3"
                      fill="var(--cor-terciaria)"
                    />
                    <rect
                      x="130"
                      y="75"
                      width="7"
                      height="18"
                      rx="2"
                      fill="var(--cor-terciaria)"
                    />
                    <rect
                      x="183"
                      y="75"
                      width="7"
                      height="18"
                      rx="2"
                      fill="var(--cor-terciaria)"
                    />
                  </svg>
                  <span className="tag">Concluída</span>
                </div>
                <div className="body">
                  <h3>Praça Central revitalizada</h3>
                  <p>Novos bancos e iluminação LED</p>
                </div>
              </ShowcaseIniciativaCard>
            </article>

            <article>
              <ShowcaseIniciativaCard>
                <div className="banner blue">
                  <svg
                    viewBox="0 0 320 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M150 120 Q235 55 320 75 L320 120 Z"
                      fill="rgba(0, 0, 0, 0.14)"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 320 120"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <circle
                      cx="265"
                      cy="25"
                      r="55"
                      fill="rgba(255, 255, 255, 0.12)"
                    />
                    <circle
                      cx="95"
                      cy="42"
                      r="18"
                      fill="var(--cor-terciaria)"
                    />
                  </svg>
                  <span className="tag amber">Evento · sáb 22/11</span>
                </div>
                <div className="body">
                  <h3>Mutirão de limpeza</h3>
                  <p>Encontro às 9h na praça do bairro</p>
                </div>
              </ShowcaseIniciativaCard>
            </article>

            <article>
              <ShowcaseIniciativaCard>
                <div className="banner dark">
                  <svg
                    viewBox="0 0 320 120"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <circle
                      cx="160"
                      cy="28"
                      r="28"
                      fill="rgba(242, 181, 68, 0.2)"
                    />
                    <circle
                      cx="160"
                      cy="28"
                      r="12"
                      fill="var(--cor-terciaria)"
                    />
                    <rect x="156" y="40" width="8" height="80" fill="#8b969c" />
                  </svg>
                  <span className="tag">Concluída</span>
                </div>
                <div className="body">
                  <h3>Iluminação da R. França Pinto</h3>
                  <p>Luminárias substituídas por LED</p>
                </div>
              </ShowcaseIniciativaCard>
            </article>
          </div>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
}
