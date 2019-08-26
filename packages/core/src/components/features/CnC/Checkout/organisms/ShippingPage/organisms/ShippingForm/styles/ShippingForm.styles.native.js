import styled from 'styled-components/native';

const EmailSignUpWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const EmailSignUpForm = styled.View`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ShippingFormWrapper = styled.View`
  display: flex;
`;

export { EmailSignUpWrapper, EmailSignUpForm, ShippingFormWrapper };
