import styled from 'styled-components';

import { Image } from '../../atoms';

export const ImageGridContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ImageGridItem = styled(Image)`
  margin-bottom: 18px;
`;

export default { ImageGridContainer, ImageGridItem };
