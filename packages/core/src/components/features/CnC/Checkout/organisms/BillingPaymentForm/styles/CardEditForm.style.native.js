import styled from 'styled-components/native';

const SaveButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const BillingAddressWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

const CardDetailsWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const AddAddressWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

export {
  SaveButtonWrapper,
  CancelButtonWrapper,
  BillingAddressWrapper,
  CardDetailsWrapper,
  AddAddressWrapper,
};
