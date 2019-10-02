import { css } from 'styled-components';

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

  .moduleG__carousel-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    &.moduleG__carousel-top {
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }

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

  .image-link {
    display: flex;
    align-items: center;
    width: 89px;
    height: 110px;
    margin: 0 auto;

    @media ${props => props.theme.mediaQuery.small} {
      width: 203px;
      height: 256px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      width: 146px;
      height: 185px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 190px;
      height: 263px;
    }
  }
`;
