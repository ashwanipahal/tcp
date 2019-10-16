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
  .margin-tablet {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 0;
    }
  }
  .margin-mobile {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 0;
    }
  }
`;
