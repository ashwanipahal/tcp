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
    box-shadow: 1px 3px 3px 1px rgba(26, 26, 26, 0.1);
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .looks-images-wrapper {
    background-color: ${props => props.theme.colorPalette.white};
    display: flex;
    direction: row;
    align-items: center;
  }

  .looks-image {
    box-shadow: 1px 3px 3px 1px rgba(26, 26, 26, 0.1);
    width: 112px;
    height: 138px;
    margin-right: 9px;
  }

  .looks-image-last {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.fonts.fontSize.fs22};
    font-weight: 800;
    text-align: center;
    color: ${props => props.theme.colorPalette.gray['900']};
    background-color: ${props => props.theme.colorPalette.white};
    margin-right: 0;
  }
`;
