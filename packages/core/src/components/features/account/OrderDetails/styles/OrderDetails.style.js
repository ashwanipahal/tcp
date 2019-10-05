import { css } from 'styled-components';

export default css`
  .elem-margin-right {
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0;
    }
  }

  .purchasedItemsMargin {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  }
`;
