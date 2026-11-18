import { Footer, InstitutionalHeader, Surface } from '@/components';
import styled from 'styled-components';

const INTEGRANTES = [
  {
    nome: 'Pedro Anuda',
    iniciais: 'PA',
    papel: 'Full Stack, Arquitetura & Modelagem',
    bio: 'Modelagem do sistema, arquitetura da aplicação e desenvolvimento das funcionalidades.',
  },
  {
    nome: 'Brunna Saraiva',
    iniciais: 'BS',
    papel: 'Pesquisa & Requisitos',
    bio: 'Pesquisa sobre o problema urbano, definição do escopo e levantamento dos requisitos do projeto.',
  },
  {
    nome: 'Ana Carolina',
    iniciais: 'AC',
    papel: 'Front-end & UX/UI',
    bio: 'Concepção visual das telas, prototipação da experiência de uso e construção do front-end.',
  },
  {
    nome: 'Lucas Peixoto',
    iniciais: 'LP',
    papel: 'Apresentação & Pitch',
    bio: 'Roteiro da demonstração, comunicação da proposta de valor e condução do Pitch.',
  },
  {
    nome: 'Thiago Neves',
    iniciais: 'TN',
    papel: 'Front-end & Revisão',
    bio: 'Implementação de componentes visuais, testes de navegação e revisão geral do projeto.',
  },
];

const StyledMain = styled.main`
  min-height: calc(100vh - 20px);
  margin: 2.25rem 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.75rem;

  .page-intro {
    max-width: 46rem;

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

  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 1024px) {
    margin: 1.75rem 2rem 2.5rem;

    .team-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    margin: 1.25rem 1rem 2rem;

    .team-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const MemberCard = styled(Surface)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  .member-top {
    display: flex;
    align-items: center;
    gap: 0.9rem;

    .avatar {
      width: 3.1rem;
      height: 3.1rem;
      border-radius: 50%;
      background-color: var(--cor-primaria);
      color: var(--cor-superficie);
      font-family: var(--fonte-heading);
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    h2 {
      font-size: 1.1rem;
      color: var(--cor-grafite);
      line-height: 1.25;
    }

    .role {
      font-size: 0.8rem;
      color: var(--cor-secundaria);
      font-weight: 600;
      margin-top: 0.15rem;
    }
  }

  p {
    font-size: 0.88rem;
    color: rgb(from var(--cor-grafite) r g b / 74%);
    line-height: 1.5;
  }
`;

const ProjectContextCard = styled(Surface)`
  padding: 1.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  h2 {
    font-size: 1.2rem;
    color: var(--cor-grafite);
  }

  p {
    font-size: 0.92rem;
    color: rgb(from var(--cor-grafite) r g b / 76%);
    line-height: 1.6;
  }
`;

export default function InstitucionalEquipe() {
  return (
    <>
      <InstitutionalHeader />
      <StyledMain>
        <section className="page-intro" aria-labelledby="equipe-titulo">
          <p className="eyebrow">Quem construiu o projeto</p>
          <h1 id="equipe-titulo">Nossa Equipe</h1>
          <p>
            Somos um grupo de estudantes da FIAP dedicados a criar uma
            ferramenta prática que aproxime os moradores da gestão do seu
            próprio bairro, alinhada ao ODS 11 da ONU.
          </p>
        </section>

        <section className="team-grid" aria-label="Integrantes do grupo">
          {INTEGRANTES.map((membro) => (
            <article key={membro.nome}>
              <MemberCard>
                <div className="member-top">
                  <div className="avatar" aria-hidden="true">
                    {membro.iniciais}
                  </div>
                  <div>
                    <h2>{membro.nome}</h2>
                    <p className="role">{membro.papel}</p>
                  </div>
                </div>
                <p>{membro.bio}</p>
              </MemberCard>
            </article>
          ))}
        </section>

        <section aria-labelledby="sobre-desenvolvimento">
          <ProjectContextCard>
            <h2 id="sobre-desenvolvimento">Sobre o desenvolvimento</h2>
            <p>
              O projeto foi planejado desde a modelagem orientada a objetos em
              UML (pacotes de Registro de Ocorrências e Comunicação Comunitária)
              até a prototipação de interface para os dois atores do sistema: o
              Morador e o Zelador. Na implementação, utilizamos React, HTML5
              semântico, Styled Components e uma camada própria de simulação de
              banco de dados em memória (<code>db.js</code>) e serviços que
              hidratam automaticamente os relacionamentos entre bairros,
              localizações, usuários, ocorrências, eventos, iniciativas, posts e
              comunicados.
            </p>
          </ProjectContextCard>
        </section>
      </StyledMain>
      <Footer />
    </>
  );
}
