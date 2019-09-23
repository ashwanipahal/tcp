import styled from 'styled-components/native';

const ImageSize = styled.Image`
  height: 60px;
  width: 60px;
`;

const RichTextWrapper = styled.View`
  height: 200px;
`;

const ActivityModalTitleWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const EarnExtraPointsTileImage = styled.View`
  height: 60px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { RichTextWrapper, ImageSize, EarnExtraPointsTileImage, ActivityModalTitleWrapper };
