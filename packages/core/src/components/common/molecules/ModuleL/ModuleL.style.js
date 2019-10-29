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
  }
  .text-black {
    font-weight: ${props => props.theme.typography.fontWeights.black};
  }
  .slick-slide > div {
    padding: 0 15px;
  }
  .moduleL__tile {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: left;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 30px;
    }
  }
  .tile-image-wrapper {
    display: flex;
    align-items: center;
    min-height: 128px;

    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 200px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      min-height: 259px;
    }
  }
  .moduleL__tile-image {
    display: flex;
    align-items: center;
    max-width: 103px;
    max-height: 128px;

    @media ${props => props.theme.mediaQuery.medium} {
      max-width: 162px;
      max-height: 200px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      max-width: 210px;
      max-height: 259px;
    }
  }
  .moduleL__tile-text {
    margin: 0 13px;
    position: relative;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 30px;
    }
  }
  .moduleL__tile-title {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;
