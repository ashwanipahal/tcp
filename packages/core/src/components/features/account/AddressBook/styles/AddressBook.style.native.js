import styled, { css } from 'styled-components/native';

const HeadingTextStyle = styled.Text`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: ${props => props.theme.typography.fontWeights.black};
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

const EmptyCCLabelStyle = styled.Text`
  flex-basis: 80%;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-weight: ${props => props.theme.typography.fontWeights.black};
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const DescriptionEmptyCCStyle = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ButtonWrapperStyle = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL}
    ${props => props.theme.spacing.ELEM_SPACING.XL} ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const ParentContainer = css`
  margin-bottom: 120px;
`;

const StyledHeading = styled.Text`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const UnderlineStyle = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const InputField = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XXXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  z-index: 1;
`;

const InputFieldHalf = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
const NoAddressWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const EmptyView = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const AddressFormView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NoAddressHeading = styled.View`
  padding: 0;
`;

const NoAddressBody = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0 0;
`;

const AddressTileWrapper = styled.View`
  display: flex;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  min-height: 158px;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
const AddressTileContext = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  min-height: 108px;
`;

const AddressTileHeading = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  flex-basis: 60%;
`;

const AddressLinks = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const AddressLinkLeftMargin = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const LeftMargin = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const AddAddressButton = {
  color: 'white',
  fontWeight: 'normal',
  opacity: 0.5,
  marginTop: 48,
};

const CancelButton = {
  fontWeight: 'normal',
  opacity: 0.5,
};

export {
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  NoAddressWrapper,
  NoAddressHeading,
  NoAddressBody,
  AddressTileWrapper,
  AddressTileContext,
  AddressTileHeading,
  AddressLinks,
  AddressLinkLeftMargin,
  LeftMargin,
  InputField,
  InputFieldHalf,
  EmptyView,
  AddressFormView,
  AddAddressButton,
  CancelButton,
};
