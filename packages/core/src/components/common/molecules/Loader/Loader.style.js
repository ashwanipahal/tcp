import styled from 'styled-components';

const LoaderLoyalty = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
`;

const loaderStyles = {
  LoaderLoyalty,
};

export default loaderStyles;
