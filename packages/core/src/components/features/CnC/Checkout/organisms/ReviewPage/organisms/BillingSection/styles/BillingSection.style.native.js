import styled from 'styled-components';

export const Heading = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export const SubHeading = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const EditLink = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const PaymentMethod = styled.View`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const BillingAddress = styled.View`
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const CvvCode = styled.View`
  flex: 0.25;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const CvvTextboxStyle = {
  height: 72,
};

export const CVVInfo = styled.View`
  width: 15px;
  position: absolute;
  right: 0;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const PaymentMethodWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const PaymentMethodImage = styled.View`
  flex: 0.5;
`;
