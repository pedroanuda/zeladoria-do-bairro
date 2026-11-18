import { Button, Footer, InstitutionalHeader, Surface } from '@/components';
import { Link, useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2.25rem 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .hero-section {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: 2.5rem;
    align-items: center;

    .ods-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.3rem 0.85rem;
      border-radius: 999px;
      background-color: rgb(from var(--cor-primaria) r g b / 14%);
      color: var(--cor-primaria);
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 2.35rem;
      color: var(--cor-grafite);
      line-height: 1.18;
      margin-bottom: 1rem;
    }

    .lead {
      font-size: 1.05rem;
      color: rgb(from var(--cor-grafite) r g b / 78%);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .hero-buttons {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      flex-wrap: wrap;
    }
  }

  .section-heading {
    margin-bottom: 1.25rem;

    .eyebrow {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cor-primaria);
      margin-bottom: 0.25rem;
    }

    h2 {
      font-size: 1.55rem;
      color: var(--cor-grafite);
      line-height: 1.25;
    }

    p {
      font-size: 0.95rem;
      color: rgb(from var(--cor-grafite) r g b / 72%);
      margin-top: 0.35rem;
      max-width: 48rem;
      line-height: 1.55;
    }
  }

  .citizen-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .data-highlight-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 1.25rem;
  }

  .ods-grid {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: 1.25rem;
  }

  @media (max-width: 1024px) {
    margin: 1.75rem 2rem 2.5rem;

    .hero-section,
    .citizen-grid,
    .data-highlight-grid,
    .ods-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;
    gap: 2.25rem;

    .hero-section h1 {
      font-size: 1.75rem;
    }
  }
`;

const HeroSummaryCard = styled(Surface)`
  padding: 1.65rem;
  background-color: var(--cor-primaria);
  border-color: var(--cor-primaria);
  color: var(--cor-superficie);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 1.2rem;
    line-height: 1.35;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.55;
    opacity: 0.92;
  }

  .quick-points {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.18);

    li {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      font-size: 0.875rem;

      i {
        color: var(--cor-terciaria);
      }
    }
  }
`;

const CitizenCard = styled(Surface)`
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  .icon-box {
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 10px;
    background-color: rgb(from var(--cor-secundaria) r g b / 15%);
    color: var(--cor-secundaria);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  h3 {
    font-size: 1.05rem;
    color: var(--cor-grafite);
  }

  p {
    font-size: 0.9rem;
    color: rgb(from var(--cor-grafite) r g b / 76%);
    line-height: 1.55;
  }
`;

const StatBox = styled(Surface)`
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  .stat-number {
    font-family: var(--fonte-heading);
    font-size: 2.15rem;
    font-weight: 700;
    color: var(--cor-primaria);
    line-height: 1.1;
  }

  .stat-title {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--cor-grafite);
  }

  .stat-desc {
    font-size: 0.85rem;
    color: rgb(from var(--cor-grafite) r g b / 72%);
    line-height: 1.48;
    flex: 1;
  }

  cite {
    margin-top: 0.45rem;
    font-style: normal;
    font-size: 0.75rem;
    color: rgb(from var(--cor-grafite) r g b / 58%);
    border-top: 1px solid var(--cor-borda);
    padding-top: 0.5rem;
  }
`;

const OdsCard = styled(Surface)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  .ods-header {
    display: flex;
    align-items: center;
    gap: 0.85rem;

    .ods-number {
      width: 3rem;
      height: 3rem;
      border-radius: 10px;
      background-color: #f99d26;
      color: var(--cor-superficie);
      font-family: var(--fonte-heading);
      font-weight: 700;
      font-size: 1.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &.blue {
        background-color: var(--cor-secundaria);
      }
    }

    h3 {
      font-size: 1.1rem;
      color: var(--cor-grafite);
      line-height: 1.3;
    }

    span {
      font-size: 0.8rem;
      color: rgb(from var(--cor-grafite) r g b / 62%);
    }
  }

  p {
    font-size: 0.9rem;
    color: rgb(from var(--cor-grafite) r g b / 78%);
    line-height: 1.55;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      font-size: 0.85rem;
      color: var(--cor-grafite);
      line-height: 1.45;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;

      i {
        color: var(--cor-primaria);
        margin-top: 0.2rem;
      }
    }
  }
`;

