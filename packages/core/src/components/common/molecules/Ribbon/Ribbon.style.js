import styled from 'styled-components';
import { PromoBanner } from '..';

export const RibbonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  ${props => (props.position === 'right' ? 'flex-end;' : 'flex-start')};
`;

export const RibbonPromoBanner = styled(PromoBanner)`
  .style1 {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs36};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    color: ${props => props.theme.colorPalette.white};
  }
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
