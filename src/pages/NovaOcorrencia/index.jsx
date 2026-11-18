import {
  CategoriaOcorrencia,
  PrioridadeOcorrencia,
  StatusOcorrencia,
} from '@/common/models/index.js';
import { Button, Footer, Header } from '@/components';
import Surface from '@/components/Surface';
import {
  localizacaoService,
  ocorrenciaService,
  usuarioService,
} from '@/services';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styled from 'styled-components';

const CATEGORIA_OPTIONS = [
  {
    value: CategoriaOcorrencia.PAVIMENTACAO,
    label: 'Infraestrutura',
    icon: 'fa-solid fa-road',
  },
  {
    value: CategoriaOcorrencia.ILUMINACAO,
    label: 'Iluminação',
    icon: 'fa-regular fa-lightbulb',
  },
  {
    value: CategoriaOcorrencia.LIMPEZA,
    label: 'Limpeza',
    icon: 'fa-regular fa-trash-can',
  },
  {
    value: CategoriaOcorrencia.AREAS_VERDES,
    label: 'Acessibilidade',
    icon: 'fa-solid fa-person-walking',
  },
  {
    value: CategoriaOcorrencia.SEGURANCA,
    label: 'Segurança',
    icon: 'fa-solid fa-shield-halved',
  },
  {
    value: CategoriaOcorrencia.DRENAGEM,
    label: 'Outros',
    icon: 'fa-solid fa-ellipsis',
  },
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
    margin-bottom: 1.5rem;

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

  .content-grid {
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

  @media (max-width: 1024px) {
    margin: 1.5rem 2rem 2.5rem;

    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;
  }
`;

const FormCard = styled(Surface)`
  overflow: hidden;

  .form-step {
    padding: 1.5rem;
    border-bottom: 1px solid var(--cor-borda);
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1rem;

    .step-number {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: var(--cor-grafite);
      color: var(--cor-superficie);
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    h3 {
      font-size: 0.95rem;
      color: var(--cor-grafite);
    }

    .step-hint {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 55%);
      font-weight: 400;
    }
  }

  .categoria-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.65rem;

    @media (max-width: 820px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .categoria-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.95rem 0.5rem;
    border-radius: 10px;
    border: 1px solid var(--cor-borda);
    background-color: var(--cor-superficie);
    color: var(--cor-grafite);
    cursor: pointer;
    font-family: var(--fonte-body);
    font-size: 0.78rem;
    font-weight: 500;
    transition: all 0.15s ease;

    i {
      font-size: 1.15rem;
      color: rgb(from var(--cor-grafite) r g b / 75%);
    }

    &:hover {
      border-color: var(--cor-primaria);
    }

    &.selected {
      border: 1.5px solid var(--cor-primaria);
      background-color: rgb(from var(--cor-primaria) r g b / 10%);
      color: var(--cor-primaria);
      font-weight: 600;

      i {
        color: var(--cor-primaria);
      }
    }
  }

  .photos-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    flex-wrap: wrap;
  }

  .photo-thumb {
    position: relative;
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--cor-borda);
    background-color: #9aa6ad;

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .remove-photo {
      position: absolute;
      top: 0.35rem;
      right: 0.35rem;
      width: 1.35rem;
      height: 1.35rem;
      border-radius: 50%;
      border: none;
      background-color: rgba(38, 50, 56, 0.82);
      color: var(--cor-superficie);
      font-size: 0.7rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .add-photo-btn {
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 12px;
    border: 1.5px dashed var(--cor-borda);
    background-color: var(--cor-superficie);
    color: rgb(from var(--cor-grafite) r g b / 65%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    cursor: pointer;
    font-family: var(--fonte-body);
    font-size: 0.78rem;
    font-weight: 500;

    i {
      font-size: 1.1rem;
    }

    &:hover {
      border-color: var(--cor-primaria);
      color: var(--cor-primaria);
    }
  }

  .location-fields {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .location-summary-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.9rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--cor-borda);
    background-color: rgb(from var(--cor-fundo) r g b / 55%);

    .loc-title {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--cor-grafite);
    }

    .loc-sub {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      margin-top: 0.15rem;
    }

    .toggle-edit-btn {
      background: none;
      border: none;
      color: var(--cor-secundaria);
      font-family: var(--fonte-body);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .address-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.75rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
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
      padding: 0.7rem 0.85rem;
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

      &.input-error {
        border-color: #d32f2f;
        background-color: #fff8f8;
      }
    }

    textarea {
      min-height: 5.5rem;
      resize: vertical;
      line-height: 1.45;
    }

    .error-text {
      color: #d32f2f;
      font-size: 0.78rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-top: 0.1rem;
    }
  }

  .form-error-banner {
    margin: 0 1.5rem;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    background-color: #fdecea;
    border: 1px solid #f5c2c0;
    color: #c62828;
    font-size: 0.825rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .form-footer {
    padding: 1.15rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    .email-checkbox {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      font-size: 0.85rem;
      color: rgb(from var(--cor-grafite) r g b / 80%);
      cursor: pointer;

      input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--cor-primaria);
        cursor: pointer;
      }
    }
  }
