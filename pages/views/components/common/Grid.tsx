import styled from 'styled-components';

const StyledGrid = styled.div<any>`
  display: grid;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height};
  grid-gap: ${(props) => props.gap};
  grid-auto-rows: 1fr;
  grid-template-rows: ${(props) => props.rows};
  grid-template-columns: ${(props) => props.columns};
  justify-content: ${(props) => props.justify};
  justify-items: center;
  align-items: ${(props) => props.align};
  background-color: ${(props) => props.gapColor};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  box-sizing: border-box;
  text-align: center;
  & > input {
    width: 80%;
  }
  & > select {
    width: 80%;
  }
`;

const Grid = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

export default Grid;
