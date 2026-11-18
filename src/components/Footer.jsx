import fullDarkLogo from '@/assets/logo-full-dark.png';
import { Link } from 'react-router';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--cor-grafite);
  padding: 1.35rem 5rem;
  color: var(--cor-fundo);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
  font-size: 0.82rem;

  .footer-brand {
    display: flex;
    align-items: center;

    img {
      height: 2.2rem;
    }
  }

  .footer-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    list-style: none;

    a {
      color: rgba(244, 246, 243, 0.78);
      text-decoration: none;

      &:hover {
        color: var(--cor-superficie);
      }
    }

    .academic-note {
      color: rgba(244, 246, 243, 0.52);
    }
  }

  @media (max-width: 1024px) {
    padding: 1.25rem 2rem;
  }

  @media (max-width: 640px) {
    padding: 1.25rem 1rem;
    flex-direction: column;
    text-align: center;

    .footer-nav {
      justify-content: center;
      gap: 1rem;
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Link to="/" className="footer-brand">
        <img src={fullDarkLogo} alt="Zeladoria do Bairro" />
      </Link>
      <ul className="footer-nav">
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/solucao">Como funciona</Link>
        </li>
        <li>
          <Link to="/impacto">Impacto e ODS</Link>
        </li>
        <li>
          <Link to="/equipe">Equipe</Link>
        </li>
        <li className="academic-note">Projeto acadêmico · 2026</li>
      </ul>
    </StyledFooter>
  );
}
