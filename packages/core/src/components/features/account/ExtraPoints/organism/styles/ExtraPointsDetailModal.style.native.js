import styled from 'styled-components/native';

const ImageSize = styled.Image`
  height: 60px;
  width: 60px;
`;

const RichTextWrapper = styled.View`
  min-height: 230px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  overflow: hidden;
`;

const ButtonWrapper = styled.View`
  width: 60%;
  margin: 0 auto;
`;

const EarnExtraPointsTileImage = styled.View`
  height: 60px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { RichTextWrapper, ImageSize, EarnExtraPointsTileImage, ButtonWrapper };
