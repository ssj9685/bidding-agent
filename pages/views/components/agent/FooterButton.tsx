import styled from 'styled-components';
import Grid from '../common/Grid';
import Button from '../common/Button';

const StyledFooter = styled.div`
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

const FooterButton = (props) => {
  return (
    <StyledFooter {...props}>
      <Grid height="100%" width="100%" columns="1fr 2fr">
        <Button bgColor="gray" onClick={props.onDecline}>
          거절
        </Button>
        <Button onClick={props.onAccept}>수락</Button>
      </Grid>
    </StyledFooter>
  );
};

export default FooterButton;
