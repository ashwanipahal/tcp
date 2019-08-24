import styled from 'styled-components/native';

export const ButtonWrapper = styled.View`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const CheckoutButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.PRIMARY.BLUE};
  display: flex;
  flex: 1;
  height: 42px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export default {
  ButtonWrapper,
  CheckoutButton,
};
