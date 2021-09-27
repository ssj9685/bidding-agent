import styled from 'styled-components';

const CloseButton = styled.div<any>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  cursor: pointer;
  &:before,
  &:after {
    position: absolute;
    content: '.';
    width: 1px;
    height: ${(props) => {
      const crossLength = Number(props.size.match(/\d+/)[0]) * Math.sqrt(2);
      const lengthUnit = props.size.match(/\D+/)[0];
      return crossLength.toString() + lengthUnit;
    }};
    background-color: gray;
  }
  &:before {
    left: 0px;
    transform: rotate(-45deg);
    transform-origin: top left;
  }
  &:after {
    right: 0px;
    background-color: gray;
    transform: rotate(45deg);
    transform-origin: top right;
  }
`;

export default CloseButton;
