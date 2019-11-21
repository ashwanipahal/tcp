import styled from 'styled-components/native';
import { getPixelRatio } from '@tcp/core/src/utils/utils.app';

/**
 * @function managePromoConatinerView to manage the view according to the device PixelRatio.
 */
const managePromoConatinerView = marginRight => {
  if (getPixelRatio() === 'xxxhdpi' || getPixelRatio() === 'xhdpi') {
    return `margin-right:${marginRight - 20};`;
  }
  return `
  margin-right:${marginRight - 10};
  `;
};

export const PromoAndArrowContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px 0 0;
`;

export const PromoContainer = styled.View`
  background: ${props => props.theme.colorPalette.primary.main};
  border-radius: ${props => (props.theme.isGymboree ? `20px` : `5px`)};
  height: 30px;
  align-items: center;
  justify-content: center;
  width: 140px;
  ${props => managePromoConatinerView(props.marginRight)}
`;

export const ArrowIcon = styled.Image`
  width: 6px;
  height: 10px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  /* stylelint-disable-next-line */
  tint-color: ${props => props.theme.colorPalette.gray[600]};
`;

export const ItemView = styled.View`
  align-items: center;
  justify-content: center;
  max-width: ${props => props.maxWidth};
`;
