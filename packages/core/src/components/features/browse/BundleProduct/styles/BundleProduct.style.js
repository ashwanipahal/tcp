import { css } from 'styled-components';

export default css`
  .placeholder {
    background: #d8d8d8;
    padding: 10px 0;
    margin: 0 13px 5px;
    text-align: center;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 13px ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 13px ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .breadcrum-wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .product-detail-section {
    flex: 1;
    margin: 0;
  }
  .product-desc-row {
    margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .product-image-wrapper {
    margin-right: 0;
  }
  .product-detail-image-wrapper {
    margin-bottom: 8px;
  }
  .product-summary-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  }
  .product-summary-section {
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .product-detail-footer {
    flex-direction: column;
  }
  .product-price-container {
    margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .choose-child-btn {
    max-width: 450px;
    text-align: center;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
    color: white;
    font-weight: ${props => props.theme.fonts.fontWeight.extrabold};
    font-stretch: normal;
    line-height: normal;
    font-style: normal;
    letter-spacing: ${props => props.theme.typography.letterSpacings.ls1};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: 125px;
    padding-right: 125px;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};

    @media ${props => props.theme.mediaQuery.medium} {
      ${props =>
        !props.isQuickView
          ? `padding-left: 90px;
              padding-right: 89px;`
          : `padding-left: 65px;
                  padding-right: 65px;`};
    }

    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding-left: 90px;
      padding-right: 89px;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 15px;
      padding-top: 15px;
    }

    &:hover {
      background-color: ${props => props.theme.colors.BUTTON[props.fill || 'BLUE'].HOVER};
    }
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .product-image-wrapper {
      margin-right: 30px;
    }
    .product-detail-image-wrapper {
      margin-bottom: 11px;
    }
    .product-summary-mobile-view {
      display: none;
    }
    .product-summary-desktop-view {
      display: flex;
    }
    .product-price-mobile-view {
      display: none;
    }
    .product-price-desktop-view {
      display: flex;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .product-image-wrapper {
      margin-right: 0;
    }
    .product-detail-image-wrapper {
      margin-bottom: 27px;
    }
    .product-summary-mobile-view {
      display: none;
    }
    .product-summary-desktop-view {
      display: flex;
    }
    .product-price-mobile-view {
      display: none;
    }
    .product-price-desktop-view {
      display: flex;
      border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;
