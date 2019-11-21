import styled from 'styled-components/native';

const AddressFieldsWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const SaveToAccountWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  flex-direction: row;
`;

const MarginBottom = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const AddressViewWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const EditAddressFormHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const EditFromSeparator = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-bottom-width: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  border-bottom-color: ${props => props.theme.colorPalette.black};
`;

const ErrorMessageWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export {
  AddressFieldsWrapper,
  SaveToAccountWrapper,
  MarginBottom,
  AddressViewWrapper,
  EditAddressFormHeader,
  EditFromSeparator,
  ErrorMessageWrapper,
};
