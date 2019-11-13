import styled from 'styled-components/native';

const CouponHeading = styled.View`
  align-items: center;
`;

const BarWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  background-color: ${props => props.theme.colorPalette.white};
`;

const buttonStyle = {
  marginBottom: 49,
  marginTop: 10,
};

const arrowStyle = {
  padding: 5,
};

export { CouponHeading, BarWrapper, buttonStyle, arrowStyle };
