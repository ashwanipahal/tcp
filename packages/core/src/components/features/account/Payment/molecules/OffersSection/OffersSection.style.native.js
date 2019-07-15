import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css`
  padding: 20px 0;
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImgWrapper = styled.View`
  width: 75px;
  height: 55px;
`;

const ImageStyle = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

const RichTextStyle = styled.View`
  width: 270px;
  height: 55px;
  top: 15px;
`;

const UnderlineStyle = styled.View`
  height: 3px;
  background-color: black;
`;

export {
  ParentContainerStyle,
  WrapperStyle,
  UnderlineStyle,
  ImgWrapper,
  ImageStyle,
  RichTextStyle,
};
