import styled from 'styled-components';

type Props = {
  height: string;
};

const SameHeight = styled.div<Props>`
  display: grid;
  grid-template-rows: ${(props) => props.height};
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 20px;
  }
`;

const ButtonInput = (props) => (
  <SameHeight height={props.height}>
    <input style={{ padding: 0 }} id={props.id} type={props.type} />
    <button style={{ padding: 0 }} onClick={props.onClick}>
      {props.title}
    </button>
  </SameHeight>
);

export default ButtonInput;
