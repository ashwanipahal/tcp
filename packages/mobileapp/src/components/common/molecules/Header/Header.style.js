import styled from 'styled-components/native';

export const SafeAreaViewStyle = styled.SafeAreaView`
  background: ${props => props.theme.colorPalette.white};
`;

export const Container = styled.View`
  flex-direction: row;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  display: flex;
  background: ${props => props.theme.colorPalette.white};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const MessageContainer = styled.View`
  align-items: flex-start;
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  justify-content: space-between;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
export const BackgroundView = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  width: 22px;
  height: 22px;
  border-radius: 11;
  position: absolute;
  margin-top: 14px;
`;

export const RoundView = styled.View`
  background-color: ${props => props.theme.colorPalette.primary.dark};
  width: 20px;
  height: 20px;
  border-radius: 10;
  position: absolute;
  margin-top: 14px;
`;

export const CartIconView = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const TextStyle = {
  position: 'absolute',
  marginTop: 18,
  paddingRight: 5.6,
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

export default {
  Container,
  MessageContainer,
  StoreContainer,
  Icon,
  CartContainer,
  RoundView,
  SafeAreaViewStyle,
  TextStyle,
  BackgroundView,
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
};
