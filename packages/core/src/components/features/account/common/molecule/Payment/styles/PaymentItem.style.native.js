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
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
  justify-content: flex-start;
  align-items: flex-start;
`;

const RecaptchaWrapper = styled.View`
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  flex: 1;
`;

const RecaptchaContainer = styled.View`
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  flex: 1;
`;

const CheckBalanceContainer = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
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
