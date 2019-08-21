import styled from 'styled-components/native';

const OuterContainer = styled.View`
  flex-direction: row;
`;
const ProductName = styled.View``;
const ProductDesc = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ImageWrapper = styled.View`
  width: 120px;
`;
const ProductDescription = styled.View`
  flex: 2;
  flex-wrap: wrap;
  flex-direction: column;
  margin-left: 5px;
`;
const ImgWrapper = styled.View`
  flex: 1;
  align-items: center;
`;
const ImageBrandStyle = styled.Image`
  margin-top: 10px;
  width: 62px;
  height: 22px;
`;

const ImageGymBrandStyle = styled.Image`
  margin-top: 10px;
  width: 60px;
  height: 15px;
`;
const ImageStyle = styled.Image`
  width: 100px;
  height: 100px;
`;
const ProductSubDetails = styled.View`
  padding-top: 15px;
  flex: 1;
`;
const ProductSubDetailLabel = styled.View`
  min-width: 25%;
`;
export {
  OuterContainer,
  ProductName,
  ProductDesc,
  ImageWrapper,
  ProductDescription,
  ImgWrapper,
  ImageStyle,
  ImageBrandStyle,
  ImageGymBrandStyle,
  ProductSubDetails,
  ProductSubDetailLabel,
};
