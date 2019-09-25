import { css } from 'styled-components';

const styles = css`
  .venmo-banner-container {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      background-color: ${props => props.theme.colorPalette.gray[300]};
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
      text-align: center;
    }
  }
  .venmo-logo {
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin: 0 auto;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
