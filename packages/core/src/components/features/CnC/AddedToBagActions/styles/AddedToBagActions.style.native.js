import styled from 'styled-components/native';

const applyPositionClassStyle = `
  top: 0;
  position:absolute;
  height:100%;
  width:100%;
  z-index:997;
`;

export const ActionsWrapper = styled.View`
  ${props =>
    props.isPayPalWebViewEnable
      ? applyPositionClassStyle
      : `
    display: flex;
  `}
`;

export const ButtonWrapper = styled.View`
  ${props =>
    props.isPayPalWebViewEnable
      ? applyPositionClassStyle
      : `
    margin: 0 10px;
    display: flex;
    margin-top: 20px;
    flex-direction: ${props.isBothDisabled ? 'row' : 'column'};
`}
`;

export const ButtonViewWrapper = styled.View`
  ${props =>
    props.isPayPalWebViewEnable
      ? applyPositionClassStyle
      : `
  position: relative;
  bottom: ${props.isBottomGap ? '25px' : '0px'};
  `}
`;

export const ViewBagButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.PRIMARY.DARK};
  height: 42px;
  justify-content: center;
  align-items: center;
  margin: -5px 0 -5px;
`;

export const CheckoutButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.PRIMARY.BLUE};
  display: flex;

  height: 42px;
  justify-content: center;
  align-items: center;
  ${props =>
    props.isAddedTobag
      ? `
      margin: 0 0 16px;
      ${props.isHalf ? `flex: 1` : ``};
    `
      : `
      margin: 0 10px 16px;
      flex: ${props.isHalf ? `0.5` : `1`};
    `}
`;

export const PaymentsButtonWrapper = styled.View`
  margin: 0 ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  display: flex;
  flex: 0.5;
`;

export const PaypalPaymentsButtonWrapper = styled.View`
  display: flex;
  ${props => (props.isAddedTobag ? `` : `flex: 0.5`)};
  margin-left: ${props => (props.isAddedTobag ? '0' : '10px')};
  margin-right: ${props => (props.isAddedTobag && props.isPayPalEnabled ? '10px' : '0')};
`;

export const VenmoPaypalWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;

export default {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
  PaymentsButtonWrapper,
};
