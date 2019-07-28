import styled from 'styled-components/native';

export const ActionsWrapper = styled.View`
  display: flex;
  flex: 1;
`;

export const ButtonWrapper = styled.View`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
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
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.WHITE};
  font-size: ${props => props.theme.typography.fontSizes.fs13};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
`;

export default {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  ButtonText,
  CheckoutButton,
};
