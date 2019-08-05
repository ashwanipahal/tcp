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
  .checkout-actions {
    margin: 0;
    width: 100%;
  }
  .checkout-button {
    font-weight: 800;
    margin: 0 0 10px 0;
    color: red;
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
`;

export default styles;
