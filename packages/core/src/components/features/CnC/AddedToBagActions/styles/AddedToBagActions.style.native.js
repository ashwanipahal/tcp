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
  flex-direction: row;
  margin-top: 20px;
`}
`;

export const ButtonViewWrapper = styled.View`
  ${props =>
    props.isPayPalWebViewEnable
      ? applyPositionClassStyle
      : `
  position: relative;
  `}
`;

export const ViewBagButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.PRIMARY.DARK};
  display: flex;
  flex: 1;
  height: 42px;
  justify-content: center;
  align-items: center;
`;

export const CheckoutButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.PRIMARY.BLUE};
  display: flex;
  flex: 1;
  height: 42px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const PaymentsButtonWrapper = styled.View`
  margin: 0 ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  width: 150px;
`;

export default {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
  PaymentsButtonWrapper,
};
