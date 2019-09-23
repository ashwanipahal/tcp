import styled from 'styled-components/native';

const ImageSize = styled.Image`
  height: 60px;
  width: 60px;
`;

const RichTextWrapper = styled.View`
  height: 400px;
  font-size: 18px;
`;

const EarnExtraPointsTileImage = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { RichTextWrapper, ImageSize, EarnExtraPointsTileImage };
