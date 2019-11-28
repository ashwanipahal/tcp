import styled from 'styled-components';

import { Image } from '../../atoms';

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  height: 40px;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  tint-color: #a0a0a0;
  width: 10px;
  height: 10px;
  margin: 15px 14px 10px 0;
`;

export const Touchable = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;

export const MessageContainer = styled.View`
  margin-right: 32px;
  height: 50px;
`;

export default {
  Wrapper,
  StyledImage,
  Touchable,
  MessageContainer,
};
