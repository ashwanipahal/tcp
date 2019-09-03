import styled, { css } from 'styled-components/native';

const FormStyle = css`
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const NavigationBar = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const NavTitle = styled.Text``;

const PickUpHeading = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs28};
  font-family: ${props => props.theme.typography.fonts.primary};
  color: ${props => props.theme.colors.TEXT.DARK};
`;

const PickupError = styled.View``;

const PickupContainer = styled.View`
  margin: 0px;
`;

const PickUpForm = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
`;

const SmsSignUpForm = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

const EmailSignupForm = styled.View`
  margin: 0px;
`;

const PickUpAlternateForm = styled.View`
  margin: 0px;
`;

const CheckBoxWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;
const CheckBoxColOne = styled.View`
  flex: 1;
`;
const CheckBoxColTwo = styled.View`
  flex: 8;
  align-items: flex-start;
  justify-content: flex-start;
`;
const CheckBoxTextWrapper = styled.View`
  flex-wrap: wrap;
`;
const CheckBoxSubWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;

export {
  FormStyle,
  Container,
  NavigationBar,
  NavTitle,
  PickupError,
  PickupContainer,
  PickUpForm,
  SmsSignUpForm,
  EmailSignupForm,
  PickUpAlternateForm,
  PickUpHeading,
  CheckBoxWrapper,
  CheckBoxTextWrapper,
  CheckBoxColOne,
  CheckBoxColTwo,
  CheckBoxSubWrapper,
  TextWrapper,
};
