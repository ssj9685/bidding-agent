import styled from 'styled-components';

const StyledHeader = styled.div<any>`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
  height: ${(props) => props.height};
  align-items: center;
  justify-content: center;
  background-color: darkcyan;
  color: white;
  font-size: ${(props) => props.fontSize || '1.2em'};
  font-weight: bold;
  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`;

const Header = (props) => (
  <StyledHeader {...props}>
    <div>{props.title}</div>
  </StyledHeader>
);

export default Header;
