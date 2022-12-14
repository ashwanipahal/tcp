import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImgWrapper = styled.View`
  flex-basis: 20%;
  height: 55px;
`;

const ImageStyle = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

const RichTextStyle = styled.View`
  flex-basis: 80%;
`;

const UnderlineStyle = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
`;

export {
  ParentContainerStyle,
  WrapperStyle,
  UnderlineStyle,
  ImgWrapper,
  ImageStyle,
  RichTextStyle,
};
