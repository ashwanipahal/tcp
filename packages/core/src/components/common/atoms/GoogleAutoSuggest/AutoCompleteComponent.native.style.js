import styled from 'styled-components/native';
import colors from '@tcp/core/styles/themes/TCP/colors';
import Fonts from '@tcp/core/styles/themes/TCP/fonts';

const StyledLabel = styled.Text`
  position: absolute;
  left: 0;
  top: ${props => (!props.isFocused ? props.theme.spacing.ELEM_SPACING.MED : '0')};
  font-size: ${props =>
    !props.isFocused
      ? props.theme.typography.fontSizes.fs14
      : props.theme.typography.fontSizes.fs10};
  color: ${props => props.theme.colors.PRIMARY.DARK};
  font-weight: ${props =>
    !props.isFocused
      ? props.theme.typography.fontWeights.regular
      : props.theme.typography.fontWeights.extrabold};
  margin-bottom: ${props => (props.isFocused ? props.theme.spacing.ELEM_SPACING.XXS : '0')};
`;

const Container = styled.View`
  position: absolute;
  width: 100%;
  z-index: 99;
`;

const textInput = {
  borderBottomWidth: 1,
  borderBottomColor: `${colors.FOOTER.DIVIDER}`,
  height: 40,
  paddingTop: 16,
  paddingBottom: 0,
};

const textInputContainer = {
  width: '100%',
};

const description = {
  fontWeight: `${Fonts.fontWeight.bold}`,
};

const listView = {
  zIndex: 3,
  backgroundColor: `${colors.WHITE}`,
  opacity: 1,
};

const separator = {
  padding: 2,
  borderBottomWidth: 1,
  borderBottomColor: `${colors.FOOTER.DIVIDER}`,
};

const poweredContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
};

export {
  StyledLabel,
  Container,
  textInput,
  textInputContainer,
  description,
  listView,
  separator,
  poweredContainer,
};
