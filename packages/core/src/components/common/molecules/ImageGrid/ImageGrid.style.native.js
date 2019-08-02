import styled from 'styled-components';

import { Image } from '../../atoms';

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

export const ImageGridItem = styled(Image)`
  margin-bottom: ${props => props.gutter};
`;

export default { ImageGridContainer, ImageGridItem, Wrapper };
