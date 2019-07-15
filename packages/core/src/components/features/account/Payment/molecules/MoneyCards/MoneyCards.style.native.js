import styled from 'styled-components/native';

const HeadingTextStyle = styled.Text`
  height: 44px;
  top: 15px;
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
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
};
