import styled from 'styled-components/native';

const PaymentMethodHeader = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const PayPalTextContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { PaymentMethodHeader, PayPalTextContainer };
