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
`;

export const MessageContainer = styled.View`
  align-items: flex-start;
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  justify-content: space-between;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: 7px;
`;

export const CartContainer = styled.TouchableOpacity`
  align-items: flex-end;
  align-self: flex-end;
  flex-basis: 100%;
  margin-top: 5px;
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

export const TextStyle = { position: 'absolute', marginTop: 18, paddingRight: 5.6 };

export const ImageColor = { tintColor: 'gray' };

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
};
