import { css } from 'styled-components';

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

  .moduleJ-topbar {
    border-top: 3px solid ${props => props.theme.colorPalette.yellow['500']};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .moduleJ-promo {
    position: relative;
    text-align: center;
  }
  .moduleJ-header-text1 {
    background-color: ${props => props.theme.colorPalette.white};
    position: absolute;
    margin-top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 82%;
  }
  .moduleJ-header-text2 {
    height: 58px;
    letter-spacing: -0.5px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .moduleJ-promoBanner {
    height: 117px;
  }
  .moduleJ__carousel-wrapper {
    margin-top: 27px;

    .slick-list {
      margin-right: -22%;

      @media ${props => props.theme.mediaQuery.medium} {
        margin-right: -15%;
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-right: auto;
      }
    }
  }

  .moduleJ-image-link {
    display: flex;
    align-items: center;
    width: 89px;
    height: 110px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 146px;
      height: 180px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 142px;
      height: 175px;
    }

    @media ${props => props.theme.mediaQuery.xlarge} {
      width: 175px;
      height: 217px;
    }
  }

  .moduleJ-cta-btn {
    margin-top: 24px;

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 16px;
    }
  }
`;
