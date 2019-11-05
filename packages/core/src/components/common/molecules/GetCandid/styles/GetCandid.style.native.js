import styled from 'styled-components';
import BodyCopy from '../../../atoms/BodyCopy';
import { Image } from '../../../atoms';

export const Wrapper = styled.View`
  display: flex;
  padding: 0 14px;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  margin: 16px 0 0;
`;

export const Title = styled(BodyCopy)`
  font-weight: ${props => props.theme.fonts.fontWeight.medium};
  margin-bottom: 12px;
`;

export const TitleDescription = styled.Text`
  flex-direction: row;
  justify-content: center;
`;

export const ImageGridItem = styled(Image)`
  ${props =>
    props.index === 1 || props.index === 4 || props.index === 7
      ? `
      margin: 0 19px 19px;
    `
      : `
      margin: 0 0 19px;
    `}
`;

export const Touchable = styled.TouchableOpacity``;

export default {
  ImageWrapper,
  ImageGridItem,
  Title,
  TitleDescription,
  Touchable,
  Wrapper,
};
