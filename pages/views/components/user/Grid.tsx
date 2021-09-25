import styled from 'styled-components';

const StyledGrid = styled.div`
  width: 100%;
  background-color: gray;
`;

const Grid = ({ children, ...props }) => (
  <StyledGrid {...props}>{children}</StyledGrid>
);

export default Grid;
