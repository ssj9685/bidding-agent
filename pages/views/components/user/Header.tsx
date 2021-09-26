import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: darkcyan;
  color: white;
  font-weight: bold;
`;

const Header = (props) => <StyledHeader>{props.title}</StyledHeader>;

export default Header;
