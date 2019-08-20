import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    overflow: hidden;
    @media ${props => props.theme.mediaQuery.medium} {
      max-width: 458px;
      min-height: 237px;
      height: 237px;
      padding: 19.5px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      max-width: 690px;
      min-height: 340px;
    }
  }
  .modal-content {
    display: flex;
    padding: 14px;
    margin-top: 118.5px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 33.5px;
      padding: 0;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: 65px;
      margin-top: 3px;
    }
    flex-direction: column;
  }
  .bag-checkout-confirmation-text {
    text-align: center;
  }
  .button-container {
    display: flex;
    margin-top: 63px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      flex-direction: column;
      margin-top: 39px;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: 41px;
    }
  }
  .confirmation-button {
    flex: 1;
    height: 51px;
    background-color: ${props => props.theme.colors.BLACK};
    &:hover {
      background: currentColor;
    }
  }
  .confirm-checkout {
    margin-left: 0;
    margin-top: 21px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 19px;
      margin-top: 0;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: 30px;
    }
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
  }
`;

export default styles;
