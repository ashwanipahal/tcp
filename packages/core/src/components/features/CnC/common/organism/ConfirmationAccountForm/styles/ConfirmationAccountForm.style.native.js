import styled, { css } from 'styled-components';

const Styles = css`
  padding: 2px;
`;

const ParentView = styled.View`
  margin: 28px;
`;

const ButtonWrapper = styled.View``;

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
  right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  top: -${props => props.theme.spacing.ELEM_SPACING.SM};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CheckBoxContainerView = styled.View`
  width: 100%;
  flex-direction: row;
`;

const CheckBoxImage = styled.View`
  width: 40px;
  height: 40px;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const CheckMessageView = styled.View`
  width: 80%;
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
  CheckBoxContainerView,
  CheckBoxImage,
  CheckMessageView,
};
