import {
  formatEventBadgeDate,
  formatEventSchedule,
} from '@/common/utils/formatters.js';
import Surface from '@/components/Surface';
import { Link } from 'react-router';
import styled from 'styled-components';

const MAX_EVENTOS = 2;

const StyledSurface = styled(Surface)`
  padding: 1.25rem;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;

    > h3 {
      font-size: 1.05rem;
      color: var(--cor-grafite);
      line-height: 1.25rem;
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

  .evento-item {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--cor-borda);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .date-badge {
    width: 3rem;
    height: 3rem;
    border-radius: 10px;
    background-color: var(--cor-fundo);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    line-height: 1.1;

    .day {
      font-family: var(--fonte-heading);
      font-weight: 700;
      font-size: 1rem;
      color: var(--cor-grafite);
    }

    .month {
      font-size: 0.65rem;
      font-weight: 600;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      letter-spacing: 0.04em;
    }
  }

  .evento-info {
    min-width: 0;

    .evento-nome {
      font-weight: 600;
      color: var(--cor-grafite);
      font-size: 0.925rem;
      line-height: 1.3;
    }

    .evento-meta {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      margin-top: 0.2rem;
    }
  }

  .empty-state {
    padding: 1rem 0 0.25rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    font-size: 0.875rem;
  }
`;

export default function ProximosEventosSection({ eventos = [] }) {
  const visiveis = eventos.slice(0, MAX_EVENTOS);

  return (
    <StyledSurface>
      <div className="card-header">
        <h3>Próximos eventos</h3>
        <Link to="/eventos">Ver tudo</Link>
      </div>
      {visiveis.length === 0 ? (
        <p className="empty-state">Nenhum evento programado neste bairro.</p>
      ) : (
        visiveis.map((evento) => {
          const { day, monthShort } = formatEventBadgeDate(evento.data);
          const localLabel =
            evento.localizacao?.logradouro ??
            evento.bairro?.nome ??
            'Local a definir';

          return (
            <div key={evento.id} className="evento-item">
              <div className="date-badge">
                <span className="day">{day}</span>
                <span className="month">{monthShort}</span>
              </div>
              <div className="evento-info">
                <p className="evento-nome">{evento.nome}</p>
                <p className="evento-meta">
                  {formatEventSchedule(evento.data)} · {localLabel}
                </p>
              </div>
            </div>
          );
        })
      )}
    </StyledSurface>
  );
}
