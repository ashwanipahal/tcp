import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .product-brand-img-wrapper {
    .imageWrapper {
      width: 100px;
      height: 100px;
    }
    .logoWrapper {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      width: 100px;
      height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    }
  }
  .bag-product-detail-wrapper {
    .badge-wrapper {
      width: 100px;
      display: inline-block;
      margin-bottom: 5px;
    }
    .product-detail-row {
      margin-left: 0;
      width: 260px;
      margin-bottom: 5px;
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 100%;
      }
    }

    .product-detail-row.label-responsive-wrapper {
      width: 85%;
      height: 19px;
      display: block;
      margin-left: 0;
      margin-top: 5px;
      margin-bottom: 6px;
    }
    .product-price {
      width: 120px;
      display: block;
    }
    .product-points {
      display: block;
      width: 80px;
    }
    .save-for-later {
      margin-top: 13px;
      margin-left: 205px;
      display: block;
      width: 80px;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
