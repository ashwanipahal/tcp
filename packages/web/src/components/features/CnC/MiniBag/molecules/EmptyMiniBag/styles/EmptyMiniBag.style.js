import { css } from 'styled-components';

export default css`
  .createAccountWrapper {
    margin: 48px 0;
  }
  .continue-shopping {
    text-align: center;
    margin: 24px 0;
  }
  .logIn {
    &:hover {
      background: ${props => props.theme.colors.BUTTON[props.fill || 'BLUE'].HOVER};
    }
    height: 51px;
    width: 210px;
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
  }
  .accountText {
    text-align: center;
  }
  .createAccount {
    &:hover {
      background: ${props => props.theme.colors.BUTTON[props.fill || 'BLACK'].HOVER};
    }
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    height: 51px;
    width: 210px;
  }

  .continueShoppingText {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;
