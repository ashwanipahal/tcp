import styled from 'styled-components';
import theme from '@tcp/core/styles/themes/TCP';

const ModalStyle = styled.div`
  .TCPModal__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${theme.colors.MODAL_OVERLAY};
  }
  .TCPModal__InnerContent {
    background: ${theme.colors.WHITE};
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
  }
`;
export default ModalStyle;
