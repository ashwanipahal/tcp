import styled from 'styled-components/native';

export const TitleView = styled.View`
  background: #ebf7ff;
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
`;

export const ItemView = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
`;

export const HeadingView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
  border-bottom-color: #c3c3c3;
  border-bottom-width: 1;
`;

export const SizeSelector = styled.TouchableOpacity`
  margin: 10px 12px;
  width: 54;
  height: 54;
  border-radius: 27;
  background-color: white;
  border: 1px solid #9b9b9b;
  align-items: center;
  justify-content: center;
`;

export const ShopBySizeViewWrapper = styled.View`
  margin: 20px 5px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PromoWrapper = styled.View`
  background: ${props => props.theme.colorPalette.primary.main};
  position: absolute;
  padding: 5px 30px;
  right: 65px;
  border-radius: 5px;
  top: 10px;
`;

export const ArrowIcon = styled.Image`
  width: 6px;
  height: 10px;
  position: absolute;
  right: 14px;
  top: 20px;
`;

export const ArrowBackIcon = styled.Image`
  width: 16px;
  height: 24px;
`;

export const TouchableOpacityArrow = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 10px;
  height: 60px;
  padding: 10px;
`;
