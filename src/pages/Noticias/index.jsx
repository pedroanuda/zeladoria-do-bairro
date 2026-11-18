import { TipoAtualizacao } from '@/common/models/index.js';
import {
  formatFileSize,
  formatFullDateTime,
  formatRelativeDays,
} from '@/common/utils/formatters.js';
import { Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import { atualizacaoService, bairroService, usuarioService } from '@/services';
import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const TIPO_FILTERS = [
  { label: 'Todas as publicações', value: 'ALL' },
  { label: 'Notícias', value: TipoAtualizacao.NOTICIA },
  { label: 'Comunicados oficiais', value: TipoAtualizacao.COMUNICADO },
];

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
    margin-bottom: 1.5rem;
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

  .noticias-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    margin: 1.5rem 2rem 2.5rem;
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;
  }
`;

const FiltersCard = styled(Surface)`
  padding: 1rem 1.25rem;
  margin-bottom: 1.35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  .type-pills {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      border: 1px solid var(--cor-borda);
      background-color: var(--cor-superficie);
      color: rgb(from var(--cor-grafite) r g b / 80%);
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      font-family: var(--fonte-body);
      font-size: 0.825rem;
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
`;

const PublicacaoCard = styled(Surface)`
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--cor-primaria);
  }

  > .card-link {
    display: block;
    padding: 1.35rem 1.5rem;
    text-decoration: none;
    color: inherit;
  }

  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.65rem;
    flex-wrap: wrap;
  }

  .badges-left {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    flex-wrap: wrap;
  }

  .tipo-badge {
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;

    &.comunicado {
      background-color: rgb(from var(--cor-terciaria) r g b / 28%);
      color: #7a5200;
    }

    &.noticia {
      background-color: rgb(from var(--cor-secundaria) r g b / 16%);
      color: var(--cor-secundaria);
    }
  }

  .anexo-indicator {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--cor-fundo);
    color: rgb(from var(--cor-grafite) r g b / 75%);
  }

  .date-text {
    font-size: 0.8rem;
    color: rgb(from var(--cor-grafite) r g b / 60%);
  }

  h2 {
    font-size: 1.2rem;
    color: var(--cor-grafite);
    line-height: 1.35;
    margin-bottom: 0.45rem;
  }

  .excerpt {
    font-size: 0.92rem;
    color: rgb(from var(--cor-grafite) r g b / 75%);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bottom-row {
    margin-top: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--cor-borda);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    .author-line {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
    }

    .read-more {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--cor-primaria);
    }
  }
`;

export default function Noticias() {
  const currentUser = usuarioService.getCurrentUser();
  const bairros = bairroService.getAll();
  const [selectedBairroId, setSelectedBairroId] = useState(
    currentUser?.bairroId ?? bairros[0]?.id ?? 1,
  );
  const [tipoFilter, setTipoFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const todasDoBairro = atualizacaoService
    .getByBairro(selectedBairroId)
    .slice()
    .sort((a, b) => b.dataCriacao - a.dataCriacao);

  const filtradas = todasDoBairro.filter((item) => {
    const matchesTipo = tipoFilter === 'ALL' || item.tipo === tipoFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.titulo.toLowerCase().includes(q) ||
      item.conteudo.toLowerCase().includes(q);
    return matchesTipo && matchesSearch;
  });

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
            <h1>Notícias e Comunicados</h1>
            <p>
              Leia em foco os relatórios, avisos de serviços públicos e notícias
              da zeladoria com seus respectivos anexos.
            </p>
          </div>
        </div>

        <FiltersCard>
          <div className="type-pills">
            {TIPO_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={tipoFilter === f.value ? 'active' : ''}
                onClick={() => setTipoFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar notícia ou comunicado..."
            />
          </div>
        </FiltersCard>

        {filtradas.length === 0 ? (
          <Surface
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              color: 'rgb(from var(--cor-grafite) r g b / 65%)',
            }}
          >
            Nenhuma publicação encontrada para os filtros selecionados neste
            bairro.
          </Surface>
        ) : (
          <div className="noticias-list">
            {filtradas.map((item) => {
              const isComunicado = item.tipo === TipoAtualizacao.COMUNICADO;
              const qtdAnexos = item.anexos?.length ?? 0;
              const totalBytes =
                item.anexos?.reduce((acc, a) => acc + (a.tamanho ?? 0), 0) ?? 0;

              return (
                <PublicacaoCard key={item.id}>
                  <Link to={`/noticias/${item.id}`} className="card-link">
                    <div className="top-meta">
                      <div className="badges-left">
                        <span
                          className={`tipo-badge ${isComunicado ? 'comunicado' : 'noticia'}`}
                        >
                          {isComunicado ? 'Comunicado Oficial' : 'Notícia'}
                        </span>
                        {qtdAnexos > 0 && (
                          <span className="anexo-indicator">
                            <i className="fa-solid fa-paperclip" />
                            {qtdAnexos} {qtdAnexos === 1 ? 'anexo' : 'anexos'} (
                            {formatFileSize(totalBytes)})
                          </span>
                        )}
                      </div>
                      <span className="date-text">
                        {formatFullDateTime(item.dataCriacao)} ·{' '}
                        {formatRelativeDays(item.dataCriacao)}
                      </span>
                    </div>

                    <h2>{item.titulo}</h2>
                    <p className="excerpt">{item.conteudo}</p>

                    <div className="bottom-row">
                      <span className="author-line">
                        Publicado por <strong>{item.autor?.nome}</strong> (
                        {item.autor?.cargo})
                      </span>
                      <span className="read-more">
                        Ler publicação completa e anexos
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </div>
                  </Link>
                </PublicacaoCard>
              );
            })}
          </div>
        )}
      </StyledMain>
      <Footer />
    </>
  );
}
