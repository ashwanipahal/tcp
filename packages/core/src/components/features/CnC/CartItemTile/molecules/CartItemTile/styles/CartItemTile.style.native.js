import styled from 'styled-components/native';

const MainWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const OuterContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  background-color: ${props => props.theme.colorPalette.white};
`;
const ProductName = styled.View``;
const ProductDesc = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ProductDescription = styled.View`
  flex-wrap: wrap;
  flex-direction: column;
  margin-left: 5px;
  width: 70%;
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
const ImgWrapper = styled.View`
  width: 30%;
  align-items: center;
`;

const ProductSubDetails = styled.View`
  padding-top: 15px;
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
const EditButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-bottom-color: ${props => props.theme.colorPalette.gray[700]};
  border-bottom-width: 1px;
`;

const BtnWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const MarginLeft = styled.TouchableOpacity`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
  MainWrapper,
  BtnWrapper,
  MarginLeft,
};
