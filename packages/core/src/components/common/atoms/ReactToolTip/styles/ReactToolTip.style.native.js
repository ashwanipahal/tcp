import styled from 'styled-components/native';

const TILE_SHADOW = `
  shadow-opacity: 0.15;
  shadow-radius: 2px;
  shadow-color: ${props => props.theme.colorPalette.black};
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const OutfitMainTileWrapper = styled.View`
  padding: ${props =>
    `${props.theme.spacing.ELEM_SPACING.XS} ${props.theme.spacing.ELEM_SPACING.MED} ${
      props.theme.spacing.ELEM_SPACING.XS
    }`};
  background-color: ${props => props.theme.colorPalette.gray[300]};
  ${props =>
    props.tooltipStyle
      ? `width: ${props.tooltipStyle.width}px;
        height: ${props.tooltipStyle.height}px;`
      : ''}
  ${TILE_SHADOW};
`;

export default OutfitMainTileWrapper;
