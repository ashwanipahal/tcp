import styled from 'styled-components/native';

const Container = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const PaymentMethodWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;
export default { Container, PaymentMethodWrapper };
