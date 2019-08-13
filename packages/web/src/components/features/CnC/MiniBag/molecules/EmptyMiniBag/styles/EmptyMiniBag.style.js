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
      background: ${props => props.theme.colors.PRIMARY.BLUE};
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
      background: ${props => props.theme.colors.PRIMARY.DARK};
    }
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    height: 51px;
    width: 210px;
  }
`;
