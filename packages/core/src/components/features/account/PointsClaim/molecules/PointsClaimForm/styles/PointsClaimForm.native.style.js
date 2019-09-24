import styled from 'styled-components/native';

const InputFieldPhoneNumber = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StateZipCodeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 72px;
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
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
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

const FieldWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const ImageCaption = styled.View`
  background-color: ${props => props.theme.colorPalette.orange[800]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  color: #ffffff;
  width: 260px;
`;

const DropdownWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  width: 40%;
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

export {
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
  DropdownWrapper,
  ImageContainer,
  ImageCaption,
  FieldWrapper,
};