export default function InstitucionalInicio() {
  const navigate = useNavigate();

  return (
    <>
      <InstitutionalHeader />
      <StyledMain>
        <section className="hero-section" aria-labelledby="titulo-principal">
          <article>
            <span className="ods-tag">
              <i className="fa-solid fa-city" />
              ODS 11 · Cidades e Comunidades Sustentáveis
            </span>
            <h1 id="titulo-principal">
              Quando a rua tem problema, o morador sente no caminho de casa.
            </h1>
            <p className="lead">
              A <strong>Zeladoria do Bairro</strong> nasceu para resolver uma
              situação comum nas cidades brasileiras: todo mundo vê o buraco na
              calçada, o poste queimado ou o lixo acumulado na esquina, mas
              quase ninguém sabe para quem pedir, se outro vizinho já avisou ou
              quando o reparo vai acontecer.
            </p>
            <div className="hero-buttons">
              <Button variant="primary" onClick={() => navigate('/solucao')}>
                Conhecer a solução
                <i className="fa-solid fa-arrow-right" />
              </Button>
              <Button variant="secondary" onClick={() => navigate('/home')}>
                Testar como morador
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/zelador/painel')}
              >
                <i className="fa-solid fa-shield-halved" />
                Testar como zelador
              </Button>
            </div>
          </article>

          <aside aria-label="Resumo da proposta">
            <HeroSummaryCard>
              <h2>Nossa proposta em poucas palavras</h2>
              <p>
                Reunimos em um só lugar os moradores e a equipe de zeladoria de
                cada bairro. Em vez de protocolos isolados que somem sem
                resposta, os chamados ficam visíveis para a vizinhança apoiar e
                acompanhar etapa por etapa.
              </p>
              <ul className="quick-points">
                <li>
                  <i className="fa-solid fa-check" />
                  <span>
                    O morador registra o problema e acompanha o andamento real
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-check" />
                  <span>
                    Vizinhos apoiam o mesmo chamado em vez de abrir duplicatas
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-check" />
                  <span>
                    O zelador organiza a fila por prioridade e presta contas no
                    mural
                  </span>
                </li>
              </ul>
            </HeroSummaryCard>
          </aside>
        </section>

        <section aria-labelledby="quem-e-o-cidadao">
          <div className="section-heading">
            <p className="eyebrow">01 · Quem é o cidadão e o problema</p>
            <h2 id="quem-e-o-cidadao">
              Quem enfrenta a falta de zeladoria no dia a dia?
            </h2>
            <p>
              O nosso usuário principal é o morador que circula a pé pelo
              próprio bairro. Quando a manutenção falha, o impacto não é só
              visual: ele afeta a segurança e o direito de ir e vir.
            </p>
          </div>

          <div className="citizen-grid">
            <article>
              <CitizenCard>
                <div className="icon-box">
                  <i className="fa-solid fa-wheelchair" />
                </div>
                <h3>Idosos, cadeirantes e famílias</h3>
                <p>
                  Uma calçada quebrada ou tomada por entulho obriga quem tem
                  mobilidade reduzida ou empurra um carrinho de bebê a caminhar
                  no meio da rua, dividindo espaço com os carros.
                </p>
              </CitizenCard>
            </article>

            <article>
              <CitizenCard>
                <div className="icon-box">
                  <i className="fa-solid fa-briefcase" />
                </div>
                <h3>Trabalhadores e estudantes</h3>
                <p>
                  Quem sai cedo ou volta à noite do ponto de ônibus e do metrô
                  depende de iluminação funcionando, faixas de pedestre visíveis
                  e pontos de parada limpos e seguros.
                </p>
              </CitizenCard>
            </article>

            <article>
              <CitizenCard>
                <div className="icon-box">
                  <i className="fa-solid fa-users" />
                </div>
                <h3>Lideranças e moradores engajados</h3>
                <p>
                  Querem organizar mutirões, cobrar melhorias e avisar os
                  vizinhos, mas acabam espalhando mensagens em grupos de
                  WhatsApp onde a informação se perde rapidamente.
                </p>
              </CitizenCard>
            </article>
          </div>
        </section>

        <section aria-labelledby="dados-reais">
          <div className="section-heading">
            <p className="eyebrow">Dados reais do problema no Brasil</p>
            <h2 id="dados-reais">
              O que os levantamentos oficiais mostram sobre as nossas ruas
            </h2>
            <p>
              Os números do Censo Demográfico do IBGE sobre o entorno dos
              domicílios urbanos mostram que a falta de manutenção básica nas
              calçadas e vias é a regra para a maioria da população:
            </p>
          </div>

          <div className="data-highlight-grid">
            <article>
              <StatBox>
                <span className="stat-number">80,9%</span>
                <p className="stat-title">
                  dos moradores enfrentam obstáculos na calçada
                </p>
                <p className="stat-desc">
                  Apenas 19,1% dos moradores em áreas urbanas do Brasil vivem em
                  ruas com calçadas livres de buracos, degraus ou barreiras.
                </p>
                <cite>
                  Fonte: IBGE — Censo Demográfico 2022: Características
                  Urbanísticas do Entorno dos Domicílios (divulgado em 2025).
                </cite>
              </StatBox>
            </article>

            <article>
              <StatBox>
                <span className="stat-number">16,9%</span>
                <p className="stat-title">
                  têm rampa de acessibilidade na via onde moram
                </p>
                <p className="stat-desc">
                  Mais de 83% das vias urbanas brasileiras ainda não oferecem
                  rampa para cadeirantes ou pessoas com mobilidade reduzida nas
                  travessias.
                </p>
                <cite>
                  Fonte: IBGE — Censo Demográfico 2022: Características
                  Urbanísticas do Entorno dos Domicílios.
                </cite>
              </StatBox>
            </article>

            <article>
              <StatBox>
                <span className="stat-number">+600 mil</span>
                <p className="stat-title">
                  pedidos anuais de zeladoria só na capital paulista
                </p>
                <p className="stat-desc">
                  Chamados de poda de árvores, tapa-buraco, limpeza e iluminação
                  lideram os canais 156, sofrendo com chamados repetidos para o
                  mesmo ponto e falta de retorno claro ao cidadão.
                </p>
                <cite>
                  Fonte: Prefeitura de São Paulo — Dados Abertos do Portal SP156
                  / Relatórios de Atendimento ao Cidadão.
                </cite>
              </StatBox>
            </article>
          </div>
        </section>

        <section aria-labelledby="ods-relacionados">
          <div className="section-heading">
            <p className="eyebrow">Agenda 2030 da ONU</p>
            <h2 id="ods-relacionados">
              Objetivos de Desenvolvimento Sustentável ligados ao projeto
            </h2>
          </div>

          <div className="ods-grid">
            <article>
              <OdsCard>
                <div className="ods-header">
                  <div className="ods-number">11</div>
                  <div>
                    <h3>ODS 11 · Cidades e Comunidades Sustentáveis</h3>
                    <span>Objetivo principal do projeto</span>
                  </div>
                </div>
                <p>
                  Tornar as cidades e os assentamentos humanos inclusivos,
                  seguros, resilientes e sustentáveis começa pelo cuidado com a
                  escala mais próxima do cidadão: o seu próprio bairro.
                </p>
                <ul>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>
                      <strong>Meta 11.7:</strong> Proporcionar acesso universal
                      a espaços públicos seguros, inclusivos, acessíveis e
                      verdes, em particular para idosos, mulheres, crianças e
                      pessoas com deficiência.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>
                      <strong>Meta 11.3:</strong> Aumentar a urbanização
                      inclusiva e a capacidade para o planejamento e gestão
                      participativa dos bairros.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>
                      <strong>Meta 11.6:</strong> Reduzir o impacto ambiental
                      negativo das cidades, prestando atenção especial à gestão
                      de resíduos e limpeza urbana.
                    </span>
                  </li>
                </ul>
              </OdsCard>
            </article>

            <article>
              <OdsCard>
                <div className="ods-header">
                  <div className="ods-number blue">16</div>
                  <div>
                    <h3>ODS 16 · Paz, Justiça e Instituições Eficazes</h3>
                    <span>Objetivo complementar</span>
                  </div>
                </div>
                <p>
                  Ao transformar o protocolo de zeladoria em um processo
                  público, com histórico visível e priorização por apoio dos
                  vizinhos, fortalecemos a transparência na gestão local.
                </p>
                <ul>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>
                      <strong>Meta 16.6:</strong> Desenvolver serviços públicos
                      eficazes, responsáveis e transparentes em todos os níveis.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>
                      <strong>Meta 16.7:</strong> Garantir a tomada de decisão
                      responsiva, inclusiva e participativa junto à comunidade.
                    </span>
                  </li>
                </ul>
                <div style={{ marginTop: '0.5rem' }}>
                  <Link
                    to="/impacto"
                    style={{
                      color: 'var(--cor-secundaria)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Ver indicadores detalhados na página de Impacto →
                  </Link>
                </div>
              </OdsCard>
            </article>
          </div>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
}
