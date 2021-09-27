import styled from 'styled-components';

const StyledContainer = styled.div<any>`
  position: relative;
  height: ${(props) => props.height || 'fit-content'};
  width: 1080px;
  @media screen and (max-width: 1080px) {
    width: 640px;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;

const Container = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);

export default Container;
