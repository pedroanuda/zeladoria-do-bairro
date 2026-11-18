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

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .cards-list {
      grid-template-columns: 1fr;
    }
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

      &.input-error {
        border-color: #d32f2f;
        background-color: #fff8f8;
      }
    }

    textarea {
      min-height: 4.5rem;
      resize: vertical;
    }

    .error-text {
      color: #d32f2f;
      font-size: 0.76rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
  }

  .success-banner {
    padding: 0.6rem 0.85rem;
    border-radius: 8px;
    background-color: rgb(from var(--cor-primaria) r g b / 14%);
    color: var(--cor-primaria);
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export default function ZeladorIniciativas() {
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoRelacao, setTipoRelacao] = useState('DEMANDA');
  const [relacaoId, setRelacaoId] = useState('');
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [version, setVersion] = useState(0);

  const iniciativas = iniciativaService.getByBairro(bairroId);
  const ocorrencias = ocorrenciaService.getByBairro(bairroId);
  const eventos = eventoService.getByBairro(bairroId);
  void version;

  const handleCreate = (e) => {
    if (e) e.preventDefault();

    const newErrors = {};
    if (!nome.trim()) {
      newErrors.nome = 'Informe o título da iniciativa.';
    }
    if (tipoRelacao === 'DEMANDA' && !relacaoId) {
      newErrors.relacaoId = 'Selecione a ocorrência relacionada.';
    }
    if (tipoRelacao === 'EVENTO' && !relacaoId) {
      newErrors.relacaoId = 'Selecione o evento relacionado.';
    }
    if (!descricao.trim()) {
      newErrors.descricao = 'Informe o resumo da entrega ou ação.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMsg('');
      return;
    }

    setErrors({});
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
    setSuccessMsg('Iniciativa divulgada no mural com sucesso!');
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
            <form onSubmit={handleCreate} noValidate>
              <div className="field-group">
                <label htmlFor="ini-nome">Título da iniciativa *</label>
                <input
                  id="ini-nome"
                  type="text"
                  className={errors.nome ? 'input-error' : ''}
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (errors.nome) {
                      setErrors((prev) => ({ ...prev, nome: undefined }));
                    }
                    if (successMsg) setSuccessMsg('');
                  }}
                  placeholder="Ex: Praça Central revitalizada"
                />
                {errors.nome && (
                  <span className="error-text">
                    <i className="fa-solid fa-circle-exclamation" />
                    {errors.nome}
                  </span>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="ini-tipo">Vínculo (Ocorrência OU Evento)</label>
                <select
                  id="ini-tipo"
                  value={tipoRelacao}
                  onChange={(e) => {
                    setTipoRelacao(e.target.value);
                    setRelacaoId('');
                    setErrors((prev) => ({ ...prev, relacaoId: undefined }));
                  }}
                >
                  <option value="DEMANDA">Vincular a uma Ocorrência</option>
                  <option value="EVENTO">Vincular a um Evento</option>
                  <option value="NENHUM">Sem vínculo (Ação contínua)</option>
                </select>
              </div>

              {tipoRelacao === 'DEMANDA' && (
                <div className="field-group">
                  <label htmlFor="ini-demanda">Ocorrência relacionada *</label>
                  <select
                    id="ini-demanda"
                    className={errors.relacaoId ? 'input-error' : ''}
                    value={relacaoId}
                    onChange={(e) => {
                      setRelacaoId(e.target.value);
                      if (errors.relacaoId) {
                        setErrors((prev) => ({
                          ...prev,
                          relacaoId: undefined,
                        }));
                      }
                    }}
                  >
                    <option value="">Selecione uma ocorrência...</option>
                    {ocorrencias.map((oc) => (
                      <option key={oc.id} value={oc.id}>
                        #ZB-{String(oc.id).padStart(4, '0')} · {oc.titulo} (
                        {oc.status})
                      </option>
                    ))}
                  </select>
                  {errors.relacaoId && (
                    <span className="error-text">
                      <i className="fa-solid fa-circle-exclamation" />
                      {errors.relacaoId}
                    </span>
                  )}
                </div>
              )}

              {tipoRelacao === 'EVENTO' && (
                <div className="field-group">
                  <label htmlFor="ini-evento">Evento relacionado *</label>
                  <select
                    id="ini-evento"
                    className={errors.relacaoId ? 'input-error' : ''}
                    value={relacaoId}
                    onChange={(e) => {
                      setRelacaoId(e.target.value);
                      if (errors.relacaoId) {
                        setErrors((prev) => ({
                          ...prev,
                          relacaoId: undefined,
                        }));
                      }
                    }}
                  >
                    <option value="">Selecione um evento...</option>
                    {eventos.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.nome}
                      </option>
                    ))}
                  </select>
                  {errors.relacaoId && (
                    <span className="error-text">
                      <i className="fa-solid fa-circle-exclamation" />
                      {errors.relacaoId}
                    </span>
                  )}
                </div>
              )}

              <div className="field-group">
                <label htmlFor="ini-desc">Resumo da entrega / ação *</label>
                <textarea
                  id="ini-desc"
                  className={errors.descricao ? 'input-error' : ''}
                  value={descricao}
                  onChange={(e) => {
                    setDescricao(e.target.value);
                    if (errors.descricao) {
                      setErrors((prev) => ({ ...prev, descricao: undefined }));
                    }
                    if (successMsg) setSuccessMsg('');
                  }}
                  placeholder="Descreva os benefícios entregues para os moradores..."
                />
                {errors.descricao && (
                  <span className="error-text">
                    <i className="fa-solid fa-circle-exclamation" />
                    {errors.descricao}
                  </span>
                )}
              </div>

              {successMsg && (
                <div className="success-banner">
                  <i className="fa-solid fa-circle-check" />
                  <span>{successMsg}</span>
                </div>
              )}

              <Button
                variant="primary"
                type="submit"
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
