import styled from 'styled-components';

import { DamImage } from '../../atoms';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;

export const ImageGridContainer = styled.View`
  width: ${props => props.width};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ImageGridItem = styled(DamImage)`
  margin-bottom: ${props => props.gutter};
`;

export const Touchable = styled.TouchableOpacity``;

export default {
  ImageGridContainer,
  ImageGridItem,
  Wrapper,
  Touchable,
};
