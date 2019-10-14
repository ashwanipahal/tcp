import styled from 'styled-components/native';

const SaveButtonWrapper = styled.ScrollView``;
const AddAddressWrappers = styled.ScrollView``;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const BillingAddressWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardDetailsWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const AddAddressWrapper = styled.View``;
const ErrorMessageWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
export {
  SaveButtonWrapper,
  CancelButtonWrapper,
  BillingAddressWrapper,
  CardDetailsWrapper,
  AddAddressWrapper,
  ErrorMessageWrapper,
  AddAddressWrappers,
};
