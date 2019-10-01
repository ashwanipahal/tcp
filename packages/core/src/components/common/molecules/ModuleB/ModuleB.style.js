import { css } from 'styled-components';

export default css`
  padding: 32px 0;

  .image-container {
    position: relative;
    overflow: hidden;

    .image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  .promo-banner {
    background: ${props => props.theme.colorPalette.white};
  }

  .button-list {
    margin-top: 16px;
  }

  .banner-top-variation,
  .banner-top-alt-variation,
  .banner-bottom-variation {
    .promo-banner-header {
      display: none;
    }
    .image-container {
      height: 295px;
    }
  }

  .banner-top-variation,
  .banner-top-alt-variation {
    .promo-banner {
      padding-bottom: 15px;
    }
  }
  .banner-bottom-variation {
    padding-bottom: 4px;
    .promo-banner {
      padding-top: 8px;
    }
  }
  .banner-overlay-variation {
    position: relative;
    .image-container {
      height: 413px;
    }
    .promo-banner {
      width: 186px;
      opacity: 0.9;
      padding-bottom: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .small_text_semibold,
    .small_text_black {
      line-height: 1;
      letter-spacing: 1px;
    }
    .small_text_black {
      padding-bottom: 5px;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .banner-top-variation,
    .banner-top-alt-variation,
    .banner-bottom-variation {
      .image-container {
        height: 295px;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding: 48px 0;

    .banner-top-variation,
    .banner-bottom-variation {
      .promo-text-link {
        display: flex;
        justify-content: center;
      }
      .small_text_semibold,
      .small_text_black {
        margin: 32px 10px 0 0;
      }
    }
    .banner-top-alt-variation {
      .small_text_semibold,
      .small_text_black {
        display: block;
      }
    }
    .banner-top-variation {
      .promo-banner {
        padding-bottom: 24px;
      }
    }
    .banner-bottom-variation {
      padding-bottom: 40px;
      .promo-banner {
        padding-top: 24px;
      }
    }
    .banner-top-variation,
    .banner-top-alt-variation,
    .banner-bottom-variation {
      .image-container {
        height: 577px;
      }
    }
    .banner-overlay-variation {
      .promo-banner {
        width: 270px;
        padding-bottom: 15px;
      }
      .image-container {
        height: 735px;
      }
      .small_text_semibold,
      .small_text_black {
        line-height: 1;
        letter-spacing: 1px;
      }
      .small_text_black {
        display: inline-block;
      }
    }
  }
`;
