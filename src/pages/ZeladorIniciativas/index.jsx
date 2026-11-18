import { formatShortEventDate } from '@/common/utils/formatters.js';
import { Button, Surface, ZeladorLayout } from '@/components';
import {
  eventoService,
  iniciativaService,
  ocorrenciaService,
  usuarioService,
} from '@/services';
import { useState } from 'react';
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

  .cards-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const IniciativaCard = styled(Surface)`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  .tag-pill {
    align-self: flex-start;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    background-color: rgb(from var(--cor-primaria) r g b / 15%);
    color: var(--cor-primaria);

    &.amber {
      background-color: rgb(from var(--cor-terciaria) r g b / 28%);
      color: #7a5200;
    }
  }

  h3 {
    font-size: 1rem;
    color: var(--cor-grafite);
    line-height: 1.3;
  }

  p {
    font-size: 0.85rem;
    color: rgb(from var(--cor-grafite) r g b / 72%);
    line-height: 1.45;
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
      min-height: 4.5rem;
      resize: vertical;
    }
  }
`;

export default function ZeladorIniciativas() {
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoRelacao, setTipoRelacao] = useState('DEMANDA');
  const [relacaoId, setRelacaoId] = useState('');
  const [version, setVersion] = useState(0);

  const iniciativas = iniciativaService.getByBairro(bairroId);
  const ocorrencias = ocorrenciaService.getByBairro(bairroId);
  const eventos = eventoService.getByBairro(bairroId);
  void version;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!nome.trim() || !descricao.trim()) return;

    iniciativaService.create({
      nome: nome.trim(),
      descricao: descricao.trim(),
      demandaRelacionadaId:
        tipoRelacao === 'DEMANDA' && relacaoId ? Number(relacaoId) : null,
      eventoRelacionadoId:
        tipoRelacao === 'EVENTO' && relacaoId ? Number(relacaoId) : null,
      criadorId: zelador?.id ?? 3,
      bairroId,
    });

    setNome('');
    setDescricao('');
    setRelacaoId('');
    setVersion((v) => v + 1);
  };

  return (
    <ZeladorLayout>
      <PageWrapper>
        <div className="top-bar">
          <div>
            <p className="sub-location">
              Divulgação oficial · {zelador?.bairro?.nome ?? 'Vila Mariana'}
            </p>
            <h1>Mural de iniciativas</h1>
          </div>
        </div>

        <div className="content-grid">
          <div className="cards-list">
            {iniciativas.map((ini) => {
              const isEvento = Boolean(ini.eventoRelacionado);
              const tagLabel = isEvento
                ? `Evento · ${formatShortEventDate(ini.eventoRelacionado.data)}`
                : ini.demandaRelacionada
                  ? `${ini.demandaRelacionada.status} · #ZB-${String(ini.demandaRelacionada.id).padStart(4, '0')}`
                  : 'Ação contínua';

              return (
                <IniciativaCard key={ini.id}>
                  <span className={`tag-pill ${isEvento ? 'amber' : ''}`}>
                    {tagLabel}
                  </span>
                  <h3>{ini.nome}</h3>
                  <p>{ini.descricao}</p>
                </IniciativaCard>
              );
            })}
          </div>

          <FormCard>
            <h3>Divulgar nova iniciativa</h3>
            <form onSubmit={handleCreate}>
              <div className="field-group">
                <label htmlFor="ini-nome">Título da iniciativa</label>
                <input
                  id="ini-nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Praça Central revitalizada"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="ini-tipo">Vínculo (Ocorrência OU Evento)</label>
                <select
                  id="ini-tipo"
                  value={tipoRelacao}
                  onChange={(e) => {
                    setTipoRelacao(e.target.value);
                    setRelacaoId('');
                  }}
                >
                  <option value="DEMANDA">Vincular a uma Ocorrência</option>
                  <option value="EVENTO">Vincular a um Evento</option>
                  <option value="NENHUM">Sem vínculo (Ação contínua)</option>
                </select>
              </div>

              {tipoRelacao === 'DEMANDA' && (
                <div className="field-group">
                  <label htmlFor="ini-demanda">Ocorrência relacionada</label>
                  <select
                    id="ini-demanda"
                    value={relacaoId}
                    onChange={(e) => setRelacaoId(e.target.value)}
                  >
                    <option value="">Selecione uma ocorrência...</option>
                    {ocorrencias.map((oc) => (
                      <option key={oc.id} value={oc.id}>
                        #ZB-{String(oc.id).padStart(4, '0')} · {oc.titulo} (
                        {oc.status})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {tipoRelacao === 'EVENTO' && (
                <div className="field-group">
                  <label htmlFor="ini-evento">Evento relacionado</label>
                  <select
                    id="ini-evento"
                    value={relacaoId}
                    onChange={(e) => setRelacaoId(e.target.value)}
                  >
                    <option value="">Selecione um evento...</option>
                    {eventos.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="field-group">
                <label htmlFor="ini-desc">Resumo da entrega / ação</label>
                <textarea
                  id="ini-desc"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva os benefícios entregues para os moradores..."
                  required
                />
              </div>

              <Button
                variant="primary"
                onClick={handleCreate}
                style={{ justifyContent: 'center' }}
              >
                <i className="fa-solid fa-bullhorn" />
                Publicar no mural do bairro
              </Button>
            </form>
          </FormCard>
        </div>
      </PageWrapper>
    </ZeladorLayout>
  );
}
