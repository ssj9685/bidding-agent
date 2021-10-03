import styled from 'styled-components';

const StyledHeader = styled.div<any>`
  display: flex;
  z-index: 10;
  border-bottom: 1px solid lightgray;
  height: ${(props) => props.height};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || 'white'};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize || '1em'};
  @media screen and (max-width: 1080px) {
    position: fixed;
    top: 0;
    left: 0px;
    width: 100%;
    height: ${(props) => props.height || '80px'};
  }
`;

const Header = (props) => <StyledHeader {...props}>{props.title}</StyledHeader>;

export default Header;
