import fullDarkLogo from '@/assets/logo-full-dark.png';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--cor-grafite);
  padding: 1rem 5rem;
  color: var(--cor-fundo);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.8rem;

  & > img {
    height: 2.25rem;
  }

  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 640px) {
    padding: 1.25rem 1.25rem;
    flex-direction: column;
    text-align: center;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <img src={fullDarkLogo} alt="Logo tema escuro" />
      <p>© 2026 Zeladoria do Bairro. Todos os direitos reservados.</p>
    </StyledFooter>
  );
}
