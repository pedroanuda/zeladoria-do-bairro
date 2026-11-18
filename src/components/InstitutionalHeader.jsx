import fullLogo from '@/assets/logo-full.png';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from './Button';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--cor-superficie);
  padding: 1rem 5rem;
  border-bottom: 1px solid var(--cor-borda);
  position: sticky;
  top: 0;
  z-index: 50;
  flex-wrap: wrap;
  gap: 0.75rem;

  .left-brand {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .logo-link {
    display: flex;
    align-items: center;

    img {
      height: 2.25rem;
    }
  }

  nav ul {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    list-style: none;
  }

  .nav-item a {
    padding: 0.5rem 0.85rem;
    display: inline-block;
    text-decoration: none;
    border-radius: 10px;
    color: var(--cor-grafite);
    font-size: 0.925rem;
    font-weight: 500;

    &:hover {
      background-color: rgb(from var(--cor-grafite) r g b / 10%);
    }

    &.active {
      color: var(--cor-primaria);
      background-color: rgb(from var(--cor-primaria) r g b / 14%);
      font-weight: 600;
    }
  }

  .actions-right {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: 1px solid var(--cor-borda);
    border-radius: 10px;
    padding: 0.45rem 0.65rem;
    color: var(--cor-grafite);
    font-size: 1.1rem;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    padding: 0.9rem 2rem;
  }

  @media (max-width: 820px) {
    padding: 0.85rem 1.25rem;

    .mobile-menu-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    nav {
      display: none;
      width: 100%;
      order: 3;
      padding-top: 0.5rem;
      border-top: 1px solid var(--cor-borda);

      &.open {
        display: block;
      }

      ul {
        flex-direction: column;
        align-items: stretch;
      }

      .nav-item a {
        width: 100%;
      }
    }

    .hide-mobile {
      display: none;
    }
  }
`;

export default function InstitutionalHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <div className="left-brand">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Abrir menu institucional"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
        </button>

        <Link to="/" className="logo-link">
          <img src={fullLogo} alt="Zeladoria do Bairro" />
        </Link>

        <nav
          aria-label="Navegação institucional"
          className={menuOpen ? 'open' : ''}
        >
          <ul>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/solucao"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Solução
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/impacto"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Impacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/equipe"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Equipe
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="actions-right">
        <Button
          variant="secondary"
          onClick={() => navigate('/zelador/painel')}
          className="hide-mobile"
        >
          <i className="fa-solid fa-shield-halved" />
          <span className="hide-mobile">Sou zelador</span>
        </Button>
        <Button variant="primary" onClick={() => navigate('/home')}>
          Acessar plataforma
        </Button>
      </div>
    </StyledHeader>
  );
}
