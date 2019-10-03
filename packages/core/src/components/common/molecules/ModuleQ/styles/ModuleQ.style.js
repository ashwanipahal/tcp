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
      transform: scale(0.85);
    }

    .slick-center > div {
      transform: scale(1.2);
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
    justify-content: space-between;
  }

  .looks-image {
    box-shadow: 1px 3px 3px 1px rgba(26, 26, 26, 0.1);
    display: flex;
    align-items: center;
    width: 82px;
    min-height: 101px;
    text-align: center;
  }

  .looks-image-last {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.fonts.fontSize.fs22};
    font-weight: 800;
    text-align: center;
    color: ${props => props.theme.colorPalette.gray['900']};
    background-color: ${props => props.theme.colorPalette.white};
    margin-right: 0;

    p {
      text-align: center;
      margin: 0 auto;
    }
  }
`;
