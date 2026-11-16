import { Link } from 'react-router';
import styled from 'styled-components';

const StyledAnchor = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  text-decoration: none;

  > div {
    border-radius: 10px;
    padding: 0.75rem;
  }

  &.primary {
    background-color: var(--cor-primaria);
    color: var(--cor-fundo);

    > div {
      background-color: rgb(from var(--cor-fundo) r g b / 20%);
      color: var(--cor-fundo);
    }
  }

  &.secondary {
    border: 1px solid var(--cor-borda);
    background-color: var(--cor-superficie);
    color: var(--cor-grafite);

    > div {
      background-color: rgb(from var(--cor-secundaria) r g b / 20%);
      color: var(--cor-secundaria);
    }
  }
`;

export default function ActionButton({ icon, text, href, variant }) {
  return (
    <StyledAnchor to={href} className={variant ?? 'secondary'}>
      <div>{icon}</div>
      <span>{text}</span>
    </StyledAnchor>
  );
}
