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
  .style11 {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 36px;
    line-height: 1.05;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 74px;
    }
  }

  /* this style is for Module N "ALL CLEARANCE" header text */
  .spaced_text {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    font-size: 20px;
    line-height: 1.05;
    letter-spacing: 2.22px;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 42px;
      letter-spacing: 2.42px;
    }
  }
`;