`;

const SimilaresCard = styled(Surface)`
  padding: 1.25rem;

  > h3 {
    font-size: 1rem;
    color: var(--cor-grafite);
  }

  > .subtitle {
    font-size: 0.8rem;
    color: rgb(from var(--cor-grafite) r g b / 65%);
    line-height: 1.35;
    margin-top: 0.3rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid var(--cor-borda);
  }

  .similar-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--cor-borda);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .similar-info {
    min-width: 0;

    .similar-title {
      display: block;
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--cor-grafite);
      text-decoration: none;
      line-height: 1.3;

      &:hover {
        color: var(--cor-primaria);
      }
    }

    .similar-meta {
      font-size: 0.78rem;
      color: rgb(from var(--cor-grafite) r g b / 65%);
      margin-top: 0.15rem;
    }

    .mini-status {
      display: inline-block;
      margin-top: 0.4rem;
      padding: 0.18rem 0.55rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;

      &.em-andamento {
        background-color: var(--cor-secundaria);
        color: var(--cor-superficie);
      }

      &.em-analise {
        background-color: rgb(from var(--cor-secundaria) r g b / 18%);
        color: var(--cor-secundaria);
      }

      &.aberta {
        background-color: rgb(from var(--cor-terciaria) r g b / 25%);
        color: #7a5200;
      }
    }
  }

  .apoiar-pill-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--cor-borda);
    background-color: var(--cor-superficie);
    color: var(--cor-grafite);
    font-family: var(--fonte-body);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      border-color: var(--cor-primaria);
      color: var(--cor-primaria);
    }
  }
`;

const TipsCard = styled.aside`
  padding: 1.25rem;
  border-radius: 10px;
  background-color: rgb(from var(--cor-terciaria) r g b / 22%);

  h3 {
    font-size: 0.95rem;
    color: #5f4206;
    margin-bottom: 0.75rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.825rem;
    color: #5f4206;
    line-height: 1.35;

    i {
      margin-top: 0.15rem;
      font-size: 0.75rem;
    }
  }
