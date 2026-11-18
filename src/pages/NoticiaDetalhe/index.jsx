import { TipoAtualizacao } from '@/common/models/index.js';
import {
  formatFileSize,
  formatFullDateTime,
  formatRelativeDays,
} from '@/common/utils/formatters.js';
import { Button, Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import { atualizacaoService } from '@/services';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
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

  .article-grid {
    display: grid;
    grid-template-columns: 8fr 4fr;
    gap: 1.5rem;
    align-items: start;
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const ArticleSurface = styled(Surface)`
  padding: 2rem 2.25rem;

  .article-meta-top {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.85rem;
  }

  .tipo-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.78rem;
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

  .bairro-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.825rem;
    color: var(--cor-primaria);
    font-weight: 600;
  }

  .full-date {
    font-size: 0.825rem;
    color: rgb(from var(--cor-grafite) r g b / 62%);
  }

  h1 {
    font-size: 1.85rem;
    color: var(--cor-grafite);
    line-height: 1.3;
    margin-bottom: 1.25rem;
  }

  .author-bar {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.95rem 0;
    border-top: 1px solid var(--cor-borda);
    border-bottom: 1px solid var(--cor-borda);
    margin-bottom: 1.5rem;

    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: var(--cor-secundaria);
      color: var(--cor-superficie);
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .author-name {
      font-weight: 600;
      font-size: 0.925rem;
      color: var(--cor-grafite);
    }

    .author-role {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      margin-top: 0.1rem;
    }
  }

  .article-body {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;

    p {
      font-size: 1.02rem;
      line-height: 1.75;
      color: var(--cor-grafite);
    }
  }

  .anexos-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--cor-borda);

    h3 {
      font-size: 1.05rem;
      color: var(--cor-grafite);
      margin-bottom: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      i {
        color: var(--cor-primaria);
      }
    }

    .anexos-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .anexo-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0.95rem 1.15rem;
      border-radius: 10px;
      border: 1px solid var(--cor-borda);
      background-color: var(--cor-fundo);
      flex-wrap: wrap;
    }

    .anexo-left {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      min-width: 0;

      .file-icon {
        width: 2.65rem;
        height: 2.65rem;
        border-radius: 10px;
        background-color: var(--cor-superficie);
        border: 1px solid var(--cor-borda);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.15rem;
        flex-shrink: 0;

        &.pdf {
          color: #c62828;
        }

        &.image {
          color: var(--cor-secundaria);
        }

        &.other {
          color: var(--cor-primaria);
        }
      }

      .file-name {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--cor-grafite);
        word-break: break-all;
      }

      .file-meta {
        font-size: 0.78rem;
        color: rgb(from var(--cor-grafite) r g b / 65%);
        margin-top: 0.15rem;
      }
    }

    .anexo-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .anexo-preview-box {
      margin-top: 0.85rem;
      padding: 1.15rem;
      border-radius: 10px;
      border: 1px solid var(--cor-borda);
      background-color: var(--cor-superficie);

      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        strong {
          font-size: 0.9rem;
          color: var(--cor-grafite);
        }

        button {
          background: none;
          border: none;
          color: rgb(from var(--cor-grafite) r g b / 65%);
          cursor: pointer;
          font-size: 0.85rem;
        }
      }

      .preview-content {
        padding: 1.25rem;
        border-radius: 8px;
        background-color: var(--cor-fundo);
        font-size: 0.875rem;
        color: var(--cor-grafite);
        line-height: 1.5;
      }
    }
  }
`;

const OutrasPublicacoesCard = styled(Surface)`
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

  .other-item {
    display: block;
    padding: 0.85rem 0;
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

    .mini-meta {
      font-size: 0.75rem;
      color: rgb(from var(--cor-grafite) r g b / 60%);
      margin-bottom: 0.2rem;
    }

    h4 {
      font-size: 0.9rem;
      color: var(--cor-grafite);
      line-height: 1.35;
      transition: color 0.15s ease;
    }
  }
`;

const ActionAmberCard = styled.aside`
  padding: 1.25rem;
  border-radius: 10px;
  background-color: rgb(from var(--cor-terciaria) r g b / 22%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h3 {
    font-size: 0.95rem;
    color: #5f4206;
  }

  p {
    font-size: 0.825rem;
    color: #5f4206;
    line-height: 1.45;
  }
`;

function getFileTypeMeta(mimeType = '') {
  if (mimeType.includes('pdf')) {
    return {
      iconClass: 'fa-regular fa-file-pdf',
      colorClass: 'pdf',
      label: 'Documento PDF',
    };
  }
  if (mimeType.includes('image')) {
    return {
      iconClass: 'fa-regular fa-file-image',
      colorClass: 'image',
      label: 'Imagem anexada',
    };
  }
  return {
    iconClass: 'fa-regular fa-file-lines',
    colorClass: 'other',
    label: 'Arquivo complementar',
  };
}

export default function NoticiaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const publicacao = atualizacaoService.getById(id);
  const [selectedAnexo, setSelectedAnexo] = useState(null);
  const [downloadedIds, setDownloadedIds] = useState({});

  if (!publicacao) {
    return (
      <>
        <Header />
        <StyledMain>
          <Link to="/noticias" className="back-link">
            <i className="fa-solid fa-chevron-left" /> Notícias e Comunicados
          </Link>
          <Surface style={{ padding: '2.5rem', textAlign: 'center' }}>
            <h3>Publicação não encontrada</h3>
            <p style={{ marginTop: '0.5rem' }}>
              A notícia ou comunicado solicitado não foi localizado.
            </p>
          </Surface>
        </StyledMain>
        <Footer />
      </>
    );
  }

  const isComunicado = publicacao.tipo === TipoAtualizacao.COMUNICADO;
  const paragrafos = publicacao.conteudo
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const outrasDoBairro = atualizacaoService
    .getByBairro(publicacao.bairroId)
    .filter((item) => item.id !== publicacao.id);

  const autorInicial = publicacao.autor?.nome?.charAt(0).toUpperCase() ?? 'Z';

  const handleDownloadAnexo = (anexo) => {
    setDownloadedIds((prev) => ({ ...prev, [anexo.id]: true }));
    setSelectedAnexo(anexo);
  };

  return (
    <>
      <Header />
      <StyledMain>
        <Link to="/noticias" className="back-link">
          <i className="fa-solid fa-chevron-left" /> Notícias e Comunicados
        </Link>

        <div className="article-grid">
          <ArticleSurface>
            <div className="article-meta-top">
              <span
                className={`tipo-badge ${isComunicado ? 'comunicado' : 'noticia'}`}
              >
                {isComunicado ? 'Comunicado Oficial' : 'Notícia do Bairro'}
              </span>
              <span className="bairro-pill">
                <i className="fa-solid fa-location-dot" />
                {publicacao.bairro?.nome}
              </span>
              <span className="full-date">
                {formatFullDateTime(publicacao.dataCriacao)}
              </span>
            </div>

            <h1>{publicacao.titulo}</h1>

            <div className="author-bar">
              <div className="avatar">{autorInicial}</div>
              <div>
                <p className="author-name">
                  {publicacao.autor?.nome ?? 'Equipe de Zeladoria'}
                </p>
                <p className="author-role">
                  {publicacao.autor?.cargo ?? 'Subprefeitura'} ·{' '}
                  {publicacao.bairro?.nome}
                </p>
              </div>
            </div>

            <div className="article-body">
              {paragrafos.map((paragrafo, index) => (
                <p key={index}>{paragrafo}</p>
              ))}
            </div>

            {publicacao.anexos?.length > 0 && (
              <div className="anexos-section">
                <h3>
                  <i className="fa-solid fa-paperclip" />
                  Anexos da publicação ({publicacao.anexos.length})
                </h3>

                <div className="anexos-list">
                  {publicacao.anexos.map((anexo) => {
                    const meta = getFileTypeMeta(anexo.tipo);
                    const foiBaixado = Boolean(downloadedIds[anexo.id]);

                    return (
                      <div key={anexo.id} className="anexo-card">
                        <div className="anexo-left">
                          <div className={`file-icon ${meta.colorClass}`}>
                            <i className={meta.iconClass} />
                          </div>
                          <div>
                            <p className="file-name">{anexo.nome}</p>
                            <p className="file-meta">
                              {meta.label} · {formatFileSize(anexo.tamanho)}
                            </p>
                          </div>
                        </div>

                        <div className="anexo-actions">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              setSelectedAnexo((prev) =>
                                prev?.id === anexo.id ? null : anexo,
                              )
                            }
                          >
                            <i className="fa-regular fa-eye" />
                            {selectedAnexo?.id === anexo.id
                              ? 'Fechar prévia'
                              : 'Visualizar'}
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleDownloadAnexo(anexo)}
                          >
                            <i
                              className={
                                foiBaixado
                                  ? 'fa-solid fa-check'
                                  : 'fa-solid fa-download'
                              }
                            />
                            {foiBaixado ? 'Baixado' : 'Baixar'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedAnexo && (
                  <div className="anexo-preview-box">
                    <div className="preview-header">
                      <strong>
                        Pré-visualização do anexo: {selectedAnexo.nome}
                      </strong>
                      <button
                        type="button"
                        onClick={() => setSelectedAnexo(null)}
                      >
                        <i className="fa-solid fa-xmark" /> Fechar
                      </button>
                    </div>
                    <div className="preview-content">
                      <p>
                        <strong>Arquivo:</strong> {selectedAnexo.nome} (
                        {formatFileSize(selectedAnexo.tamanho)})
                      </p>
                      <p style={{ marginTop: '0.35rem' }}>
                        <strong>Caminho no servidor:</strong>{' '}
                        <code>{selectedAnexo.caminho}</code>
                      </p>
                      <p style={{ marginTop: '0.6rem' }}>
                        Documento oficial disponibilizado por{' '}
                        <strong>{publicacao.autor?.nome}</strong> referente à
                        publicação <em>“{publicacao.titulo}”</em> no bairro{' '}
                        {publicacao.bairro?.nome}.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ArticleSurface>

          <div className="right-column">
            <OutrasPublicacoesCard>
              <h3>Outras publicações</h3>
              <p className="sub">
                Mais notícias e comunicados de {publicacao.bairro?.nome}.
              </p>

              {outrasDoBairro.length === 0 ? (
                <p
                  style={{
                    paddingTop: '1rem',
                    fontSize: '0.85rem',
                    color: 'rgb(from var(--cor-grafite) r g b / 65%)',
                  }}
                >
                  Não há outras publicações recentes neste bairro.
                </p>
              ) : (
                outrasDoBairro.map((item) => (
                  <Link
                    key={item.id}
                    to={`/noticias/${item.id}`}
                    className="other-item"
                  >
                    <p className="mini-meta">
                      {item.tipo === TipoAtualizacao.COMUNICADO
                        ? 'Comunicado'
                        : 'Notícia'}{' '}
                      · {formatRelativeDays(item.dataCriacao)}
                    </p>
                    <h4>{item.titulo}</h4>
                  </Link>
                ))
              )}
            </OutrasPublicacoesCard>

            <ActionAmberCard>
              <h3>Identificou algum problema na sua rua?</h3>
              <p>
                Caso sua via precise de manutenção ou zeladoria, registre uma
                ocorrência para que a equipe técnica possa programar o
                atendimento.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/ocorrencias/nova')}
                style={{ justifyContent: 'center' }}
              >
                <i className="fa-solid fa-plus" />
                Registrar ocorrência
              </Button>
            </ActionAmberCard>
          </div>
        </div>
      </StyledMain>
      <Footer />
    </>
  );
}
