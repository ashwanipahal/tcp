import { css } from 'styled-components';

export default css`
  .link-text {
    ${props => (!props.promo ? `margin-bottom: ${props.theme.spacing.ELEM_SPACING.MED}` : '')}
    text-align: center;

    @media ${props => props.theme.mediaQuery.large} {
      ${props => (!props.promo ? `margin-bottom: ${props.theme.spacing.ELEM_SPACING.XL}` : '')}
    }
    ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
  }

  /* this style is for Gymboree Header Text "Spring is Every Wear" */
  .gymboree_title_text {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 36px;
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
    font-size: 22px;
    line-height: normal;
    letter-spacing: 2px;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 42px;
      letter-spacing: 2.42px;
    }
  }

  /* Module J Heading styles */
  .style12 {
    background-color: ${props => props.theme.colorPalette.white};
    display: block;
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    position: absolute;
    margin-top: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: -28px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
      margin-top: -30px;
      width: 55%;
    }
  }
  .style13 {
    display: block;
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: ${props => props.theme.typography.fontSizes.fs32};
    letter-spacing: -0.5px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs48};
    }
  }
`;
