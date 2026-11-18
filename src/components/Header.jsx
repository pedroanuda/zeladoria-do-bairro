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

  .navigation-div,
  .user-actions-div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .navigation-div > img {
    height: 2.25rem;
  }

  .user-actions-div {
    gap: 0.75rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;
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

  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background-color: var(--cor-secundaria);
    font-weight: bold;
    color: var(--cor-fundo);
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    padding: 0.9rem 2rem;

    .btn-label-hide-tablet {
      display: none;
    }
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
      flex-direction: column;
      padding-top: 0.5rem;
      border-top: 1px solid var(--cor-borda);
      gap: 0.25rem;

      &.open {
        display: flex;
      }
    }

    .btn-text-register {
      display: none;
    }
  }
`;

const StyledListItem = styled.li`
  list-style: none;

  a {
    padding: 0.5rem 0.8rem;
    display: inline-block;
    text-decoration: none;
    border-radius: 10px;
    color: var(--cor-grafite);
    width: 100%;

    &:hover {
      background-color: rgb(from var(--cor-grafite) r g b / 15%);
    }
  }

  a.active {
    color: var(--cor-primaria);
    background-color: rgb(from var(--cor-primaria) r g b / 15%);
    font-weight: 600;

    &:hover {
      background-color: rgb(from var(--cor-primaria) r g b / 25%);
    }
  }
`;

function NavOption({ to, onClick, children }) {
  return (
    <StyledListItem>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {children}
      </NavLink>
    </StyledListItem>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <div className="navigation-div">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Abrir menu de navegação"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
        </button>
        <Link to="/home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={fullLogo} alt="Logo" style={{ height: '2.25rem' }} />
        </Link>
        <nav className={menuOpen ? 'open' : ''} style={{ listStyle: 'none' }}>
          <NavOption to={'/home'} onClick={() => setMenuOpen(false)}>
            Início
          </NavOption>
          <NavOption
            to={'/minhas-ocorrencias'}
            onClick={() => setMenuOpen(false)}
          >
            Minhas Ocorrências
          </NavOption>
          <NavOption to={'/mural'} onClick={() => setMenuOpen(false)}>
            Mural
          </NavOption>
          <NavOption to={'/eventos'} onClick={() => setMenuOpen(false)}>
            Eventos
          </NavOption>
          <NavOption to={'/noticias'} onClick={() => setMenuOpen(false)}>
            Notícias
          </NavOption>
        </nav>
      </div>
      <div className="user-actions-div">
        <Button
          variant="secondary"
          onClick={() => navigate('/zelador/painel')}
          ariaLabel="Visão Zelador"
          style={{ fontSize: '0.825rem', padding: '0.5rem 0.85rem' }}
        >
          <i className="fa-solid fa-user-shield" />
          <span className="btn-label-hide-tablet">Visão Zelador</span>
        </Button>
        <Button
          variant="primary"
          ariaLabel="Registrar ocorrência"
          onClick={() => navigate('/ocorrencias/nova')}
        >
          <i className="fa-solid fa-plus" />
          <span className="btn-text-register">Registrar ocorrência</span>
        </Button>
        <Button
          variant="secondary"
          ariaLabel="Notificações"
          style={{ padding: '.4625rem' }}
        >
          <i className="fa-regular fa-bell" style={{ fontSize: '1.2rem' }} />
        </Button>
        <div className="profile">A</div>
      </div>
    </StyledHeader>
  );
}