`;

function ThumbSvg() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <rect width="100" height="100" fill="#9ca8af" />
      <rect x="0" y="62" width="100" height="38" fill="#b1bcc2" />
      <rect x="0" y="58" width="100" height="4" fill="#d3dadd" />
      <rect x="24" y="40" width="44" height="28" rx="3" fill="#4d5960" />
      <rect x="34" y="32" width="24" height="10" rx="2" fill="#404b52" />
      <rect x="78" y="18" width="4" height="46" fill="#4d5960" />
      <circle cx="80" cy="18" r="9" fill="#3a454b" />
    </svg>
  );
}

export default function NovaOcorrencia() {
  const navigate = useNavigate();
  const currentUser = usuarioService.getCurrentUser();
  const bairroId = currentUser?.bairroId ?? 1;
  const localizacoesBairro = localizacaoService.getByBairro(bairroId);

  const [categoria, setCategoria] = useState(CategoriaOcorrencia.AREAS_VERDES);
  const [fotos, setFotos] = useState([
    {
      id: 1,
      nome: 'registro-calcada-1.jpg',
      tipo: 'image/jpeg',
      tamanho: 312000,
      caminho: '/uploads/ocorrencias/registro-calcada-1.jpg',
    },
  ]);

  const [editingLocation, setEditingLocation] = useState(false);
  const [selectedLocId, setSelectedLocId] = useState(
    localizacoesBairro[0]?.id ?? 'custom',
  );
  const [logradouro, setLogradouro] = useState(
    localizacoesBairro[0]?.logradouro ?? 'Rua Domingos de Morais',
  );
  const [numero, setNumero] = useState(localizacoesBairro[0]?.numero ?? '1850');
  const [pontoReferencia, setPontoReferencia] = useState(
    localizacoesBairro[0]?.pontoReferencia ?? '',
  );

  const [titulo, setTitulo] = useState('Calçada obstruída');
  const [descricao, setDescricao] = useState(
    'Entulho de obra ocupando toda a calçada. Cadeirantes e carrinhos de bebê precisam ir pela rua.',
  );
  const [receberEmail, setReceberEmail] = useState(true);
  const [errors, setErrors] = useState({});

  const [ocorrenciasBairro, setOcorrenciasBairro] = useState(() =>
    ocorrenciaService
      .getByBairro(bairroId)
      .filter(
        (oc) =>
          oc.status !== StatusOcorrencia.CONCLUIDA &&
          oc.status !== StatusOcorrencia.ARQUIVADA,
      ),
  );

  const handleAddFoto = () => {
    if (fotos.length >= 4) return;
    const nextIndex = fotos.length + 1;
    setFotos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: `foto-ocorrencia-${nextIndex}.jpg`,
        tipo: 'image/jpeg',
        tamanho: 285000,
        caminho: `/uploads/ocorrencias/foto-ocorrencia-${nextIndex}.jpg`,
      },
    ]);
  };

  const handleRemoveFoto = (id) => {
    setFotos((prev) => prev.filter((foto) => foto.id !== id));
  };

  const handleSelectExistingLocation = (value) => {
    setSelectedLocId(value);
    if (value !== 'custom') {
      const found = localizacoesBairro.find((l) => l.id === Number(value));
      if (found) {
        setLogradouro(found.logradouro);
        setNumero(found.numero);
        setPontoReferencia(found.pontoReferencia ?? '');
      }
    }
  };

  const handleApoiarSimilar = (ocorrenciaId) => {
    ocorrenciaService.apoiar(ocorrenciaId);
    setOcorrenciasBairro(
      ocorrenciaService
        .getByBairro(bairroId)
        .filter(
          (oc) =>
            oc.status !== StatusOcorrencia.CONCLUIDA &&
            oc.status !== StatusOcorrencia.ARQUIVADA,
        ),
    );
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const newErrors = {};
    if (selectedLocId === 'custom' && !logradouro.trim()) {
      newErrors.logradouro = 'Informe o logradouro onde ocorre o problema.';
      setEditingLocation(true);
    }
    if (!titulo.trim()) {
      newErrors.titulo = 'O título resumido da ocorrência é obrigatório.';
    } else if (titulo.trim().length < 4) {
      newErrors.titulo = 'O título deve ter pelo menos 4 caracteres.';
    }
    if (!descricao.trim()) {
      newErrors.descricao = 'A descrição detalhada do problema é obrigatória.';
    } else if (descricao.trim().length < 10) {
      newErrors.descricao = 'Descreva o problema com pelo menos 10 caracteres.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    let finalLocalizacaoId =
      selectedLocId !== 'custom' ? Number(selectedLocId) : null;

    if (!finalLocalizacaoId) {
      const novaLoc = localizacaoService.create({
        logradouro: logradouro.trim() || 'Endereço no bairro',
        numero: numero.trim() || 'S/N',
        pontoReferencia: pontoReferencia.trim(),
        bairroId,
      });
      finalLocalizacaoId = novaLoc.id;
    }

    const tituloFinal = titulo.trim();

    const criada = ocorrenciaService.create({
      titulo: tituloFinal,
      descricao: descricao.trim(),
      localizacaoId: finalLocalizacaoId,
      anexos: fotos,
      categoria,
      status: StatusOcorrencia.ABERTA,
      solicitanteId: currentUser?.id ?? 1,
      apoios: 1,
      prioridade: PrioridadeOcorrencia.MEDIA,
      dataCriacao: new Date(),
      atualizacoes: [
        {
          id: 1,
          status: StatusOcorrencia.ABERTA,
          observacao: 'Ocorrência registrada pelo morador.',
          autorId: currentUser?.id ?? 1,
          data: new Date(),
        },
      ],
    });

    navigate(`/ocorrencias/${criada.id}`);
  };

  const similares = [...ocorrenciasBairro]
    .sort((a, b) => {
      const aSame = a.categoria === categoria ? 1 : 0;
      const bSame = b.categoria === categoria ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, 2);

  return (
    <>
      <Header />
      <StyledMain>
        <Link to="/home" className="back-link">
          <i className="fa-solid fa-chevron-left" /> Início
        </Link>

        <div className="page-header">
          <h1>Nova ocorrência</h1>
          <p>
            Conte o que está acontecendo. A zeladoria do bairro recebe na hora.
          </p>
        </div>

        <div className="content-grid">
          <FormCard>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h3>Qual é o problema?</h3>
                </div>
                <div className="categoria-grid">
                  {CATEGORIA_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`categoria-btn ${categoria === opt.value ? 'selected' : ''}`}
                      onClick={() => setCategoria(opt.value)}
                    >
                      <i className={opt.icon} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h3>
                    Fotos <span className="step-hint">até 4</span>
                  </h3>
                </div>
                <div className="photos-row">
                  {fotos.map((foto) => (
                    <div key={foto.id} className="photo-thumb">
                      <ThumbSvg />
                      <button
                        type="button"
                        className="remove-photo"
                        aria-label="Remover foto"
                        onClick={() => handleRemoveFoto(foto.id)}
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </div>
                  ))}
                  {fotos.length < 4 && (
                    <button
                      type="button"
                      className="add-photo-btn"
                      onClick={handleAddFoto}
                    >
                      <i className="fa-solid fa-camera" />
                      <span>Adicionar</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="form-step">
                <div className="step-header">
                  <span className="step-number">3</span>
                  <h3>Onde fica?</h3>
                </div>
                <div className="location-fields">
                  <div className="location-summary-box">
                    <div>
                      <p className="loc-title">
                        {logradouro}
                        {numero && numero !== 'S/N' ? `, ${numero}` : ''}
                      </p>
                      <p className="loc-sub">
                        {pontoReferencia
                          ? `${pontoReferencia} · ${currentUser?.bairro?.nome ?? 'Vila Mariana'}`
                          : `Usando localização em ${currentUser?.bairro?.nome ?? 'Vila Mariana'}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="toggle-edit-btn"
                      onClick={() => setEditingLocation((prev) => !prev)}
                    >
                      {editingLocation
                        ? 'Concluir endereço'
                        : 'Alterar endereço'}
                    </button>
                  </div>

                  {editingLocation && (
                    <>
                      <div className="field-group">
                        <label htmlFor="loc-select">
                          Locais conhecidos do bairro
                        </label>
                        <select
                          id="loc-select"
                          value={selectedLocId}
                          onChange={(e) =>
                            handleSelectExistingLocation(e.target.value)
                          }
                        >
                          {localizacoesBairro.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.logradouro}
                              {loc.numero !== 'S/N' ? `, ${loc.numero}` : ''} (
                              {loc.pontoReferencia || loc.bairro?.nome})
                            </option>
                          ))}
                          <option value="custom">
                            Outro endereço no bairro...
                          </option>
                        </select>
                      </div>

                      <div className="address-grid">
                        <div className="field-group">
                          <label htmlFor="logradouro-input">Logradouro *</label>
                          <input
                            id="logradouro-input"
                            type="text"
                            className={errors.logradouro ? 'input-error' : ''}
                            value={logradouro}
                            onChange={(e) => {
                              setSelectedLocId('custom');
                              setLogradouro(e.target.value);
                              if (errors.logradouro) {
                                setErrors((prev) => ({
                                  ...prev,
                                  logradouro: undefined,
                                }));
                              }
                            }}
                            placeholder="Ex: Rua das Acácias"
                          />
                          {errors.logradouro && (
                            <span className="error-text">
                              <i className="fa-solid fa-circle-exclamation" />
                              {errors.logradouro}
                            </span>
                          )}
                        </div>
                        <div className="field-group">
                          <label htmlFor="numero-input">Número</label>
                          <input
                            id="numero-input"
                            type="text"
                            value={numero}
                            onChange={(e) => {
                              setSelectedLocId('custom');
                              setNumero(e.target.value);
                            }}
                            placeholder="Ex: 120 ou S/N"
                          />
                        </div>
                      </div>

                      <div className="field-group">
                        <label htmlFor="ref-input">Ponto de referência</label>
                        <input
                          id="ref-input"
                          type="text"
                          value={pontoReferencia}
                          onChange={(e) => {
                            setSelectedLocId('custom');
                            setPontoReferencia(e.target.value);
                          }}
                          placeholder="Ex: Próximo à esquina ou ponto de ônibus"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="form-step">
                <div className="step-header">
                  <span className="step-number">4</span>
                  <h3>Descreva o problema</h3>
                </div>
                <div className="location-fields">
                  <div className="field-group">
                    <label htmlFor="titulo-input">Título resumido *</label>
                    <input
                      id="titulo-input"
                      type="text"
                      className={errors.titulo ? 'input-error' : ''}
                      value={titulo}
                      onChange={(e) => {
                        setTitulo(e.target.value);
                        if (errors.titulo) {
                          setErrors((prev) => ({ ...prev, titulo: undefined }));
                        }
                      }}
                      placeholder="Ex: Calçada obstruída"
                    />
                    {errors.titulo && (
                      <span className="error-text">
                        <i className="fa-solid fa-circle-exclamation" />
                        {errors.titulo}
                      </span>
                    )}
                  </div>
                  <div className="field-group">
                    <label htmlFor="descricao-input">
                      Detalhes da ocorrência *
                    </label>
                    <textarea
                      id="descricao-input"
                      className={errors.descricao ? 'input-error' : ''}
                      value={descricao}
                      onChange={(e) => {
                        setDescricao(e.target.value);
                        if (errors.descricao) {
                          setErrors((prev) => ({
                            ...prev,
                            descricao: undefined,
                          }));
                        }
                      }}
                      placeholder="Conte o que está acontecendo e quem é afetado..."
                    />
                    {errors.descricao && (
                      <span className="error-text">
                        <i className="fa-solid fa-circle-exclamation" />
                        {errors.descricao}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {Object.values(errors).some(Boolean) && (
                <div className="form-error-banner">
                  <i className="fa-solid fa-triangle-exclamation" />
                  <span>
                    Verifique os campos obrigatórios destacados em vermelho
                    antes de enviar.
                  </span>
                </div>
              )}

              <div className="form-footer">
                <label className="email-checkbox">
                  <input
                    type="checkbox"
                    checked={receberEmail}
                    onChange={(e) => setReceberEmail(e.target.checked)}
                  />
                  <span>Receber atualizações por e-mail</span>
                </label>
                <Button variant="primary" type="submit">
                  Enviar ocorrência
                </Button>
              </div>
            </form>
          </FormCard>

          <div className="right-column">
            <SimilaresCard>
              <h3>Já registraram algo parecido?</h3>
              <p className="subtitle">
                Apoiar uma ocorrência existente ajuda o zelador a priorizar e
                evita duplicatas.
              </p>
              {similares.map((oc, idx) => {
                const statusClass =
                  oc.status === StatusOcorrencia.EM_ANDAMENTO
                    ? 'em-andamento'
                    : oc.status === StatusOcorrencia.EM_ANALISE
                      ? 'em-analise'
                      : 'aberta';
                const distanciaMock = idx === 0 ? '40 m' : '180 m';

                return (
                  <div key={oc.id} className="similar-item">
                    <div className="similar-info">
                      <Link
                        to={`/ocorrencias/${oc.id}`}
                        className="similar-title"
                      >
                        {oc.titulo}
                      </Link>
                      <p className="similar-meta">
                        {oc.localizacao?.logradouro}
                        {oc.localizacao?.numero &&
                        oc.localizacao.numero !== 'S/N'
                          ? `, ${oc.localizacao.numero}`
                          : ''}{' '}
                        · {distanciaMock}
                      </p>
                      <span className={`mini-status ${statusClass}`}>
                        {oc.status}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="apoiar-pill-btn"
                      onClick={() => handleApoiarSimilar(oc.id)}
                    >
                      <i className="fa-solid fa-arrow-up" />
                      <span>Apoiar · {oc.apoios}</span>
                    </button>
                  </div>
                );
              })}
            </SimilaresCard>

            <TipsCard>
              <h3>Dicas para um bom registro</h3>
              <ul>
                <li>
                  <i className="fa-solid fa-check" />
                  <span>Fotografe de longe e de perto.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" />
                  <span>Informe um ponto de referência claro.</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" />
                  <span>
                    Diga quem é afetado: pedestres, ciclistas, cadeirantes.
                  </span>
                </li>
              </ul>
            </TipsCard>
          </div>
        </div>
      </StyledMain>
      <Footer />
    </>
  );
}
