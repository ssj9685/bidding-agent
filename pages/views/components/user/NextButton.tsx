import styled from 'styled-components';

const StyledNextButton = styled.button`
  width: 100%;
  height: 100px;
  background-color: blue;
  color: white;
  border: none;
  font-size: 1em;
  @media screen and (max-width: 500px) {
    height: 80px;
  }
`;

const NextButton = (props) => (
  <StyledNextButton onClick={props.onClick}>{props.children}</StyledNextButton>
);
export default NextButton;
