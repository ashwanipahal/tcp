import styled from 'styled-components/native';

const ShippingMethodHeading = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const ShippingMethodName = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export default { ShippingMethodHeading, ShippingMethodName };
