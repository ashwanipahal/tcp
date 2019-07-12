import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css``;

const HeadingTextStyle = styled.Text`
  height: 44px;
  top: 15px;
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImageStyle = styled.Image`
  width: 75px;
  height: 55px;
`;

const EmptyCCLabelStyle = styled.Text`
  width: 270px;
  height: 55px;
  top: 10px;
`;

const DescriptionEmptyCCStyle = styled.Text`
  padding-top: 5px;
`;

const ButtonWrapperStyle = styled.View`
  padding-top: 5px;
`;

export {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
};
