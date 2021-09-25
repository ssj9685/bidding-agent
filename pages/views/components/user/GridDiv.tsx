import styled from 'styled-components';

type Props = {
  justify?: string;
  align?: string;
  rows?: string;
  columns?: string;
  gap?: string;
};

const StyledGrid = styled.div<Props>`
  display: grid;
  grid-gap: ${(props) => props.gap};
  grid-template-rows: ${(props) => props.rows};
  grid-template-columns: ${(props) => props.columns};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

const Grid = ({ children, ...props }) => (
  <StyledGrid {...props}>{children}</StyledGrid>
);

export default Grid;
