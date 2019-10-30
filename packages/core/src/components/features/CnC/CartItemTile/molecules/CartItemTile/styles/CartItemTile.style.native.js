import styled from 'styled-components/native';

const MainWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const OuterContainer = styled.View`
  flex-direction: row;
  padding: ${props =>
    props.showOnReviewPage
      ? props.theme.spacing.APP_LAYOUT_SPACING.XXS
      : `${props.theme.spacing.APP_LAYOUT_SPACING.XXS} 0`};
  background-color: ${props => props.theme.colorPalette.white};
`;
const ToggleError = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
const UnavailableView = styled.View`
  display: flex;
  padding: 5px 2px 2px 14px;
  flex-direction: row;
`;
const ProductName = styled.View`
  width: ${props => (props.showOnReviewPage ? 'auto' : '66%')};
  flex-wrap: wrap;
`;
const ProductDesc = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ProductDescription = styled.View`
  flex-wrap: wrap;
  flex-direction: column;
  margin-left: 5px;
  width: 66%;
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
  margin-right: ${props =>
    props.showOnReviewPage ? `0` : props.theme.spacing.APP_LAYOUT_SPACING.XS};
  margin-left: ${props => (props.showOnReviewPage ? `0` : props.theme.spacing.ELEM_SPACING.XXS)};
  width: ${props => (props.showOnReviewPage ? `30%` : `auto`)};
  align-items: center;
`;

const ProductSubDetails = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
  margin-right: ${props => (props.showOnReviewPage ? props.theme.spacing.ELEM_SPACING.XXS : `0`)};
  min-width: ${props => (props.showOnReviewPage ? '10%' : 'auto')};
`;
const ProductListPrice = styled.View`
  padding-left: 5px;
`;
const EditButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-bottom-color: ${props => props.theme.colorPalette.gray[700]};
  border-bottom-width: 1px;
`;

const BtnWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  text-align: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const MarginLeft = styled.TouchableOpacity`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const IconTextEdit = styled.Text`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  color: ${props => props.theme.colorPalette.gray[800]};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
`;

const IconTextDelete = styled.Text`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  color: ${props => props.theme.colorPalette.red[500]};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
`;

const IconTextMoveToBag = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  color: ${props => props.theme.colorPalette.blue[700]};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  text-align: center;
  width: 52px;
`;

const HeartIcon = styled.TouchableOpacity`
  position: absolute;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  flex: 1;
`;

const SflIcons = styled.TouchableOpacity`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const IconHeight = '58px';
const IconWidth = '58px';

const ProductListPriceOnReview = styled.View`
  position: absolute;
  right: 0;
  top: 10px;
`;

const SizeQtyOnReview = styled.View`
  flex-direction: row;
  display: flex;
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
  UnavailableView,
  IconHeight,
  IconWidth,
  IconTextDelete,
  IconTextEdit,
  IconTextMoveToBag,
  HeartIcon,
  SflIcons,
  ProductListPriceOnReview,
  SizeQtyOnReview,
  ToggleError,
};
