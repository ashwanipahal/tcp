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

const HideShowFieldStyle = props =>
  `
  width:${props.theme.spacing.ELEM_SPACING.XL};
  background: ${props.theme.colorPalette.white};
  height:18px; /* 18px not available in spacing variable*/
  position: absolute;
  right: 0;
  top:18px; /* 18px not available in spacing variable */
  border-bottom-width: 1px;
  border-bottom-color: black;
  `;

const ConfirmHideShowField = styled.View`
  ${HideShowFieldStyle}
`;

const IconContainer = styled.View`
  position: absolute;
  right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
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
  IconContainer,
};
