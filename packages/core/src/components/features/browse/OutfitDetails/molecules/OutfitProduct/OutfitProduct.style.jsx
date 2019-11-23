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

  .clear-button {
    border: none;
    background: transparent;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    width: 35px;
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

  .image-wrapper {
    position: relative;
  }
  .outfit-button-wrapper,
  .outfit-button-wrapper-desktop {
    margin-right: auto;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};

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
        min-width: 78%;
      }
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      .outfit-pickup {
        min-width: 213px;
        width: 50%;
      }
    }
  }

  .outfit-button-wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }

  .outfit-button-wrapper-desktop {
    display: none;

    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: flex;
      flex-direction: row-reverse;

      .outfit-pickup:empty ~ .button-wrapper {
        min-width: 100%;
      }

      .outfit-pickup:empty {
        min-width: 0;
        margin-left: auto;
      }

      .outfit-pickup:empty ~ .button-wrapper .add-to-bag-button {
        max-width: 100%;
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

    .add-to-bag-button {
      padding-left: 0;
      padding-right: 0;
      width: 100%;

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 10px;
        padding-top: 10px;
      }
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      min-width: 213px;
      width: 50%;
      margin-bottom: 0;
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
    padding-bottom: 34px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      min-width: 213px;
      width: 50%;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 13px;
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
    position: relative;
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
    .outfit-button-wrapper {
      display: none;
    }
    .outfit-button-wrapper-desktop {
      display: flex;

      .outfit-pickup:empty {
        height: 51px;
      }
    }
    .outfit-pickup:empty ~ .button-wrapper {
      min-width: 100%;

      .add-to-bag-button {
        min-width: 100%;
      }
    }
  }
`;
