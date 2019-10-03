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
  justify-content: ${props => (props.showCvv ? 'space-between' : 'flex-start')};
`;

const ExpiryMonth = styled.View`
  width: 30%;
`;

const ExpiryYear = styled.View`
  width: 30%;
`;

const CvvCode = styled.View`
  width: 30%;
  padding-top: 12px;
`;

const HiddenExpiryWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardTextboxStyle = {
  height: 72,
};

const CvvTextboxStyle = {
  height: 72,
};

const CVVInfo = styled.View`
  width: 15px;
  position: absolute;
  right: 0;
  top: 25px;
`;

const StyledImageWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 0px;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-top: 6px;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
  ExpiryMonth,
  ExpiryYear,
  CardTextboxStyle,
  CvvCode,
  CvvTextboxStyle,
  HiddenExpiryWrapper,
  CVVInfo,
  StyledImageWrapper,
};
