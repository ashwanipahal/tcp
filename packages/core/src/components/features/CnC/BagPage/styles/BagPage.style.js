import { css } from 'styled-components';

const styles = css`
  .main-sec {
    background: #f3f3f3;
    padding-bottom: 15px;
    margin-bottom: 3px;
  }
  .row-ele {
    height: 200px;
    width: 100%;
    margin: 15px 0;
    background: #fff;
  }
  .order-summary {
    margin: 16px 0;
  }
  .right-sec {
    width: 346px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 258px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 450px;
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
    margin: 40px 0 20px;
  }
`;

export default styles;
