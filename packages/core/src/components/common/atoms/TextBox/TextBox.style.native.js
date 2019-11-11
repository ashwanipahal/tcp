import styled, { css } from 'styled-components/native';

const StyledTextBoxWrapper = styled.View`
  margin-bottom: ${props => (props.marginBottom ? props.theme.spacing.ELEM_SPACING.XL : 0)};
`;

const getInputBottomColor = props => {
  const { theme, meta } = props;
  const { colorPalette } = theme;
  const { dirty, error } = meta;
  const borderColor = dirty && error !== undefined ? colorPalette.error : colorPalette.gray[500];
  return `
  border-bottom-color: ${borderColor};
  `;
};

const TextBoxStyle = css`
  ${getInputBottomColor};
`;

const StyledTextBox = styled.TextInput`
  border-bottom-width: 1px;
  height: 40px;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: 0;
  padding-left: 0;
`;

const StyledLabel = styled.Text`
  position: absolute;
  left: 0;
  top: ${props => (!props.isFocused ? props.theme.spacing.ELEM_SPACING.MED : '0')};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props =>
    !props.isFocused
      ? props.theme.typography.fontSizes.fs14
      : props.theme.typography.fontSizes.fs10};
  color: #1a1a1a;
  font-weight: ${props =>
    !props.isFocused
      ? props.theme.typography.fontWeights.regular
      : props.theme.typography.fontWeights.extrabold};
  margin-bottom: ${props => (props.isFocused ? props.theme.spacing.ELEM_SPACING.XXS : '0')};
`;

const StyledErrorIcon = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

const StyledSuccessCheck = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const StyledErrorWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledSuccessIcon = styled.View`
  position: absolute;
  right: 0;
  top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const HiddenView = styled.View`
  display: none;
`;

export {
  TextBoxStyle,
  StyledTextBox,
  StyledLabel,
  StyledErrorIcon,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
  StyledSuccessIcon,
  HiddenView,
  StyledSuccessCheck,
};
