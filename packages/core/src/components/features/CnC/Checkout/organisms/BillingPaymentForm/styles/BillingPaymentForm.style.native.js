import styled from 'styled-components/native';

const AddNewCCWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const CvvCode = styled.View`
  flex: 0.25;
`;

const CvvTextboxStyle = {
  height: 72,
};

const CVVInfo = styled.View`
  width: 15px;
  position: absolute;
  right: 0;
`;
const BillingAddressWrapper = styled.View`
  right: 0;
  margin-left: 0px;
`;
const PaymentMethodWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const PaymentMethodHeader = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
const CardDetailHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;
const CardDetailEdit = styled.View`
  left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const SubHeader = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
const BillingAddressHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
const CreditCardHeader = styled.View`
  top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;
const CreditCardWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
const DefaultPaymentTextWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;
const PaymentMethodMainWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;
const PaymentMethodImage = styled.View`
  flex: 0.5;
`;
const DefaultPaymentWrapper = styled.View`
  margin-bottom: ${props => (props.isSpace ? props.theme.spacing.ELEM_SPACING.LRG : '0')};
  display: flex;
  flex-direction: row;
  margin-top: ${props => (props.isSpace ? props.theme.spacing.ELEM_SPACING.LRG : '0')};
`;
export {
  CvvCode,
  CvvTextboxStyle,
  CVVInfo,
  BillingAddressWrapper,
  PaymentMethodWrapper,
  PaymentMethodHeader,
  CardDetailHeader,
  CardDetailEdit,
  SubHeader,
  BillingAddressHeader,
  AddNewCCWrapper,
  CreditCardHeader,
  CreditCardWrapper,
  DefaultPaymentTextWrapper,
  PaymentMethodMainWrapper,
  PaymentMethodImage,
  DefaultPaymentWrapper,
};
