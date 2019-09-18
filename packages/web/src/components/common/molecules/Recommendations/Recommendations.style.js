import { css } from 'styled-components';

export default css`
  .recommendations-header {
    text-align: center;
    margin: 32px 0 16px 0;
  }

  .recommendation-cta-container {
    text-align: center;
    margin-top: 16px;
  }

  .price-only {
    .slick-arrow {
      top: 40%;
    }
  }

  .no-carousel-container {
    display: flex;
    justify-content: center;
    ul {
      width: 149px;
    }
  }

  &.recommendations-tile {
    .slick-arrow {
      z-index: ${props => props.theme.zindex.zPLPFilterDropDown};
      top: 30%;
      transform: inherit;
    }

    .slick-list {
      margin-right: -33%;
    }
  }

  .moduleP-variation {
    .slick-arrow {
      top: 25%;
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
    .no-carousel-container {
      ul {
        width: 214px;
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
    .no-carousel-container {
      ul {
        width: 261px;
      }
    }
  }
`;
