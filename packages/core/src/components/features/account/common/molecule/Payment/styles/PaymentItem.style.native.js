import styled from 'styled-components/native';

const PaymentContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const PaymentInfoContainer = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const PaymentInfo = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 4px;
`;

const TouchableLink = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 0.2;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const PaymentDetails = {
  flex: 1,
};

const PaymentType = styled.View`
  flex: 1.8;
`;

const PaymentWrapper = styled.View`
  height: 80px;
  flex: 1;
  flex-direction: row;
`;

const RecaptchaWrapper = styled.View`
  height: 170px;
  flex: 1;
`;

const RecaptchaContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  flex: 1;
`;

const CheckBalanceContainer = styled.View`
  height: 40px;
`;

export {
  PaymentContainer,
  PaymentType,
  PaymentInfoContainer,
  PaymentInfo,
  PaymentDetails,
  TouchableLink,
  RecaptchaContainer,
  RecaptchaWrapper,
  PaymentWrapper,
  CheckBalanceContainer,
};
