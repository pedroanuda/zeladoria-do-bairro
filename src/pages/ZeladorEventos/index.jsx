import {
  formatEventBadgeDate,
  formatEventSchedule,
} from '@/common/utils/formatters.js';
import { Button, Surface, ZeladorLayout } from '@/components';
import { eventoService, localizacaoService, usuarioService } from '@/services';
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

  .list-col {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
`;

const EventoCard = styled(Surface)`
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  .date-badge {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
    background-color: var(--cor-fundo);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .day {
      font-family: var(--fonte-heading);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--cor-primaria);
    }

    .month {
      font-size: 0.68rem;
      font-weight: 700;
      color: rgb(from var(--cor-grafite) r g b / 65%);
    }
  }

  .evento-info {
    flex: 1;

    h3 {
      font-size: 1rem;
      color: var(--cor-grafite);
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.85rem;
      color: rgb(from var(--cor-grafite) r g b / 74%);
      line-height: 1.45;
      margin-bottom: 0.5rem;
    }

    .meta {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 62%);
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
      min-height: 4.5rem;
      resize: vertical;
    }
  }
`;

export default function ZeladorEventos() {
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;
  const localizacoes = localizacaoService.getByBairro(bairroId);

  const [nome, setNome] = useState('');
  const [dataHora, setDataHora] = useState('2026-11-30T09:00');
  const [localizacaoId, setLocalizacaoId] = useState(localizacoes[0]?.id ?? '');
  const [descricao, setDescricao] = useState('');
  const [version, setVersion] = useState(0);

  const eventos = eventoService
    .getByBairro(bairroId)
    .slice()
    .sort((a, b) => a.data - b.data);
  void version;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!nome.trim() || !descricao.trim()) return;

    eventoService.create({
      nome: nome.trim(),
      descricao: descricao.trim(),
      data: new Date(dataHora),
      marcadoEm: new Date(),
      criadorId: zelador?.id ?? 3,
      bairroId,
      localizacaoId: localizacaoId ? Number(localizacaoId) : null,
    });

    setNome('');
    setDescricao('');
    setVersion((v) => v + 1);
  };

  return (
    <ZeladorLayout>
      <PageWrapper>
        <div className="top-bar">
          <div>
            <p className="sub-location">
              Agenda comunitária · {zelador?.bairro?.nome ?? 'Vila Mariana'}
            </p>
            <h1>Eventos</h1>
          </div>
        </div>

        <div className="content-grid">
          <div className="list-col">
            {eventos.map((ev) => {
              const { day, monthShort } = formatEventBadgeDate(ev.data);
              return (
                <EventoCard key={ev.id}>
                  <div className="date-badge">
                    <span className="day">{day}</span>
                    <span className="month">{monthShort}</span>
                  </div>
                  <div className="evento-info">
                    <h3>{ev.nome}</h3>
                    <p>{ev.descricao}</p>
                    <p className="meta">
                      {formatEventSchedule(ev.data)} ·{' '}
                      {ev.localizacao?.logradouro ?? ev.bairro?.nome} ·{' '}
                      <strong>
                        {ev.participacoes?.length ?? 0} confirmados
                      </strong>
                    </p>
                  </div>
                </EventoCard>
              );
            })}
          </div>

          <FormCard>
            <h3>Criar novo evento</h3>
            <form onSubmit={handleCreate}>
              <div className="field-group">
                <label htmlFor="ev-nome">Nome do evento</label>
                <input
                  id="ev-nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Mutirão de limpeza da praça"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="ev-data">Data e horário</label>
                <input
                  id="ev-data"
                  type="datetime-local"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="ev-loc">Localização no bairro</label>
                <select
                  id="ev-loc"
                  value={localizacaoId}
                  onChange={(e) => setLocalizacaoId(e.target.value)}
                >
                  {localizacoes.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.logradouro}
                      {loc.numero !== 'S/N' ? `, ${loc.numero}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="ev-desc">Descrição e orientações</label>
                <textarea
                  id="ev-desc"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe o objetivo do encontro e como os moradores podem participar..."
                  required
                />
              </div>

              <Button
                variant="primary"
                onClick={handleCreate}
                style={{ justifyContent: 'center' }}
              >
                <i className="fa-regular fa-calendar-plus" />
                Agendar evento no bairro
              </Button>
            </form>
          </FormCard>
        </div>
      </PageWrapper>
    </ZeladorLayout>
  );
}
