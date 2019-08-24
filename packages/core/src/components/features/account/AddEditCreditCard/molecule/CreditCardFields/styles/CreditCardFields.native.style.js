import styled from 'styled-components';

const PaymentContainer = styled.View`
  flex: 1;
`;

const CardContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ExpiryContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ExpiryMonth = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const ExpiryYear = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const CardTextboxStyle = {
  height: 50,
};

export {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
  ExpiryMonth,
  ExpiryYear,
  CardTextboxStyle,
};
