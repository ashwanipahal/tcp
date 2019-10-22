import { css } from 'styled-components';

export default css`
  .link-text {
    ${props => (!props.promo ? `margin-bottom: ${props.theme.spacing.ELEM_SPACING.MED}` : '')}
    text-align: center;

    @media ${props => props.theme.mediaQuery.large} {
      ${props => (!props.promo ? `margin-bottom: ${props.theme.spacing.ELEM_SPACING.MED}` : '')}
    }
    ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
  }

  /* this style is for Gymboree Header Text "Spring is Every Wear" */
  .gymboree_title_text {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 32px;
    line-height: 1.05;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 64px;
    }
  }

  /* this style is for Module N "ALL CLEARANCE" header text */
  .spaced_text {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    font-size: ${props =>
      props.theme.isGymboree
        ? props.theme.typography.fontSizes.fs20
        : props.theme.typography.fontSizes.fs22};
    line-height: normal;
    letter-spacing: 2px;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 64px;
      letter-spacing: 4px;
      font-weight: 500;
    }
  }

  /* Module J Heading styles */
  .small_text_normal {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs14};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
    }
  }
  .medium_text_black {
    color: ${props => props.theme.colorPalette.gray['900']};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: ${props => props.theme.typography.fontSizes.fs32};
    letter-spacing: -0.5px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs48};
    }
  }

  /* Module H Heading styles */
  .medium_text_white_black {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: ${props => props.theme.typography.fontSizes.fs32};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs48};
    }
  }

  /* Module G Heading styles */
  .medium_text_regular {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs32};
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    letter-spacing: 2px;
    text-align: center;
    color: ${props => props.theme.colorPalette.black};
  }

  /* Module S Heading styles */
  .small_text_white_medium {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    font-size: ${props => props.theme.typography.fontSizes.fs20};
    letter-spacing: 2px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      letter-spacing: normal;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: inline;
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs32};
    }
  }
  /* Module N Heading Styles Gymboree*/
  .white_large_text_half {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    font-size: ${props => props.theme.typography.fontSizes.fs20};
    letter-spacing: 2px;
    color: ${props => props.theme.colorPalette.white};
    text-align: center;
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs32};
    }
  }
`;
