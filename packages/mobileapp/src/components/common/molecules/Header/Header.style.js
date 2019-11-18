import styled from 'styled-components/native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';

const colorPallete = createThemeColorPalette();

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

const cartItemsWidth = cartItems => {
  let width = '';
  switch (cartItems.toString().length) {
    case 2:
      width = '20px';
      break;
    case 3:
      width = '25px';
      break;
    default:
      width = '15px';
  }
  return width;
};

export const SafeAreaViewStyle = styled.View`
  background: ${props => props.theme.colorPalette.white};
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SearchContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  display: flex;
  background: ${props => props.theme.colorPalette.white};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const MessageContainer = styled.View`
  ${props => (props.position === 'store' ? `flex-direction: row;` : null)};
  align-items: flex-start;
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  justify-content: space-between;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const BackContainer = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 60%;
  position: absolute;
`;

export const CartContainer = styled.View`
  align-items: flex-end;
  align-self: flex-end;
  flex-basis: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const StoreContainer = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Icon = styled.Image`
  width: 9px;
  height: 5px;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const RoundView = styled.View`
  ${setBackground}
  width: ${props => cartItemsWidth(props.cartVal ? props.cartVal : 0)};
  height: 15px;
  border-radius: 8;
  margin: 2px;
`;

export const RoundCircle = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  width: ${props => cartItemsWidth(props.cartVal ? props.cartVal : 0)};
  height: 20px;
  border-radius: 10;
  position: absolute;
  margin-top: 15px;
`;

export const CartIconView = styled.Image`
  margin-right: ${props =>
    props.cartVal.toString().length === 1 ? 0 : props.theme.spacing.ELEM_SPACING.XXS};
`;

export const TextStyle = {
  paddingLeft: 4,
  paddingTop: 1.5,
};

export const ImageColor = {
  tintColor: 'gray',
};

export const HeaderPromoContainer = styled.View`
  height: 45px;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const Touchable = styled.TouchableOpacity`
  align-items: flex-end;
  align-self: flex-end;
  width: 45px;
`;

export const CheckoutHeaderContainer = styled.View`
  flex-direction: row;
  display: flex;
  background: ${props => props.theme.colorPalette.white};
`;

export const CheckoutHeaderTextSection = styled.View`
  height: 54px;
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-color: ${props => props.theme.colorPalette.gray[500]};
  border-bottom-width: 1;
`;

export const BackIcon = styled.Image`
  width: 10px;
  height: 18px;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const BrandIcon = styled.Image`
  width: 90px;
  height: 35px;
`;

export const BrandIconSection = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  border-bottom-color: ${props => props.theme.colorPalette.gray[500]};
  border-bottom-width: 1;
  height: 54px;
`;

export const BackIconTouchable = styled.TouchableOpacity`
  width: 45px;
`;

export const CloseIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const CloseIconTouchable = styled.TouchableOpacity`
  width: auto;
`;

export const CloseContainer = styled.View`
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  justify-content: space-between;
  right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  top: 20px;
`;

export const BagPageContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const LeftSection = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 20%;
  height: 100%;
`;

export const ArrowBackIcon = styled.Image`
  width: 10px;
  height: 18px;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

export const MiddleSection = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TitleText = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  line-height: 14.5;
  margin-left: 120px;
`;

export const headerStyle = {
  backgroundColor: colorPallete.white,
};

export default {
  BackContainer,
  Container,
  MessageContainer,
  StoreContainer,
  Icon,
  CartContainer,
  RoundView,
  TextStyle,
  CartIconView,
  ImageColor,
  HeaderPromoContainer,
  Touchable,
  CheckoutHeaderContainer,
  CheckoutHeaderTextSection,
  BackIcon,
  BackIconTouchable,
  BrandIconSection,
  CloseIconTouchable,
  CloseIcon,
  CloseContainer,
  BagPageContainer,
  LeftSection,
  MiddleSection,
  TitleText,
  SafeAreaViewStyle,
  headerStyle,
};
