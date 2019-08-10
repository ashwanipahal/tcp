import styled from 'styled-components/native';

const OuterContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 10px;
`;
const ProductName = styled.View``;
const ProductDesc = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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

const ProductSubDetails = styled.View`
  padding-top: 15px;
  flex: 1;
`;

const ImageStyle = styled.Image`
  width: 100px;
  height: 100px;
`;
const ProductSubDetailLabel = styled.View`
  min-width: 25%;
`;
const ProductListPrice = styled.View`
  padding-left: 5px;
`;
const EditButton = styled.View`
  align-items: flex-end;
  flex: 1;
`;

export {
  OuterContainer,
  ProductName,
  ProductDesc,
  ProductDescription,
  ImgWrapper,
  ImageStyle,
  ProductSubDetails,
  ProductSubDetailLabel,
  ProductListPrice,
  EditButton,
};
