import styled from 'styled-components';

const ModalStyle = styled.div`
  .TCPModal__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${props => props.theme.colors.MODAL_OVERLAY};
    z-index: ${props => props.theme.zindex.zindex.zOverlay};
  }
  .TCPModal__InnerContent {
    background: ${props => props.theme.colors.WHITE};
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    ${props => props.theme.zindex.zindex.zModal}
  }
`;
export default ModalStyle;
