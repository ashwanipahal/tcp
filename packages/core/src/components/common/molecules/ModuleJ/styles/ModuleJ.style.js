import { css } from 'styled-components';

export default css`
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
    font-size: 13px;
    margin-top: 24px;
    width: 225px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 161px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 14px;
      margin-top: 16px;
      width: 210px;
    }
  }
`;
