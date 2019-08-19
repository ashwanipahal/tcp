import styled from 'styled-components/native';

const AddressFormView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputField = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XXXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  z-index: 1;
`;

const CtaView = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputFieldHalf = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
  color: 'black',
};

const EmptyView = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const dropDownStyle = {
  height: 42,
  border: 1,
};

const itemStyle = {
  height: 49,
};

export {
  AddressFormView,
  InputField,
  AddAddressButton,
  CancelButton,
  EmptyView,
  CtaView,
  dropDownStyle,
  itemStyle,
  InputFieldHalf,
};
