import styled from 'styled-components/native';

import { Button as ButtonAtom } from '../../atoms';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ButtonWrapper = styled.View`
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
  border-right-width: ${props => (props.noRightBorder ? 0 : '1px')};
  border-right-color: ${props => props.theme.colorPalette.gray[500]};
`;

export const Button = styled(ButtonAtom)``;

export default {
  Wrapper,
  ButtonWrapper,
  Button: ButtonAtom,
};
