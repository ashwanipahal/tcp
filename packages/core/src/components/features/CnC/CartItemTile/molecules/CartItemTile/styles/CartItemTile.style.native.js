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
const SoldOutLabel = styled.View`
  height: 18px;
  background-color: ${props => props.theme.colorPalette.red[500]};
  color: ${props => props.theme.colorPalette.white};
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  align-items: center;
  width: 100px;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  display: flex;
  justify-content: center;
`;
const ImageSoldOutContainer = styled.View`
  flex: 1;
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
  ImageBrandStyle,
  ImageGymBrandStyle,
  SoldOutLabel,
  ImageSoldOutContainer,
};
