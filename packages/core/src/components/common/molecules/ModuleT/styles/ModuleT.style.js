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
      .medium_text_regular {
        font-size: 20px;
      }
      .percentage_all_wrapped_normal {
        margin-top: -${props => props.theme.spacing.ELEM_SPACING.XS};
        transform: translateX(-18px);
      }
      .percentage_all_wrapped_normal-0 {
        font-size: 62px;
      }
      .percentage_all_wrapped_normal-1 {
        font-size: ${props => props.theme.typography.fontSizes.fs36};
        top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      }
      .percentage_all_wrapped_normal-2 {
        font-size: ${props => props.theme.typography.fontSizes.fs18};
        bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
    background-color: #003057;
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
