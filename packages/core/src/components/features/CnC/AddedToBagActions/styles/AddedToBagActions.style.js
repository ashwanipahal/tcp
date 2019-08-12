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
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.DARK};
    }
    width: inherit;
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    height: 48px;
  }
  .checkout-button {
    padding-top: 10px;
  }

  .checkout {
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
    height: 48px;
    margin-left: 10px;
    flex: 1;
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-left: 0;
    }
  }
  .payPal-button {
    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
export default CtaStyle;
