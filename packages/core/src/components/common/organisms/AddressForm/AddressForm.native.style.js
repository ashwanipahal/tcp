import styled from 'styled-components/native';

const InputFieldPhoneNumber = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StateZipCodeContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const InputFieldHalf = styled.View`
  width: 48%;
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
  color: #1a1a1a;
  font-weight: ${props =>
    !props.isFocused
      ? props.theme.typography.fontWeights.regular
      : props.theme.typography.fontWeights.extrabold};
  margin-bottom: ${props => (props.isFocused ? props.theme.spacing.ELEM_SPACING.XXS : '0')};
`;

const AddAddressWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
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
  z-index: 9999;
  width: 100%;
`;

const AddressSecondWrapper = styled.View`
  margin-top: 0;
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
  AddAddressWrapper,
  GooglePlaceInputWrapper,
  AddressSecondWrapper,
};
