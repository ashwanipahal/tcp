import { css } from 'styled-components';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import spacing from '@tcp/core/styles/themes/TCP/spacing';

const colorPallete = createThemeColorPalette();
const squareBracketBorderColor = colorPallete.gray[500];

const styles = css`
  .CreditCardForm__address {
    display: inline-block;
    background-image: linear-gradient(${squareBracketBorderColor}, ${squareBracketBorderColor}),
      linear-gradient(${squareBracketBorderColor}, ${squareBracketBorderColor}),
      linear-gradient(${squareBracketBorderColor}, ${squareBracketBorderColor}),
      linear-gradient(${squareBracketBorderColor}, ${squareBracketBorderColor});
    background-repeat: no-repeat;
    background-size: 8px 2px;
    background-position: top left, top right, bottom left, bottom right;
    border: 2px solid ${squareBracketBorderColor};
    border-width: 0 2px;
    padding: ${spacing.ELEM_SPACING.XS} ${spacing.ELEM_SPACING.XXXL} ${spacing.ELEM_SPACING.XS}
      ${spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: block;
    }
  }

  .CreditCardForm__ctaContainer {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .CreditCardForm__cancel {
      order: 2;
    }

    .CreditCardForm__submit {
      order: 1;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default styles;
