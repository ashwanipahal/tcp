import { css } from 'styled-components';

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

  .moduleQ__carousel-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    .slick-initialized .slick-track {
      display: flex;
      align-items: center;
    }

    .slick-slide > div {
      margin: 0 auto;

      @media ${props => props.theme.mediaQuery.medium} {
        width: 262px;
      }
    }

    .slick-center > div {
      width: 225px;

      @media ${props => props.theme.mediaQuery.medium} {
        width: 354px;
      }

      @media ${props => props.theme.mediaQuery.large} {
        width: 358px;
      }
    }

    .slick-dots {
      bottom: -${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .looks-large-image {
    background-color: ${props => props.theme.colorPalette.white};
  }

  .looks-small-images {
    background-color: ${props => props.theme.colorPalette.white};
    display: flex;
    direction: row;
  }

  .looks-last-item {
    background-color: ${props => props.theme.colorPalette.white};
  }
`;
