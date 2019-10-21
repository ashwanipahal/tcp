import { css } from 'styled-components';

export default css`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} auto;

  @media ${props => props.theme.mediaQuery.medium} {
    .smallOnlyView {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
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

  .button-list-container {
    ${props =>
      props.theme.isGymboree
        ? `
      background-color: ${props.theme.colorPalette.blue.C900};
      padding: ${props.theme.spacing.ELEM_SPACING.MED} 0;
      margin-top: ${props.theme.spacing.ELEM_SPACING.SM};

      @media ${props.theme.mediaQuery.medium} {
        margin-top: ${props.theme.spacing.ELEM_SPACING.MED};
      }

      .button-list-wrapper {
        padding: 0;
        margin: 0;
      }
    `
        : `
      .image-comp {
        color: ${props.theme.colorPalette.black};
      }
    `}
  }

  .button-list-container .button-list-container-alternate a:nth-child(even) {
    width: 141px;
  }
`;
