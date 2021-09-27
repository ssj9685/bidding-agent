import styled from 'styled-components';

const Center = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || 'white'};
  padding: 8px;
`;

export default Center;
