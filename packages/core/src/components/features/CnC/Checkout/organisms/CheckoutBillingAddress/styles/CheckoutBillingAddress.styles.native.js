import styled from 'styled-components/native';

const BillingAddWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SameAsShippingWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const CheckoutAddressWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

const AddressDropdownWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
export { BillingAddWrapper, SameAsShippingWrapper, CheckoutAddressWrapper, AddressDropdownWrapper };
