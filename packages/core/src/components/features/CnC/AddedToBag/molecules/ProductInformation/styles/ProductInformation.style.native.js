import styled from 'styled-components/native';

const OuterContainer = styled.View`
  flex-direction: row;
`;
const ProductName = styled.Text`
  padding: 5px;
`;
const ProductDesc = styled.View`
  flex-direction: row;
`;
const ImageWrapper = styled.View`
  width: 120px;
`;
const ProductDescription = styled.View`
  width: 203px;
`;
const ImgWrapper = styled.View`
  flex-basis: 20%;
`;

const ImageStyle = styled.Image`
  width: 100px;
  height: 100px;
`;
export {
  OuterContainer,
  ProductName,
  ProductDesc,
  ImageWrapper,
  ProductDescription,
  ImgWrapper,
  ImageStyle,
};
