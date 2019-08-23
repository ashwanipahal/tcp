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
`;
