import styled from 'styled-components/native';

const CheckoutSectionTitleWrapper = styled.View`
  width: 100%;
`;

const CheckoutSectionTitle = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  /* margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED}; */
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-radius: 0.5px;
  border-bottom-width: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  border-bottom-color: ${props => props.theme.colorPalette.black};
`;

export { CheckoutSectionTitleWrapper, CheckoutSectionTitle };
