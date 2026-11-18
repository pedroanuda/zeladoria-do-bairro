import { TipoAtualizacao } from '@/common/models/index.js';
import {
  formatRelativeDays,
  formatShortEventDate,
} from '@/common/utils/formatters.js';
import { Button, Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import {
  atualizacaoService,
  bairroService,
  iniciativaService,
  postService,
  usuarioService,
} from '@/services';
import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const INICIATIVA_FILTERS = [
  { label: 'Todas', value: 'ALL' },
  { label: 'Ocorrências vinculadas', value: 'DEMANDA' },
  { label: 'Eventos vinculados', value: 'EVENTO' },
  { label: 'Ações contínuas', value: 'CONTINUA' },
];

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2rem 5rem 3rem;

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

  .section-block {
    margin-bottom: 2.5rem;
  }

  .section-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;

    h2 {
      font-size: 1.2rem;
      color: var(--cor-grafite);
    }
  }

  .filter-pills {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      border: 1px solid var(--cor-borda);
      background-color: var(--cor-superficie);
      color: rgb(from var(--cor-grafite) r g b / 80%);
      padding: 0.35rem 0.85rem;
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

  .iniciativas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.15rem;
  }

  .community-grid {
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

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const IniciativaCard = styled(Surface)`
  overflow: hidden;
  display: flex;
  flex-direction: column;

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

  .card-body {
    padding: 1rem 1.15rem 1.15rem;
    display: flex;
    flex-direction: column;
    flex: 1;

    h3 {
      font-size: 1rem;
      color: var(--cor-grafite);
      margin-bottom: 0.35rem;
      line-height: 1.3;
    }

    p {
      font-size: 0.85rem;
      color: rgb(from var(--cor-grafite) r g b / 72%);
      line-height: 1.45;
      flex: 1;
    }

    .relation-link {
      margin-top: 0.85rem;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--cor-secundaria);
      text-decoration: none;
      padding: 0.45rem 0.7rem;
      border-radius: 8px;
      background-color: rgb(from var(--cor-secundaria) r g b / 10%);

      &:hover {
        background-color: rgb(from var(--cor-secundaria) r g b / 18%);
      }
    }

    .card-footer {
      margin-top: 0.85rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--cor-borda);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78rem;
      color: rgb(from var(--cor-grafite) r g b / 62%);
    }
  }
`;

const NewPostCard = styled(Surface)`
  padding: 1.35rem;

  .composer-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 0.9rem;

    i {
      color: var(--cor-primaria);
      font-size: 1.05rem;
    }

    h3 {
      font-size: 1rem;
      color: var(--cor-grafite);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.7rem 0.9rem;
    border-radius: 10px;
    border: 1px solid var(--cor-borda);
    font-family: var(--fonte-body);
    font-size: 0.9rem;
    color: var(--cor-grafite);
    background-color: var(--cor-superficie);

    &:focus {
      outline: none;
      border-color: var(--cor-primaria);
    }
  }

  textarea {
    min-height: 4.75rem;
    resize: vertical;
    line-height: 1.45;
  }

  .composer-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .composer-hint {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 60%);
    }
  }
`;

const PostCard = styled(Surface)`
  padding: 1.35rem;

  .post-author-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
    gap: 0.75rem;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.7rem;

    .avatar {
      width: 2.3rem;
      height: 2.3rem;
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

    .author-name {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--cor-grafite);
    }

    .author-role {
      display: inline-block;
      margin-left: 0.45rem;
      padding: 0.12rem 0.5rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      background-color: rgb(from var(--cor-primaria) r g b / 14%);
      color: var(--cor-primaria);
    }

    .post-date {
      font-size: 0.78rem;
      color: rgb(from var(--cor-grafite) r g b / 60%);
      margin-top: 0.1rem;
    }
  }

  .post-title {
    font-size: 1.05rem;
    color: var(--cor-grafite);
    margin-bottom: 0.4rem;
    line-height: 1.35;
  }

  .post-content {
    font-size: 0.9rem;
    color: rgb(from var(--cor-grafite) r g b / 82%);
    line-height: 1.5;
  }

  .post-actions {
    margin-top: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--cor-borda);
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .action-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--cor-borda);
    background-color: var(--cor-superficie);
    color: var(--cor-grafite);
    font-family: var(--fonte-body);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      border-color: var(--cor-primaria);
      color: var(--cor-primaria);
    }
  }

  .comments-section {
    margin-top: 1rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--cor-borda);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .comment-item {
    background-color: var(--cor-fundo);
    padding: 0.7rem 0.9rem;
    border-radius: 10px;

    .comment-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      margin-bottom: 0.25rem;

      strong {
        color: var(--cor-grafite);
      }

      span {
        color: rgb(from var(--cor-grafite) r g b / 58%);
      }
    }

    p {
      font-size: 0.85rem;
      color: var(--cor-grafite);
      line-height: 1.4;
    }
  }

  .comment-form {
    display: flex;
    gap: 0.55rem;
    margin-top: 0.25rem;

    input {
      flex: 1;
      padding: 0.55rem 0.85rem;
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

const AtualizacoesSidebarCard = styled(Surface)`
  padding: 1.25rem;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;

    h3 {
      font-size: 1.05rem;
      color: var(--cor-grafite);
    }

    a {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--cor-secundaria);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  > .sub {
    font-size: 0.8rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    padding-bottom: 0.85rem;
    border-bottom: 1px solid var(--cor-borda);
  }

  .atualizacao-item {
    display: block;
    padding: 0.9rem 0;
    border-bottom: 1px solid var(--cor-borda);
    text-decoration: none;
    color: inherit;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:hover h4 {
      color: var(--cor-primaria);
    }

    .atu-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.35rem;
    }

    .tipo-badge {
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.7rem;
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

    .atu-date {
      font-size: 0.75rem;
      color: rgb(from var(--cor-grafite) r g b / 58%);
    }

    h4 {
      font-size: 0.9rem;
      color: var(--cor-grafite);
      line-height: 1.35;
      margin-bottom: 0.3rem;
      transition: color 0.15s ease;
    }

    p {
      font-size: 0.82rem;
      color: rgb(from var(--cor-grafite) r g b / 72%);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .anexo-chip {
      margin-top: 0.5rem;
      margin-right: 0.35rem;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: var(--cor-primaria);
      background-color: rgb(from var(--cor-primaria) r g b / 10%);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-weight: 500;
    }
  }
`;

const InfoAmberCard = styled.aside`
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

export default function Mural() {
  const currentUser = usuarioService.getCurrentUser();
  const bairros = bairroService.getAll();
  const [selectedBairroId, setSelectedBairroId] = useState(
    currentUser?.bairroId ?? bairros[0]?.id ?? 1,
  );
  const [iniciativaFilter, setIniciativaFilter] = useState('ALL');

  const [postsVersion, setPostsVersion] = useState(0);
  const [novoPostTitulo, setNovoPostTitulo] = useState('');
  const [novoPostConteudo, setNovoPostConteudo] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  const iniciativasBairro = iniciativaService.getByBairro(selectedBairroId);
  const iniciativasFiltradas = iniciativasBairro.filter((ini) => {
    if (iniciativaFilter === 'DEMANDA') return Boolean(ini.demandaRelacionada);
    if (iniciativaFilter === 'EVENTO') return Boolean(ini.eventoRelacionado);
    if (iniciativaFilter === 'CONTINUA')
      return !ini.demandaRelacionada && !ini.eventoRelacionado;
    return true;
  });

  // postsVersion força re-leitura após criar post, apoiar ou comentar
  const postsBairro = postService
    .getByBairro(selectedBairroId)
    .slice()
    .sort((a, b) => b.dataCriacao - a.dataCriacao);
  void postsVersion;

  const atualizacoesBairro = atualizacaoService
    .getByBairro(selectedBairroId)
    .slice()
    .sort((a, b) => b.dataCriacao - a.dataCriacao);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!novoPostTitulo.trim() || !novoPostConteudo.trim()) return;

    postService.create({
      titulo: novoPostTitulo.trim(),
      conteudo: novoPostConteudo.trim(),
      autorId: currentUser?.id ?? 1,
      bairroId: selectedBairroId,
      apoios: 1,
      dataCriacao: new Date(),
      comentarios: [],
    });

    setNovoPostTitulo('');
    setNovoPostConteudo('');
    setPostsVersion((v) => v + 1);
  };

  const handleApoiarPost = (postId) => {
    postService.apoiar(postId);
    setPostsVersion((v) => v + 1);
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    const texto = commentInputs[postId]?.trim();
    if (!texto) return;

    postService.addComentario(postId, {
      conteudo: texto,
      autorId: currentUser?.id ?? 1,
      dataCriacao: new Date(),
    });

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setPostsVersion((v) => v + 1);
  };

  return (
    <>
      <Header />
      <StyledMain>
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
            <h1>Mural da Comunidade</h1>
            <p>
              Visualize as iniciativas do bairro, acompanhe comunicados da
              zeladoria e publique sugestões no blog comunitário.
            </p>
          </div>
        </div>

        <section className="section-block">
          <div className="section-top">
            <h2>Iniciativas divulgadas no bairro</h2>
            <div className="filter-pills">
              {INICIATIVA_FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  className={iniciativaFilter === f.value ? 'active' : ''}
                  onClick={() => setIniciativaFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {iniciativasFiltradas.length === 0 ? (
            <Surface
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'rgb(from var(--cor-grafite) r g b / 65%)',
              }}
            >
              Nenhuma iniciativa encontrada para este filtro no bairro.
            </Surface>
          ) : (
            <div className="iniciativas-grid">
              {iniciativasFiltradas.map((iniciativa, idx) => {
                const isGreen = idx % 2 === 0;
                const tag = getIniciativaTag(iniciativa);

                return (
                  <IniciativaCard key={iniciativa.id}>
                    <div
                      className={`card-banner ${isGreen ? 'variant-green' : 'variant-blue'}`}
                    >
                      {isGreen ? (
                        <ParkIllustration />
                      ) : (
                        <CommunityIllustration />
                      )}
                      <span className={`card-tag ${tag.className}`}>
                        {tag.label}
                      </span>
                    </div>
                    <div className="card-body">
                      <h3>{iniciativa.nome}</h3>
                      <p>{iniciativa.descricao}</p>

                      {iniciativa.demandaRelacionada && (
                        <Link
                          to={`/ocorrencias/${iniciativa.demandaRelacionada.id}`}
                          className="relation-link"
                        >
                          <i className="fa-solid fa-screwdriver-wrench" />
                          <span>
                            Demanda #ZB-
                            {String(iniciativa.demandaRelacionada.id).padStart(
                              4,
                              '0',
                            )}
                            : {iniciativa.demandaRelacionada.titulo}
                          </span>
                        </Link>
                      )}

                      {iniciativa.eventoRelacionado && (
                        <Link to="/eventos" className="relation-link">
                          <i className="fa-regular fa-calendar" />
                          <span>
                            Evento: {iniciativa.eventoRelacionado.nome}
                          </span>
                        </Link>
                      )}

                      <div className="card-footer">
                        <span>
                          Divulgado por{' '}
                          {iniciativa.criador?.nome ?? 'Zeladoria'}
                        </span>
                        <span>{iniciativa.bairro?.nome}</span>
                      </div>
                    </div>
                  </IniciativaCard>
                );
              })}
            </div>
          )}
        </section>

        <section className="community-grid">
          <div className="left-column">
            <NewPostCard>
              <div className="composer-header">
                <i className="fa-regular fa-pen-to-square" />
                <h3>Publicar no blog da comunidade ou sugerir melhoria</h3>
              </div>
              <form onSubmit={handleCreatePost}>
                <input
                  type="text"
                  value={novoPostTitulo}
                  onChange={(e) => setNovoPostTitulo(e.target.value)}
                  placeholder="Título da sua publicação ou sugestão de melhoria..."
                  required
                />
                <textarea
                  value={novoPostConteudo}
                  onChange={(e) => setNovoPostConteudo(e.target.value)}
                  placeholder="Compartilhe uma ideia, avise os vizinhos ou proponha uma melhoria para o bairro..."
                  required
                />
                <div className="composer-actions">
                  <span className="composer-hint">
                    Publicando como <strong>{currentUser?.nome}</strong> em{' '}
                    {bairros.find((b) => b.id === selectedBairroId)?.nome}
                  </span>
                  <Button variant="primary" onClick={handleCreatePost}>
                    <i className="fa-solid fa-paper-plane" />
                    Publicar no mural
                  </Button>
                </div>
              </form>
            </NewPostCard>

            {postsBairro.length === 0 ? (
              <Surface
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'rgb(from var(--cor-grafite) r g b / 65%)',
                }}
              >
                Ainda não há publicações dos moradores neste bairro. Seja o
                primeiro a publicar!
              </Surface>
            ) : (
              postsBairro.map((post) => {
                const autorInicial =
                  post.autor?.nome?.charAt(0).toUpperCase() ?? 'M';

                return (
                  <PostCard key={post.id}>
                    <div className="post-author-row">
                      <div className="author-info">
                        <div className="avatar">{autorInicial}</div>
                        <div>
                          <div>
                            <span className="author-name">
                              {post.autor?.nome ?? 'Morador'}
                            </span>
                            {post.autor?.cargo && (
                              <span className="author-role">
                                {post.autor.cargo}
                              </span>
                            )}
                          </div>
                          <p className="post-date">
                            {formatRelativeDays(post.dataCriacao)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="post-title">{post.titulo}</h3>
                    <p className="post-content">{post.conteudo}</p>

                    <div className="post-actions">
                      <button
                        type="button"
                        className="action-pill"
                        onClick={() => handleApoiarPost(post.id)}
                      >
                        <i className="fa-solid fa-arrow-up" />
                        <span>Apoiar · {post.apoios}</span>
                      </button>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'rgb(from var(--cor-grafite) r g b / 65%)',
                          marginLeft: '0.35rem',
                        }}
                      >
                        <i className="fa-regular fa-comment" />{' '}
                        {post.comentarios?.length ?? 0} comentários
                      </span>
                    </div>

                    <div className="comments-section">
                      {post.comentarios?.map((comentario) => (
                        <div key={comentario.id} className="comment-item">
                          <div className="comment-meta">
                            <strong>
                              {comentario.autor?.nome ?? 'Morador'}
                            </strong>
                            <span>
                              {formatRelativeDays(comentario.dataCriacao)}
                            </span>
                          </div>
                          <p>{comentario.conteudo}</p>
                        </div>
                      ))}

                      <form
                        className="comment-form"
                        onSubmit={(e) => handleAddComment(e, post.id)}
                      >
                        <input
                          type="text"
                          value={commentInputs[post.id] ?? ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          placeholder="Escreva um comentário..."
                        />
                        <Button
                          variant="secondary"
                          onClick={(e) => handleAddComment(e, post.id)}
                        >
                          Comentar
                        </Button>
                      </form>
                    </div>
                  </PostCard>
                );
              })
            )}
          </div>

          <div className="right-column">
            <AtualizacoesSidebarCard>
              <div className="sidebar-header">
                <h3>Notícias e Comunicados</h3>
                <Link to="/noticias">Ver todas</Link>
              </div>
              <p className="sub">
                Informes oficiais publicados pela zeladoria do bairro.
              </p>

              {atualizacoesBairro.length === 0 ? (
                <p
                  style={{
                    paddingTop: '1rem',
                    fontSize: '0.85rem',
                    color: 'rgb(from var(--cor-grafite) r g b / 65%)',
                  }}
                >
                  Nenhuma atualização publicada para este bairro.
                </p>
              ) : (
                atualizacoesBairro.map((atu) => {
                  const isComunicado = atu.tipo === TipoAtualizacao.COMUNICADO;
                  return (
                    <Link
                      key={atu.id}
                      to={`/noticias/${atu.id}`}
                      className="atualizacao-item"
                    >
                      <div className="atu-top">
                        <span
                          className={`tipo-badge ${isComunicado ? 'comunicado' : 'noticia'}`}
                        >
                          {isComunicado ? 'Comunicado' : 'Notícia'}
                        </span>
                        <span className="atu-date">
                          {formatRelativeDays(atu.dataCriacao)}
                        </span>
                      </div>
                      <h4>{atu.titulo}</h4>
                      <p>{atu.conteudo}</p>
                      {atu.anexos?.map((anexo) => (
                        <span key={anexo.id} className="anexo-chip">
                          <i className="fa-solid fa-paperclip" />
                          {anexo.nome}
                        </span>
                      ))}
                    </Link>
                  );
                })
              )}
            </AtualizacoesSidebarCard>

            <InfoAmberCard>
              <h3>Como funciona o Mural?</h3>
              <p>
                As iniciativas concluídas, eventos e comunicados oficiais são
                divulgados pela equipe de Zeladoria. Já o blog da comunidade é o
                espaço aberto para você sugerir melhorias, debater ideias e
                mobilizar seus vizinhos!
              </p>
            </InfoAmberCard>
          </div>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
}
