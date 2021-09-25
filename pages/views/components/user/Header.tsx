import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: center;
  background-color: #4400ff;
  height: 100px;
  color: white;
  @media screen and (max-width: 500px) {
    height: 80px;
  }
`;

const Header = (props) => <StyledHeader>{props.title}</StyledHeader>;

export default Header;
