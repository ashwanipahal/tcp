import styled from 'styled-components';

const ConfirmPasswordWrapper = styled.View`
  position: relative;
`;

const PasswordWrapper = styled.View`
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

const ResetPasswordWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export {
  PasswordWrapper,
  ConfirmPasswordWrapper,
  ConfirmHideShowField,
  IconContainer,
  ResetPasswordWrapper,
};
