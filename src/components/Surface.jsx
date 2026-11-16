import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: var(--cor-superficie);
  border-radius: 10px;
  border: 1px solid var(--cor-borda);
`;

export default function Surface({ style, className, children }) {
  return (
    <StyledDiv style={style} className={className}>
      {children}
    </StyledDiv>
  );
}
