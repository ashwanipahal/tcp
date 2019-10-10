import { css } from 'styled-components';

export default css`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} auto;

  @media ${props => props.theme.mediaQuery.medium} {
    .header-wrapper-smallOnly,
    .promo-wrapper-smallOnly {
      display: none;
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
  }

  .button-list-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    .stacked-button:last-child {
      margin-right: 0;
    }
  }
`;
