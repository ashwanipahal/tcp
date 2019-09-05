import { css } from 'styled-components';

const styles = css`
  .row-ele {
    width: 100%;
    margin: 15px 0;
    background: #fff;
  }
  .order-summary {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 16px 0;
    }
  }

  .checkout-button {
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    width: 100%;
    margin: 0;
  }

  button.checkout {
    width: 100%;
    margin: 0 0 10px 0;
    padding: 16px 0;
  }

  .bag-header {
    margin: 0;
    padding: 40px 0 20px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      text-align: center;
      border-bottom: 2px solid ${props => props.theme.colorPalette.primary.dark};
      padding: 13px 0 22px;
      margin: 0;
      font-size: 18px;
      font-weight: 800;
    }
  }
`;

export const addedToBagActionsStyles = css`
  @media ${props => props.theme.mediaQuery.smallOnly} {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 14px;
    background: #fff;
    margin: 0;
    z-index: 1;
    box-sizing: border-box;
  }
`;

export default styles;
