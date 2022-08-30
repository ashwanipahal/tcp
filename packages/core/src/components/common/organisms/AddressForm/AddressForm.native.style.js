import styled from 'styled-components/native';

const InputFieldPhoneNumber = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StateZipCodeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CountryContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  height: 72px;
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

const AddAddressWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
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

const HiddenAddressLineWrapper = styled.View`
  margin-top: -${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const HiddenStateWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const OptionalAdressWrapper = styled.View`
  height: 72px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
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
  CountryContainer,
  AddAddressWrapper,
  GooglePlaceInputWrapper,
  OptionalAdressWrapper,
  HiddenAddressLineWrapper,
  HiddenStateWrapper,
};
