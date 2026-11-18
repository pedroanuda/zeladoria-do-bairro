import { TipoAtualizacao } from '@/common/models/index.js';
import {
  formatFileSize,
  formatRelativeDays,
} from '@/common/utils/formatters.js';
import { Button, Surface, ZeladorLayout } from '@/components';
import { atualizacaoService, usuarioService } from '@/services';
import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const PageWrapper = styled.div`
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.5rem;
    gap: 1rem;

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

  .content-grid {
    display: grid;
    grid-template-columns: 7.5fr 4.5fr;
    gap: 1.5rem;
    align-items: start;
  }

  .list-col {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const ItemCard = styled(Surface)`
  padding: 1.25rem;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.45rem;
  }

  .tipo-badge {
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
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

  h3 {
    font-size: 1.05rem;
    color: var(--cor-grafite);
    margin-bottom: 0.35rem;
  }

  p {
    font-size: 0.875rem;
    color: rgb(from var(--cor-grafite) r g b / 75%);
    line-height: 1.48;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer-row {
    margin-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

    a {
      color: var(--cor-primaria);
      font-weight: 600;
      text-decoration: none;
    }
  }
`;

const FormCard = styled(Surface)`
  padding: 1.35rem;

  h3 {
    font-size: 1.05rem;
    color: var(--cor-grafite);
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
      font-size: 0.8rem;
      font-weight: 500;
      color: rgb(from var(--cor-grafite) r g b / 80%);
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 0.65rem 0.85rem;
      border-radius: 10px;
      border: 1px solid var(--cor-borda);
      font-family: var(--fonte-body);
      font-size: 0.875rem;
      color: var(--cor-grafite);

      &:focus {
        outline: none;
        border-color: var(--cor-primaria);
      }
    }

    textarea {
      min-height: 6rem;
      resize: vertical;
    }
  }
`;

export default function ZeladorComunicacao() {
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;

  const [tipo, setTipo] = useState(TipoAtualizacao.NOTICIA);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [anexoNome, setAnexoNome] = useState('');
  const [version, setVersion] = useState(0);

  const publicacoes = atualizacaoService
    .getByBairro(bairroId)
    .slice()
    .sort((a, b) => b.dataCriacao - a.dataCriacao);
  void version;

  const handlePublish = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !conteudo.trim()) return;

    const anexos = anexoNome.trim()
      ? [
          {
            id: publicacoes.length + 10,
            nome: anexoNome.trim(),
            tipo: anexoNome.trim().endsWith('.pdf')
              ? 'application/pdf'
              : 'image/jpeg',
            tamanho: 460800,
            caminho: `/uploads/atualizacoes/${anexoNome.trim()}`,
          },
        ]
      : [];

    atualizacaoService.create({
      titulo: titulo.trim(),
      conteudo: conteudo.trim(),
      tipo,
      anexos,
      autorId: zelador?.id ?? 3,
      bairroId,
      dataCriacao: new Date(),
    });

    setTitulo('');
    setConteudo('');
    setAnexoNome('');
    setVersion((v) => v + 1);
  };

  return (
    <ZeladorLayout>
      <PageWrapper>
        <div className="top-bar">
          <div>
            <p className="sub-location">
              Notícias e Comunicados · {zelador?.bairro?.nome ?? 'Vila Mariana'}
            </p>
            <h1>Comunicação</h1>
          </div>
        </div>

        <div className="content-grid">
          <div className="list-col">
            {publicacoes.map((item) => {
              const isComunicado = item.tipo === TipoAtualizacao.COMUNICADO;
              return (
                <ItemCard key={item.id}>
                  <div className="top-row">
                    <span
                      className={`tipo-badge ${isComunicado ? 'comunicado' : 'noticia'}`}
                    >
                      {isComunicado ? 'Comunicado' : 'Notícia'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'rgb(from var(--cor-grafite) r g b / 58%)',
                      }}
                    >
                      {formatRelativeDays(item.dataCriacao)}
                    </span>
                  </div>
                  <h3>{item.titulo}</h3>
                  <p>{item.conteudo}</p>
                  <div className="footer-row">
                    <span
                      style={{
                        color: 'rgb(from var(--cor-grafite) r g b / 62%)',
                      }}
                    >
                      {item.anexos?.length > 0
                        ? `📎 ${item.anexos.length} anexo(s) (${formatFileSize(item.anexos[0].tamanho)})`
                        : 'Sem anexos'}
                    </span>
                    <Link to={`/noticias/${item.id}`}>
                      Abrir leitura em foco →
                    </Link>
                  </div>
                </ItemCard>
              );
            })}
          </div>

          <FormCard>
            <h3>Publicar notícia ou comunicado</h3>
            <form onSubmit={handlePublish}>
              <div className="field-group">
                <label htmlFor="pub-tipo">Tipo de publicação</label>
                <select
                  id="pub-tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value={TipoAtualizacao.NOTICIA}>
                    Notícia do bairro
                  </option>
                  <option value={TipoAtualizacao.COMUNICADO}>
                    Comunicado oficial
                  </option>
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="pub-titulo">Título</label>
                <input
                  id="pub-titulo"
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Nova programação de poda preventiva"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="pub-conteudo">
                  Conteúdo completo (separe parágrafos com linha em branco)
                </label>
                <textarea
                  id="pub-conteudo"
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  placeholder="Escreva os detalhes da notícia ou orientação aos moradores..."
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="pub-anexo">
                  Nome do arquivo em anexo (opcional)
                </label>
                <input
                  id="pub-anexo"
                  type="text"
                  value={anexoNome}
                  onChange={(e) => setAnexoNome(e.target.value)}
                  placeholder="Ex: cronograma-servicos.pdf"
                />
              </div>

              <Button
                variant="primary"
                onClick={handlePublish}
                style={{ justifyContent: 'center' }}
              >
                <i className="fa-solid fa-paper-plane" />
                Publicar para o bairro
              </Button>
            </form>
          </FormCard>
        </div>
      </PageWrapper>
    </ZeladorLayout>
  );
}
