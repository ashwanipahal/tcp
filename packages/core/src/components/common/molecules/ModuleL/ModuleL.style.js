import { css } from 'styled-components';

export default css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  .moduleL__mobile-web-container {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .moduleL__promo-banner {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .text-black {
    font-weight: ${props => props.theme.typography.fontWeights.black};
  }
  .moduleL__tile {
    background-color: ${props => props.theme.colorPalette.gray['300']};
    display: flex;
    flex-direction: row;
    margin-bottom: 18px;
    text-align: left;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 30px;
    }
  }
  .moduleL__tile-image {
    max-width: 210px;
  }
  .moduleL__tile-text {
    margin: 0 13px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 30px;
    }
  }
  .moduleL__tile-title {
    margin-top: 31px;
    margin-bottom: 13px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 44px;
      margin-bottom: 20px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 58px;
    }

    @media ${props => props.theme.mediaQuery.xlarge} {
      margin-top: 91px;
    }
  }
  .moduleL__tile-link {
    color: ${props => props.theme.colorPalette.gray['900']};
  }
  .slick-prev,
  .slick-next {
    background-size: 100%;
    width: 13px;
    height: 42px;
  }
  .slick-prev {
    left: -70px;
  }
  .slick-next {
    right: -70px;
  }
  .slick-dots {
    bottom: -5px;
  }
`;
