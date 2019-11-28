import styled from 'styled-components/native';
import { Button } from '@tcp/core/src/components/common/atoms';

export const HeaderPromoContainer = styled.View`
  height: 45px;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
`;

export const TextComponent = styled.Text`
  color: ${props => props.theme.colorPalette.gray['900']};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  font-weight: bold;
  margin: 0 auto 5px;
`;

export const TextInputComponent = styled.TextInput`
  height: 40px;
  border: 1px solid ${props => props.theme.colorPalette.gray['500']};
  border-radius: 3px;
  color: ${props => props.theme.colorPalette.gray['900']};
  width: 300px;
  margin: 0 auto;
  padding: 5px;
`;

export const ButtonComponent = styled(Button)`
  margin: 10px auto;
`;
export default {
  HeaderPromoContainer,
  TextComponent,
  TextInputComponent,
  ButtonComponent,
};
