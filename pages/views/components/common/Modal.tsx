import styled from 'styled-components';
import CloseButton from './CloseButton';

const StyledModal = styled.div<any>`
  display: ${(prop) => (prop.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
`;

const ModalWrapper = styled.div<any>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100px;
  background-color: white;
  border-radius: 1em;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;

const Modal = (props) => {
  const visibleState = props.title?.length ? true : false;
  return (
    <StyledModal visible={visibleState}>
      <ModalWrapper>
        <CloseButton size="16px" onClick={props.onClose}></CloseButton>
        {props.title}
      </ModalWrapper>
    </StyledModal>
  );
};
export default Modal;
