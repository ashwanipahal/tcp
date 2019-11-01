import styled from 'styled-components/native';

const CouponHeading = styled.View`
  align-items: center;
`;

const BarWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background-color: ${props => props.theme.colorPalette.white};
`;

const buttonStyle = {
  marginBottom: 49,
};

export { CouponHeading, BarWrapper, buttonStyle };
