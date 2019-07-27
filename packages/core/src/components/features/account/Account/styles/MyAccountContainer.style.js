import { css } from 'styled-components';

const MyAccountStyles = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    .menuLarge {
      display:none;
    }
    .menuMedium {
      display:block;
      margin-bottom:${props => props.theme.spacing.ELEM_SPACING.XL}
    }
  @media ${props => props.theme.mediaQuery.large} {
    .menuMedium {
      display:none;
    }
    .menuLarge {
      display:block;
    }
  }
`;

export default MyAccountStyles;
