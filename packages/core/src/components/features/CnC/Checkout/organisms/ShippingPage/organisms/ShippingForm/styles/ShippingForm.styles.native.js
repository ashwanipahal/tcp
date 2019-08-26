import styled from 'styled-components/native';

const EmailSignUpWrapper = styled.View`
  display: flex;
  flex-direction:row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const EmailSignUpForm = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { EmailSignUpWrapper, EmailSignUpForm };
