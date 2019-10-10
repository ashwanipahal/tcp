import styled from 'styled-components';

const HideShowField = styled.View`
  position: absolute;
  right: 0;
  top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const CurrentPasswordWrapper = styled.View`
  position: relative;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

const NewPasswordWrapper = styled.View`
  position: relative;
`;

const ConfirmPasswordWrapper = styled.View`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const CancelWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;

const IconContainer = styled.View`
  position: absolute;
  right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  top: -${props => props.theme.spacing.ELEM_SPACING.SM};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
export {
  HideShowField,
  CurrentPasswordWrapper,
  NewPasswordWrapper,
  ConfirmPasswordWrapper,
  CancelWrapper,
  IconContainer,
};
