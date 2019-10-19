import { css } from 'styled-components';

export default css`
  .tablet-image-section,
  .product-information {
    display: inline-block;
    max-width: 30%;
    min-width: 103px;
    vertical-align: top;

    @media ${props => props.theme.mediaQuery.medium} {
      min-width: 162px;
    }
  }

  .image-section {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    color: ${props => props.theme.colorPalette.gray[600]};
  }

  .view-detail-anchor {
    text-align: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }

  .outfit-button-wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;

      .outfit-pickup {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      .outfit-pickup {
        margin-right: 0;
        margin-left: auto;
        min-width: 79%;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .desktop-image-section {
      max-width: 210px;
      margin-right: 0;
    }

    .tablet-product-info {
      min-width: 59%;
      margin-left: auto;
    }
  }

  .button-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    height: 42px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      min-width: 213px;
      width: 50%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      position: absolute;
      left: 0;
      min-width: 47%;
    }
  }

  .outfit-sku {
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: 30px;
    }

    .size-error-message {
      max-width: 60%;
    }
  }

  .fulfillment-section {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    margin-top: 0;
    height: 42px;
    background: ${props => props.theme.colorPalette.black};
    color: ${props => props.theme.colorPalette.white};

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      min-width: 213px;
      width: 50%;
    }
  }

  .product-information {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    max-width: 60%;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
      max-width: 54%;
    }

    .product-details-header-container {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }

    .product-title {
      max-width: 164px;

      @media ${props => props.theme.mediaQuery.large} {
        max-width: 334px;
      }
    }
  }

  .outfit-mobile-image {
    min-width: 103px;
    min-height: 127px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .tablet-image-section {
      width: 40%;
    }
    .product-information {
      width: 60%;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .tablet-image-section {
      display: none;
    }
  }
`;
