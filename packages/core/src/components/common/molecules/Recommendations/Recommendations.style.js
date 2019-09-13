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

  .slick-arrow {
    z-index: 1;
    top: 30%;
  }

  .price-only {
    .slick-arrow {
      top: 40%;
    }
  }

  .slick-prev,
  .slick-next {
    transform: inherit;
    width: 15px;
    height: 52px;
  }

  .slick-prev {
    left: -25px;
  }

  .slick-next {
    right: -25px;
  }

  .recommendation-cta {
    width: 225px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .recommendation-cta {
      width: 162px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .recommendation-header {
      margin: 48px 0 16px 0;
    }
    .recommendation-cta {
      width: 210px;
    }
  }
`;
