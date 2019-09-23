import styled from 'styled-components/native';

const BillingAddWrapper = styled.View`
  margin-bottom:${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SameAsShippingWrapper = styled.View`
margin-bottom:${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const CheckoutAddressWrapper = styled.View`
margin-bottom:${props => props.theme.spacing.ELEM_SPACING.XXXL};
`

export { BillingAddWrapper, SameAsShippingWrapper, CheckoutAddressWrapper };
