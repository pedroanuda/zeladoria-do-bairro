import styled from 'styled-components';
import fullDarkLogo from '@/assets/logo-full-dark.png';

const StyledFooter = styled.footer`
  background-color: var(--cor-grafite);
  padding: 1rem 5rem;
  color: var(--cor-fundo);

  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;

  & > img {
    height: 2.25rem;
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
