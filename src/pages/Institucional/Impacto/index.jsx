import { Button, Footer, InstitutionalHeader, Surface } from '@/components';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2.25rem 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.75rem;

  .page-intro {
    max-width: 48rem;

    .eyebrow {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cor-primaria);
      margin-bottom: 0.35rem;
    }

    h1 {
      font-size: 2.15rem;
      color: var(--cor-grafite);
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1rem;
      color: rgb(from var(--cor-grafite) r g b / 75%);
      line-height: 1.6;
    }
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .comparison-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .cta-banner {
    padding: 2rem;
    border-radius: 14px;
    background-color: var(--cor-primaria);
    color: var(--cor-superficie);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;

    h2 {
      font-size: 1.35rem;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.92rem;
      opacity: 0.9;
      max-width: 36rem;
    }

    .cta-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 1024px) {
    margin: 1.75rem 2rem 2.5rem;

    .impact-grid,
    .comparison-section {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;

    .page-intro h1 {
      font-size: 1.7rem;
    }
  }
`;

const ImpactCard = styled(Surface)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  .tag-ods {
    align-self: flex-start;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: rgb(from var(--cor-terciaria) r g b / 28%);
    color: #7a5200;
  }

  h2 {
    font-size: 1.1rem;
    color: var(--cor-grafite);
    line-height: 1.3;
  }

  p {
    font-size: 0.9rem;
    color: rgb(from var(--cor-grafite) r g b / 76%);
    line-height: 1.55;
  }
`;

const CompareCard = styled(Surface)`
  padding: 1.5rem;

  h3 {
    font-size: 1.1rem;
    color: var(--cor-grafite);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.9rem;
      color: var(--cor-grafite);
      line-height: 1.48;

      i.bad {
        color: #c62828;
        margin-top: 0.25rem;
      }

      i.good {
        color: var(--cor-primaria);
        margin-top: 0.25rem;
      }
    }
  }
`;

export default function InstitucionalImpacto() {
  const navigate = useNavigate();

  return (
    <>
      <InstitutionalHeader />
      <StyledMain>
        <section className="page-intro" aria-labelledby="impacto-titulo">
          <p className="eyebrow">Impacto esperado no bairro</p>
          <h1 id="impacto-titulo">
            O que muda quando o cuidado com o bairro deixa de ser invisível
          </h1>
          <p>
            Nosso objetivo não é apenas criar mais um formulário de reclamação,
            mas organizar a comunicação entre quem vive o problema na rua e quem
            planeja o serviço público na subprefeitura.
          </p>
        </section>

        <section
          className="impact-grid"
          aria-label="Frentes de impacto ligadas às metas da ONU"
        >
          <article>
            <ImpactCard>
              <span className="tag-ods">Meta ODS 11.7 · Acessibilidade</span>
              <h2>Ruas e calçadas mais seguras para caminhar</h2>
              <p>
                Ao dar destaque para problemas de pavimentação, calçadas
                obstruídas e falta de iluminação, ajudamos a equipe técnica a
                agir primeiro nos trechos onde pedestres, idosos e cadeirantes
                correm mais risco.
              </p>
            </ImpactCard>
          </article>

          <article>
            <ImpactCard>
              <span className="tag-ods">
                Meta ODS 11.3 · Gestão participativa
              </span>
              <h2>Menos chamados repetidos, mais foco no que importa</h2>
              <p>
                Quando o morador vai registrar uma ocorrência, o sistema mostra
                chamados parecidos já abertos na mesma região. Em vez de 20
                protocolos separados para o mesmo buraco, temos 1 demanda com 20
                apoios reais.
              </p>
            </ImpactCard>
          </article>

          <article>
            <ImpactCard>
              <span className="tag-ods">Meta ODS 16.6 · Transparência</span>
              <h2>Histórico aberto do início à conclusão</h2>
              <p>
                Cada mudança de etapa — da análise até a conclusão — fica
                registrada na linha do tempo da ocorrência, e as entregas vão
                para o mural do bairro para que todos vejam o que foi feito.
              </p>
            </ImpactCard>
          </article>
        </section>

        <section
          className="comparison-section"
          aria-label="Comparativo antes e depois da plataforma"
        >
          <article>
            <CompareCard>
              <h3>
                <i
                  className="fa-solid fa-circle-xmark"
                  style={{ color: '#c62828' }}
                />
                Como costuma acontecer hoje
              </h3>
              <ul>
                <li>
                  <i className="fa-solid fa-xmark bad" />
                  <span>
                    O morador abre um protocolo, recebe um número e não sabe se
                    algum fiscal já foi até o local.
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-xmark bad" />
                  <span>
                    Vários vizinhos abrem chamados repetidos para o mesmo
                    problema sem saber que ele já foi reportado.
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-xmark bad" />
                  <span>
                    Avisos de mudança de horário de coleta, poda ou mutirões se
                    perdem em grupos de mensagens.
                  </span>
                </li>
              </ul>
            </CompareCard>
          </article>

          <article>
            <CompareCard>
              <h3>
                <i
                  className="fa-solid fa-circle-check"
                  style={{ color: 'var(--cor-primaria)' }}
                />
                Com a Zeladoria do Bairro
              </h3>
              <ul>
                <li>
                  <i className="fa-solid fa-check good" />
                  <span>
                    Linha do tempo clara com o nome do zelador responsável e as
                    observações técnicas de cada etapa.
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-check good" />
                  <span>
                    Apoio comunitário que soma forças no mesmo chamado e ordena
                    automaticamente a fila do zelador.
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-check good" />
                  <span>
                    Mural de iniciativas, agenda de eventos com confirmação de
                    presença e comunicados com anexos oficiais.
                  </span>
                </li>
              </ul>
            </CompareCard>
          </article>
        </section>

        <section className="cta-banner" aria-label="Experimentar a plataforma">
          <div>
            <h2>Veja o impacto funcionando na prática</h2>
            <p>
              Navegue pelos dados simulados dos bairros tanto na visão de quem
              mora no bairro quanto no painel de trabalho do zelador.
            </p>
          </div>
          <div className="cta-actions">
            <Button variant="secondary" onClick={() => navigate('/home')}>
              Abrir visão do Morador
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/zelador/painel')}
            >
              Abrir painel do Zelador
            </Button>
          </div>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
}
