import styled from 'styled-components';
import { Image } from '../../../atoms';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  padding: 0 14px;
  margin: 32px 0;
`;

export const ImageGridItem = styled(Image)`
  margin: 10px 5px;
`;

export const Touchable = styled.TouchableOpacity``;

export default {
  ImageGridItem,
  Wrapper,
  Touchable
};
