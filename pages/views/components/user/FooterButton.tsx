import styled from 'styled-components';

const StyledNextButton = styled.button`
  width: 100%;
  background-color: darkcyan;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 1em;
`;

const NextButton = (props) => (
  <StyledNextButton onClick={props.onClick}>{props.children}</StyledNextButton>
);
export default NextButton;
