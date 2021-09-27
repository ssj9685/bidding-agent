import styled from 'styled-components';

const StyledNextButton = styled.button<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height || '100%'};
  background-color: ${(props) => props.bgColor || 'darkcyan'};
  color: ${(props) => props.color || 'white'};
  border: none;
  font-weight: bold;
  font-size: ${(props) => props.fontSize || '1em'};
  cursor: pointer;
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
`;

const Button = (props) => (
  <StyledNextButton {...props}>{props.children}</StyledNextButton>
);
export default Button;
