import styled from 'styled-components';

const Center = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => props.direction};
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor || 'white'};
`;

export default Center;
