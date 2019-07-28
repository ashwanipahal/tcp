import styled from 'styled-components/native';

export const TitleView = styled.View`
  background: ${props => props.theme.colorPalette.blue[50]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
`;

export const ItemView = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
`;

export const ItemViewWithHeading = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG} ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export const HeadingView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
  border-bottom-color: ${props => props.theme.colorPalette.gray[600]};
  border-bottom-width: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
`;

export const SizeSelector = styled.TouchableOpacity`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 54;
  height: 54;
  border-radius: 27;
  background-color: ${props => props.theme.colorPalette.white};
  border: 1px solid ${props => props.theme.colorPalette.text.hint};
  align-items: center;
  justify-content: center;
`;

export const ShopBySizeViewWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PromoWrapper = styled.View`
  background: ${props => props.theme.colorPalette.primary.main};
  border-radius: 5px;
  width: 150px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const ArrowBackIcon = styled.Image`
  width: 16px;
  height: 24px;
`;

export const TouchableOpacityArrow = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const PromoAndArrowView = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px 0 0;
`;
