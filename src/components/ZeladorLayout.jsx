import fullLogoDark from '@/assets/logo-full-dark.png';
import { StatusOcorrencia } from '@/common/models/index.js';
import { ocorrenciaService, usuarioService } from '@/services';
import { Link, NavLink } from 'react-router';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  min-height: 100vh;
  background-color: var(--cor-fundo);
`;

const StyledSidebar = styled.aside`
  background-color: var(--cor-grafite);
  color: var(--cor-superficie);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;

  .sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .logo-link {
    display: inline-flex;
    align-items: center;
    padding: 0 0.5rem;

    img {
      height: 2.35rem;
    }
  }

  .nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.15s ease;

    .link-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      i {
        width: 1.15rem;
        text-align: center;
        font-size: 0.95rem;
      }
    }

    .count-badge {
      padding: 0.12rem 0.5rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      background-color: rgba(255, 255, 255, 0.14);
      color: var(--cor-superficie);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: var(--cor-superficie);
    }

    &.active {
      background-color: var(--cor-terciaria);
      color: var(--cor-grafite);
      font-weight: 600;

      .count-badge {
        background-color: var(--cor-grafite);
        color: var(--cor-superficie);
      }
    }
  }

  .soon-section {
    margin-top: 0.75rem;
    padding: 0 0.85rem;

    .soon-title {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.42);
      margin-bottom: 0.65rem;
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    li {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.45);
      cursor: default;
    }
  }

  .sidebar-bottom {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .zelador-profile-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.06);

    .avatar {
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 50%;
      background-color: var(--cor-secundaria);
      color: var(--cor-superficie);
      font-weight: 700;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .profile-info {
      min-width: 0;

      .name {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--cor-superficie);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .role {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.58);
      }
    }
  }

  .switch-persona-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.78);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 500;
    transition: all 0.15s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--cor-superficie);
    }
  }
`;

const ContentArea = styled.main`
  padding: 2rem 2.75rem 3rem;
  min-width: 0;
`;

export default function ZeladorLayout({ children }) {
  const zelador = usuarioService.getCurrentZelador();
  const bairroId = zelador?.bairroId ?? 1;

  const demandasAbertasCount = ocorrenciaService
    .getByBairro(bairroId)
    .filter(
      (oc) =>
        oc.status !== StatusOcorrencia.CONCLUIDA &&
        oc.status !== StatusOcorrencia.ARQUIVADA,
    ).length;

  const nomeCurto =
    zelador?.nome?.replace(' (Subprefeitura)', '') ?? 'Roberto Alves';
  const inicial = nomeCurto.charAt(0).toUpperCase();

  return (
    <LayoutWrapper>
      <StyledSidebar>
        <div className="sidebar-top">
          <Link to="/zelador/painel" className="logo-link">
            <img src={fullLogoDark} alt="Zeladoria do Bairro" />
          </Link>

          <nav>
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/zelador/painel"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="link-left">
                    <i className="fa-solid fa-table-cells-large" />
                    <span>Painel</span>
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/zelador/demandas"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="link-left">
                    <i className="fa-solid fa-list-check" />
                    <span>Demandas</span>
                  </span>
                  <span className="count-badge">{demandasAbertasCount}</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/zelador/iniciativas"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="link-left">
                    <i className="fa-regular fa-image" />
                    <span>Mural de iniciativas</span>
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/zelador/comunicacao"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="link-left">
                    <i className="fa-solid fa-bullhorn" />
                    <span>Comunicação</span>
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/zelador/eventos"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="link-left">
                    <i className="fa-regular fa-calendar" />
                    <span>Eventos</span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="soon-section">
            <p className="soon-title">EM BREVE</p>
            <ul>
              <li>Transparência</li>
              <li>Acessibilidade</li>
              <li>Alertas de risco</li>
            </ul>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="zelador-profile-card">
            <div className="avatar">{inicial}</div>
            <div className="profile-info">
              <p className="name">{nomeCurto}</p>
              <p className="role">
                Zelador · {zelador?.bairro?.nome ?? 'Vila Mariana'}
              </p>
            </div>
          </div>

          <Link to="/home" className="switch-persona-link">
            <i className="fa-solid fa-repeat" />
            <span>Alternar para visão Morador</span>
          </Link>
        </div>
      </StyledSidebar>

      <ContentArea>{children}</ContentArea>
    </LayoutWrapper>
  );
}
