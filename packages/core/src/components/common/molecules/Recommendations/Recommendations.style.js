import { css } from 'styled-components';

export default css`
  .recommendations-header {
    text-align: center;
    margin: 32px 0 16px 0;
  }

  .recommendaton-cta-container {
    text-align: center;
    margin-top: 16px;
  }

  .price-only {
    .slick-arrow {
      top: 40%;
    }
  }

  &.recommendations-tile {
    .slick-arrow {
      z-index: 1;
      top: 30%;
      transform: inherit;
      width: 15px !important;
      height: 52px !important;
    }

    .slick-prev {
      left: -25px;
    }

    .slick-next {
      right: -25px;
    }

    .slick-list {
      margin-right: -33%;
    }
  }

  .recommendation-cta {
    width: 225px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .recommendation-cta {
      width: 162px;
    }
    &.recommendations-tile {
      .slick-list {
        margin-right: -20%;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .recommendations-header {
      margin: 48px 0 16px 0;
      font-size: 32px;
    }
    .recommendation-cta {
      width: 210px;
    }
    &.recommendations-tile {
      .slick-list {
        margin-right: 0;
      }
    }
  }
`;
