import styled from 'styled-components';

const ModalStyle = styled.div`
  .TCPModal__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .TCPModal__InnerContent {
    background: rgb(255, 255, 255);
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
  }
`;
export default ModalStyle;
