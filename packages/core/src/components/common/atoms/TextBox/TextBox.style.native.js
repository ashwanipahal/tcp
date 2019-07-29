import styled from 'styled-components/native';

const StyledTextBoxWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const StyledTextBox = styled.TextInput`
  border-bottom-color: ${props =>
    (props.error && props.theme.colorPalette.error) ||
    (props.enableSuccessCheck && props.theme.colorPalette.success) ||
    props.theme.colorPalette.gray[500]};
  border-bottom-width: 1px;
  height: 40px;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: 0;
`;

const StyledLabel = styled.Text`
  position: absolute;
  left: 0;
  top: ${props => (!props.isFocused ? props.theme.spacing.ELEM_SPACING.MED : '0')};
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

export {
  StyledTextBox,
  StyledLabel,
  StyledErrorIcon,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
  StyledSuccessIcon,
};
