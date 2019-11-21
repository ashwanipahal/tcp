import styled, { css } from 'styled-components';

const Styles = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

const ParentView = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ButtonWrapper = styled.View``;

const AlreadyAccountWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const PasswordWrapper = styled.View`
  position: relative;
`;

const HideShowField = styled.View`
  position: absolute;
  right: 0;
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const ConfirmPasswordWrapper = styled.View`
  position: relative;
`;

const IconContainer = styled.View`
  position: absolute;
  right: ${props => props.theme.fonts.fontSize.anchor.medium / 2}px;
  top: 0px;
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CheckBoxContainerView = styled.View`
  width: 100%;
  flex-direction: row;
`;

const CheckBoxImage = styled.View`
  width: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
`;

const CheckMessageView = styled.View`
  width: 80%;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
`;

const FieldContainer = styled.View`
  margin-top: 12px;
`;

export {
  Styles,
  ParentView,
  ButtonWrapper,
  AlreadyAccountWrapper,
  PasswordWrapper,
  HideShowField,
  ConfirmPasswordWrapper,
  IconContainer,
  CheckBoxContainerView,
  CheckBoxImage,
  CheckMessageView,
  FieldContainer,
};
