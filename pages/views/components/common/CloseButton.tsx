import styled from 'styled-components';

const CloseButton = styled.div<any>`
  position: absolute;
  top: 14px;
  right: 14px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  cursor: pointer;
  &:before,
  &:after {
    position: absolute;
    content: ' ';
    width: 1px;
    height: ${(props) => {
      const size = String(props.size);
      const matchedLength = size.match(/\d+/) as Array<string>;
      const matchedUnit = size.match(/\D+/) as Array<string>;
      let crossLength: string;
      let lengthUnit: string;
      if (matchedLength.length && matchedUnit.length) {
        crossLength = String(Number(matchedLength[0]) * Math.sqrt(2));
        lengthUnit = String(matchedUnit[0]);
        return crossLength + lengthUnit;
      } else {
        return '1em';
      }
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
