import styled from 'styled-components';

const Button = styled.button<any>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor || 'orange'};
  color: ${(props) => props.color || 'white'};
  border: none;
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.fontSize || '1em'};
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export default Button;
