import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background-color: var(--cor-primaria);
    color: var(--cor-fundo);

    &:hover {
      background-color: hsl(from var(--cor-primaria) h s calc(l - 8));
    }
  }

  &.secondary {
    background-color: var(--cor-superficie);
    color: var(--cor-grafite);
    border: 1px solid var(--cor-borda);

    &:hover {
      background-color: hsl(from var(--cor-superficie) h s calc(l - 8));
    }
  }
`;

/**
 * @typedef ButtonProps
 * @property {() => void} onClick - Função a ser executada quando o botão for clicado.
 * @property {'primary' | 'secondary'} variant - Define o estilo do botão. Pode ser 'primary', 'secondary'.
 * @property {string?} ariaLabel - Nome para acessibilidade.
 * @property {React.CSSProperties?} style - Estilos CSS
 */

/**
 * Botão personalizado da Zeladoria do Bairro!
 * @param {ButtonProps} props - Propriedades do botão.
 */
export default function Button({
  onClick,
  variant,
  ariaLabel,
  style,
  type = 'button',
  children,
}) {
  return (
    <StyledButton
      onClick={onClick}
      className={variant}
      type={type}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </StyledButton>
  );
}
