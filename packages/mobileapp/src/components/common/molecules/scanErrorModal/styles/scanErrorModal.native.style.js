import styled from 'styled-components/native';
import { Image, BodyCopy, Button } from '@tcp/core/src/components/common/atoms';

export const Wrapper = styled.View`
  align-items: center;
  background-color: ${props => props.theme.colorPalette.white};
  height: 214px;
  width: ${props => props.width};
  padding: 12px;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled(Image)`
  margin-top: -15px;
  margin-right: -5px;
`;

export const StyledBodyCopy = styled(BodyCopy)`
  margin-top: ${props => props.marginTop};
`;

export const Touchable = styled.TouchableOpacity`
  right: 0;
  padding-top: 30px;
  padding-right: 20px;
  position: absolute;
`;

export const StyledButton = styled(Button)`
  margin-top: ${props => props.marginTop};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  margin-right: 12px;
`;

export const ShadowContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  height: ${props => props.height}px;
`;

export default {
  Wrapper,
  Container,
  StyledImage,
  Touchable,
  StyledBodyCopy,
  StyledButton,
  MessageContainer,
  ShadowContainer,
};
