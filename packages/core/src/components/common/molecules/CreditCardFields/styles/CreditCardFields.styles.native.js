import styled from 'styled-components';

const PaymentContainer = styled.View`
  flex: 1;
`;

const CardContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ExpiryContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  justify-content:space-between;
`;

const ExpiryMonth = styled.View`
  width:30%;
`;

const ExpiryYear = styled.View`
  width:30%;
`;

const CvvCode = styled.View`
width:30%;
padding-top: 12px;

`;

const CardTextboxStyle = {
  height: 72,
};

const CvvTextboxStyle = {
  height: 72,
};

export {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
  ExpiryMonth,
  ExpiryYear,
  CardTextboxStyle,
  CvvCode,
  CvvTextboxStyle
};
