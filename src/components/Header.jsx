import { NavLink } from 'react-router';
import styled from 'styled-components';
import Button from './Button';
import fullLogo from '@/assets/logo-full.png';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--cor-superficie);
  padding: 1rem 5rem;
  border-bottom: 1px solid var(--cor-borda);
  position: sticky;
  top: 0;

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

function NavOption({ to, children }) {
  return (
    <StyledListItem>
      <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
        {children}
      </NavLink>
    </StyledListItem>
  );
}

export default function Header() {
  return (
    <StyledHeader>
      <div className="navigation-div">
        <img src={fullLogo} alt="Logo" />
        <nav>
          <NavOption to={'/home'}>Início</NavOption>
          <NavOption to={'/minhas-ocorrencias'}>Minhas Ocorrências</NavOption>
          <NavOption to={'/mural'}>Mural</NavOption>
        </nav>
      </div>
      <div className="user-actions-div">
        <Button variant="primary">
          <i className="fa-solid fa-plus" />
          Registrar ocorrência
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
