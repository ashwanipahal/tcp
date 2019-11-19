import styled from 'styled-components/native';
import { Image, BodyCopy, Button, Anchor } from '../../../atoms';

export const Wrapper = styled.View`
  align-items: center;
  background-color: #ffffff;
  height: 280px;
  width: ${props => props.width};
  padding: 12px;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  tint-color: black;
  ${props => (props.marginTop ? `margin-top: ${props.marginTop}` : ``)};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  ${props => (props.marginTop ? `margin-top: ${props.marginTop}` : ``)};
`;

export const Touchable = styled.TouchableOpacity`
  right: 0;
  padding-top: 30px;
  padding-right: 20px;
  position: absolute;
`;

export const StyledButton = styled(Button)`
  ${props => (props.marginTop ? `margin-top: ${props.marginTop}` : ``)};
`;

export const StyledAnchor = styled(Anchor)`
  ${props => (props.marginTop ? `margin-top: ${props.marginTop}` : ``)};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  margin-right: 12px;
`;

export default {
  Wrapper,
  Container,
  StyledImage,
  Touchable,
  StyledBodyCopy,
  StyledButton,
  StyledAnchor,
  MessageContainer,
};
