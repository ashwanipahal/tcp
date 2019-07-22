import styled from 'styled-components/native';

export const SafeAreaViewStyle = styled.SafeAreaView`
  background: ${props => props.theme.colorPalette.white};
`;

export const Wrapper = styled.View`
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
  width: ${props => props.width || '9px'};
  height: ${props => props.width || '5px'};
  border-radius: ${props => props.borderRadius || 0};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  background-color: ${props => props.background || 'transparent'};
`;

export const RoundView = styled.View`
  ${props =>
    props.color === 'white'
      ? `
    background-color: ${props.theme.colorPalette.white};
          `
      : ''};
  ${props =>
    props.color === 'TCP-Gymboree'
      ? `
    background-color: ${props.theme.colorPalette.primary.dark};
          `
      : ''};
  width: ${props => props.width || '20px'};
  height: ${props => props.height || '20px'};
  border-radius: ${props => props.borderRadius || 10};
  position: absolute;
  margin-top: 14px;
`;

export const TextStyle = { position: 'absolute', marginTop: 18, paddingRight: 5.6 };

export const ImageColor = { tintColor: 'grey' };

export default {
  Wrapper,
  MessageContainer,
  StoreContainer,
  Icon,
  CartContainer,
  RoundView,
  SafeAreaViewStyle,
  TextStyle,
  ImageColor,
};
