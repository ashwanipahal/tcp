import styled from 'styled-components';

export const RibbonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  ${props => (props.position === 'right' ? 'flex-end;' : 'flex-start')};
`;

export const RibbonContainer = styled.div`
  background: transparent url(${props => props.imgPath}) no-repeat 0 0;
  background-size: cover;
  right: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-bottom: 12px;
`;
