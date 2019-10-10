import { css } from 'styled-components';

export default css`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} auto;

  @media ${props => props.theme.mediaQuery.medium} {
    .smallOnlyView {
      display: none;
    }

    .header-promo-wrapper {
      margin: 0 15px;
      width: 26%;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XL} auto;
  }

  .moduleT-promo-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .moduleT-header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .promoBanner {
    margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      .medium_text_black {
        line-height: 1;
      }
    }
  }

  .button-list-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    .stacked-button:last-child {
      margin-right: 0;
    }
  }

  .tcp-button-list {
    .image-comp {
      color: ${props => props.theme.colorPalette.black};
    }
  }

  .gymboree-button-list {
    background-color: ${props => props.theme.colorPalette.C900};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    .button-list-wrapper {
      padding: 0;
      margin: 0;
    }
  }
`;
