import styled from 'styled-components/native';
import { getPixelRatio } from '@tcp/core/src/utils/utils.app';

const managePromoConatinerView = marginRight => {
  if (getPixelRatio() === 'xxxhdpi' || getPixelRatio() === 'xhdpi') {
    return `width: 140px; margin-right:${marginRight - 15};`;
  }
  return `
  width: 150px;
  margin-right:${marginRight};
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
  ${props => managePromoConatinerView(props.marginRight)}
`;

export const ArrowIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const ItemView = styled.View`
  align-items: center;
  justify-content: center;
  max-width: ${props => props.maxWidth};
`;
