import styled from 'styled-components';
import Button from '../common/Button';

const StyledFooterButton = styled(Button)`
  box-sizing: border-box;
  @media screen and (max-width: 1080px) {
    height: 80px;
    width: 100%;
    position: fixed;
    padding: 0;
    bottom: 0;
    left: 0;
  }
`;

const FooterButton = (props) => (
  <StyledFooterButton {...props}>{props.children}</StyledFooterButton>
);
export default FooterButton;
