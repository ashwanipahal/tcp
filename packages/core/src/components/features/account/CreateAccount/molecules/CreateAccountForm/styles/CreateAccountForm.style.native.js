import styled, { css } from 'styled-components';

const Styles = css`
  padding: 2px;
`;

const ParentView = styled.View`
  margin: 28px;
`;

const ButtonWrapper = styled.View`
  padding-top: 32px;
`;

const AlreadyAccountWrapper = styled.View`
  padding-top: 16px;
`;

const PasswordWrapper = styled.View`
  position: relative;
`;

const HideShowField = styled.View`
  position: absolute;
  right: 0;
  top: 16px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const ConfirmPasswordWrapper = styled.View`
  position: relative;
`;

const ConfirmHideShowField = styled.View`
  position: absolute;
  right: 0;
  top: 16px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

export {
  Styles,
  ParentView,
  ButtonWrapper,
  AlreadyAccountWrapper,
  PasswordWrapper,
  HideShowField,
  ConfirmPasswordWrapper,
  ConfirmHideShowField,
};
