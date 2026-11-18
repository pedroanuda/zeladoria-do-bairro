import { formatRelativeDays } from '@/common/utils/formatters.js';
import Surface from '@/components/Surface';
import { Link } from 'react-router';
import styled from 'styled-components';

const MAX_NOTICIAS = 3;

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

  .noticia-item {
    display: block;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--cor-borda);
    text-decoration: none;
    color: inherit;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:hover .noticia-titulo {
      color: var(--cor-primaria);
    }

    .noticia-titulo {
      font-weight: 600;
      color: var(--cor-grafite);
      font-size: 0.925rem;
      line-height: 1.35;
      transition: color 0.15s ease;
    }

    .noticia-meta {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 62%);
      margin-top: 0.2rem;
    }
  }

  .empty-state {
    padding: 1rem 0 0.25rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    font-size: 0.875rem;
  }
`;

export default function NoticiasBairroSection({ noticias = [] }) {
  const visiveis = noticias.slice(0, MAX_NOTICIAS);

  return (
    <StyledSurface>
      <div className="card-header">
        <h3>Notícias do bairro</h3>
        <Link to="/noticias">Ver tudo</Link>
      </div>
      {visiveis.length === 0 ? (
        <p className="empty-state">Nenhuma notícia recente neste bairro.</p>
      ) : (
        visiveis.map((noticia) => (
          <Link
            key={noticia.id}
            to={`/noticias/${noticia.id}`}
            className="noticia-item"
          >
            <p className="noticia-titulo">{noticia.titulo}</p>
            <div className="noticia-meta">
              <span>{formatRelativeDays(noticia.dataCriacao)}</span>
              {noticia.anexos?.length > 0 && (
                <span>
                  <i className="fa-solid fa-paperclip" />{' '}
                  {noticia.anexos.length}{' '}
                  {noticia.anexos.length === 1 ? 'anexo' : 'anexos'}
                </span>
              )}
            </div>
          </Link>
        ))
      )}
    </StyledSurface>
  );
}
