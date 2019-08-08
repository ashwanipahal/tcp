import styled from 'styled-components/native';

const PaymentContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const PaymentInfoContainer = styled.View`
  flex-direction: row;
  border: 1px solid green;
  margin-top: 8px;
`;

const PaymentInfo = styled.View`
  flex: 1;
  flex-direction: column;
  border: 1px solid green;
`;

const TouchableLink = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 0.3;
  margin-right: 10;
`;

const PaymentDetails = {
  flex: 1,
};

const PaymentType = styled.View`
  height: 90px;
  border: 1px solid red;
  flex: 1.7;
`;

export {
  PaymentContainer,
  PaymentType,
  PaymentInfoContainer,
  PaymentInfo,
  PaymentDetails,
  TouchableLink,
};
