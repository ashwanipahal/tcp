import styled from 'styled-components/native';
import { Image } from '../../../atoms';

export const Wrapper = styled.View`
  align-items: center;
  background-color: #ffffff;
  height: 300px;
  width: ${props => props.width};
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  tint-color: black;
`;

export const Touchable = styled.TouchableOpacity`
  right: 0;
  padding: 20px;
  position: absolute;
`;

export default {
  Wrapper,
  Container,
  StyledImage,
  Touchable,
};
