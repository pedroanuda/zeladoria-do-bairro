import { formatShortEventDate } from '@/common/utils/formatters.js';
import Surface from '@/components/Surface';
import { Link } from 'react-router';
import styled from 'styled-components';

const MAX_INICIATIVAS = 2;

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

  .iniciativas-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledCard = styled(Surface)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--cor-primaria);
  }

  > .card-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    flex: 1;
  }

  .card-banner {
    position: relative;
    height: 7.5rem;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 0.75rem 1rem;

    &.variant-green {
      background-color: var(--cor-primaria);
    }

    &.variant-blue {
      background-color: var(--cor-secundaria);
    }

    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }

  .card-tag {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;

    &.tag-light {
      background-color: var(--cor-superficie);
      color: var(--cor-primaria);
    }

    &.tag-amber {
      background-color: var(--cor-terciaria);
      color: var(--cor-grafite);
    }
  }

  .card-content {
    padding: 0.9rem 1rem 1rem;

    > h4 {
      font-size: 0.95rem;
      color: var(--cor-grafite);
      margin-bottom: 0.25rem;
    }

    > p {
      font-size: 0.825rem;
      color: rgb(from var(--cor-grafite) r g b / 68%);
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const EmptySurface = styled(Surface)`
  padding: 1.5rem;
  text-align: center;
  color: rgb(from var(--cor-grafite) r g b / 65%);
  font-size: 0.9rem;
`;

function ParkIllustration() {
  return (
    <>
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
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
        <circle cx="95" cy="40" r="65" fill="rgba(255, 255, 255, 0.08)" />
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
    </>
  );
}

function CommunityIllustration() {
  return (
    <>
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M150 120 Q235 55 320 75 L320 120 Z"
          fill="rgba(0, 0, 0, 0.14)"
        />
        <path
          d="M0 100 Q95 78 210 120 L0 120 Z"
          fill="rgba(255, 255, 255, 0.08)"
        />
      </svg>
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <circle cx="265" cy="25" r="55" fill="rgba(255, 255, 255, 0.12)" />
        <circle cx="95" cy="42" r="18" fill="var(--cor-terciaria)" />
      </svg>
    </>
  );
}

function getIniciativaTag(iniciativa) {
  if (iniciativa.eventoRelacionado?.data) {
    return {
      className: 'tag-amber',
      label: `Evento · ${formatShortEventDate(iniciativa.eventoRelacionado.data)}`,
    };
  }

  if (iniciativa.demandaRelacionada?.status) {
    return {
      className: 'tag-light',
      label: iniciativa.demandaRelacionada.status,
    };
  }

  return {
    className: 'tag-light',
    label: 'Ação contínua',
  };
}

export default function MuralIniciativasSection({ iniciativas = [] }) {
  const visiveis = iniciativas.slice(0, MAX_INICIATIVAS);

  return (
    <StyledSection>
      <div className="section-header">
        <h3>Mural de iniciativas</h3>
        <Link to="/mural">Ver mural</Link>
      </div>
      {visiveis.length === 0 ? (
        <EmptySurface>
          Nenhuma iniciativa cadastrada para este bairro.
        </EmptySurface>
      ) : (
        <div className="iniciativas-grid">
          {visiveis.map((iniciativa, index) => {
            const isGreen = index % 2 === 0;
            const tag = getIniciativaTag(iniciativa);

            return (
              <StyledCard key={iniciativa.id}>
                <Link to="/mural" className="card-link">
                  <div
                    className={`card-banner ${isGreen ? 'variant-green' : 'variant-blue'}`}
                  >
                    {isGreen ? <ParkIllustration /> : <CommunityIllustration />}
                    <span className={`card-tag ${tag.className}`}>
                      {tag.label}
                    </span>
                  </div>
                  <div className="card-content">
                    <h4>{iniciativa.nome}</h4>
                    <p>{iniciativa.descricao}</p>
                  </div>
                </Link>
              </StyledCard>
            );
          })}
        </div>
      )}
    </StyledSection>
  );
}
