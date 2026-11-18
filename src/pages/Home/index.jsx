import { Footer, Header } from '@/components';
import {
  atualizacaoService,
  bairroService,
  eventoService,
  iniciativaService,
  ocorrenciaService,
  usuarioService,
} from '@/services';
import { useState } from 'react';
import styled from 'styled-components';
import ActionButton from './components/ActionButton';
import MinhasOcorrenciasSection from './components/MinhasOcorrenciasSection';
import MuralIniciativasSection from './components/MuralIniciativasSection';
import NoticiasBairroSection from './components/NoticiasBairroSection';
import ProximosEventosSection from './components/ProximosEventosSection';

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2rem 5rem;

  .greeting-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.75rem;
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

  .date-label {
    color: rgb(from var(--cor-grafite) r g b / 70%);
    font-size: 0.9rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .conteudo-cards {
    display: grid;
    grid-template-columns: 8fr 4fr;
    gap: 1.5rem;
    align-items: start;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const days = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export default function Home() {
  const currentUser = usuarioService.getCurrentUser();
  const bairros = bairroService.getAll();
  const [selectedBairroId, setSelectedBairroId] = useState(
    currentUser?.bairroId ?? bairros[0]?.id ?? 1,
  );

  const currentDate = new Date();
  const definedDate = `${days[currentDate.getDay()]}, ${currentDate.getDate()} de ${months[currentDate.getMonth()]}`;

  const primeiroNome = currentUser?.nome?.split(' ')[0] ?? 'Morador';

  const ocorrenciasDoBairro = ocorrenciaService.getByBairro(selectedBairroId);
  const minhasOcorrenciasNoBairro = ocorrenciasDoBairro.filter(
    (oc) => oc.solicitanteId === currentUser?.id,
  );
  const ocorrenciasExibidas =
    minhasOcorrenciasNoBairro.length > 0
      ? minhasOcorrenciasNoBairro
      : ocorrenciasDoBairro;

  const iniciativasDoBairro = iniciativaService.getByBairro(selectedBairroId);
  const eventosDoBairro = eventoService.getByBairro(selectedBairroId);
  const noticiasDoBairro = atualizacaoService.getByBairro(selectedBairroId);

  return (
    <>
      <Header />
      <StyledMain>
        <div className="greeting-header">
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
            <h2 style={{ lineHeight: '1.95rem', color: 'var(--cor-grafite)' }}>
              Olá, {primeiroNome}!
            </h2>
          </div>
          <span className="date-label">{definedDate}</span>
        </div>

        <div className="action-buttons">
          <ActionButton
            text="Criar ocorrência"
            icon={<i className="fa-solid fa-plus" />}
            variant="primary"
            href="/ocorrencias/nova"
          />
          <ActionButton
            text="Eventos"
            icon={<i className="fa-regular fa-calendar" />}
            href="/eventos"
          />
          <ActionButton
            text="Notícias"
            icon={<i className="fa-regular fa-newspaper" />}
            href="/noticias"
          />
        </div>

        <section className="conteudo-cards">
          <div className="left-column">
            <MinhasOcorrenciasSection ocorrencias={ocorrenciasExibidas} />
            <MuralIniciativasSection iniciativas={iniciativasDoBairro} />
          </div>
          <div className="right-column">
            <ProximosEventosSection eventos={eventosDoBairro} />
            <NoticiasBairroSection noticias={noticiasDoBairro} />
          </div>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
}
