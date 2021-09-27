import styled from 'styled-components';

const StyledGrid = styled.div<any>`
  display: grid;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'fit-content'};
  grid-gap: ${(props) => props.gap};
  grid-template-rows: ${(props) => props.rows};
  grid-template-columns: ${(props) => props.columns};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  background-color: ${(props) => props.gapColor};
  border: ${(props) => props.border};
`;

const Grid = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

export default Grid;
