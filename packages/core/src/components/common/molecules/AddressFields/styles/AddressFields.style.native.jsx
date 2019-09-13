import styled from 'styled-components/native';

const InputFieldPhoneNumber = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StateZipCodeContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const InputFieldHalf = styled.View`
  width: 48%;
  margin-top: ${props => (props.zipCode ? props.theme.spacing.ELEM_SPACING.SM : 0)};
`;

const Separator = styled.View`
  width: 4%;
`;

const SaveButtonWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SetDefaultShippingWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const StyledLabel = styled.Text`
  position: absolute;
  left: 0;
  top: ${props => (!props.isFocused ? props.theme.spacing.ELEM_SPACING.MED : '0')};
  font-size: ${props =>
    !props.isFocused
      ? props.theme.typography.fontSizes.fs14
      : props.theme.typography.fontSizes.fs10};
  color: ${props => props.theme.colorPalette.gray[900]};
  font-weight: ${props =>
    !props.isFocused
      ? props.theme.typography.fontWeights.regular
      : props.theme.typography.fontWeights.extrabold};
  margin-bottom: ${props => (props.isFocused ? props.theme.spacing.ELEM_SPACING.XXS : '0')};
`;

const EmptyView = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const dropDownStyle = {
  height: 41,
  border: 1,
};
const itemStyle = {
  height: 41,
  paddingLeft: 6,
  color: 'black',
};

// https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/379#issuecomment-457845834
const GooglePlaceInputWrapper = styled.View`
  width: 100%;
`;

const AddressSecondWrapper = styled.View`
  height: 72px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const HiddenAddressLineWrapper = styled.View`
  margin-top: -${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export {
  EmptyView,
  SaveButtonWrapper,
  CancelButtonWrapper,
  dropDownStyle,
  itemStyle,
  InputFieldHalf,
  InputFieldPhoneNumber,
  StateZipCodeContainer,
  Separator,
  SetDefaultShippingWrapper,
  StyledLabel,
  GooglePlaceInputWrapper,
  AddressSecondWrapper,
  HiddenAddressLineWrapper,
};
