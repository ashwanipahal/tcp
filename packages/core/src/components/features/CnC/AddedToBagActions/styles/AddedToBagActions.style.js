import { css } from 'styled-components';

const CtaStyle = css`
  display: block;
  margin: 10px 0;
  .check-out-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .view-bag {
    width: inherit;
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    height: 48px;
  }
  .checkout-button {
    padding-top: 10px;
  }
  .checkout {
    height: 48px;
    margin-left: 10px;
    flex: 1;
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
  }
`;
export default CtaStyle;
