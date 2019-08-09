import styled from 'styled-components/native';

const PaymentContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const PaymentInfoContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
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
  margin-right: 10;
`;

const PaymentDetails = {
  flex: 1,
};

const PaymentType = styled.View`
  height: 90px;
  flex: 1.8;
`;

export {
  PaymentContainer,
  PaymentType,
  PaymentInfoContainer,
  PaymentInfo,
  PaymentDetails,
  TouchableLink,
};
