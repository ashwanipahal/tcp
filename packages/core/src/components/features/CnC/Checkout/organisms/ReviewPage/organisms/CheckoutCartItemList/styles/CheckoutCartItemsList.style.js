import { css } from 'styled-components';

const styles = css`
  background-color: ${props => props.theme.colors.WHITE};
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};

  @media ${props => props.theme.mediaQuery.smallMax} {
    padding: 0;
  }

  .cart-item-tile-container {
    border-top: 1px solid ${props => props.theme.colors.BLACK};
    position: relative;
  }
  .checkout-cart-list-heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .pickup-header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .header-list {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .store-of-product {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .title-list-pickup-product {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-top: 1px solid ${props => props.theme.colors.BLACK};
  }
  .reviewPagePrice {
    position: absolute;
    right: 0;
    top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  }
  .toolTip {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  }
`;

export default styles;
