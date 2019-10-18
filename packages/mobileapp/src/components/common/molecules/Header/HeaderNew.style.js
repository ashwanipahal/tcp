import styled from 'styled-components/native';
import { isAndroid } from '@tcp/core/src/utils/utils.app';

const setBackground = props => {
  if (props.theme.isGymboree) {
    return `
    background-color: ${props.theme.colorPalette.orange[900]};
    `;
  }
  return `
  background-color: ${props.theme.colorPalette.blue[800]};
  `;
};

const getAdditionalStyle = props => {
  const { theme, showSearch } = props;
  const headerHeight = showSearch
    ? theme.spacing.LAYOUT_SPACING.LRGS
    : theme.spacing.LAYOUT_SPACING.LRG;

  return {
    ...(isAndroid() && { height: headerHeight }),
  };
};

const cartItemsWidth = cartItems => {
  let width = '';
  switch (cartItems.toString().length) {
    case 2:
      width = '25px';
      break;
    case 3:
      width = '30px';
      break;
    default:
      width = '20px';
  }
  return width;
};

const getSafeAreaStyle = props => {
  const { theme } = props;
  return `
  background: ${theme.colorPalette.white};
  border-bottom-color: ${theme.colorPalette.gray[500]};
  border-bottom-width: 1;
  `;
};

export const SafeAreaViewStyle = styled.SafeAreaView`
  ${getSafeAreaStyle}
  ${getAdditionalStyle}
`;

export const Container = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const CartCountContainer = styled.View`
  ${setBackground}
  width: ${props => cartItemsWidth(props.cartVal ? props.cartVal : 0)};
  height: 22px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  border: 2px solid white;
`;

export const CartIconView = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  height: 36;
`;

export const LeftSection = styled.View`
  justify-content: center;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 20%;
  height: 100%;
`;
export const MiddleSection = styled.View`
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;
export const RightSection = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  height: 100%;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const TitleText = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  line-height: 14.5;
`;
