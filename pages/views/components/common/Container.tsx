import styled from 'styled-components';

const StyledContainer = styled.div<any>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  padding: 16px;
  position: relative;
  min-height: 350px;
  box-sizing: border-box;
  @media screen and (max-width: 1080px) {
    width: 640px;
    margin: 0px;
  }
  @media screen and (max-width: 640px) {
    padding: 0px;
    padding-top: 80px;
    padding-bottom: 80px;
    margin: 0px;
  }
`;

const Container = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);

export default Container;
