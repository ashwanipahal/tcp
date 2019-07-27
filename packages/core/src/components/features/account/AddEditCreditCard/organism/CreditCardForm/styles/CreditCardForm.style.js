import { css } from 'styled-components';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';

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
    background-size: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    background-position: top left, top right, bottom left, bottom right;
    border: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid ${squareBracketBorderColor};
    border-width: 0 ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XXXL}
      ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: block;
    }
  }

  .creditCardForm__addressBook {
    align-self: flex-end;
  }

  .CreditCardForm__ctaContainer {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .CreditCardForm__submit {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    order: 1;
  }

  .CreditCardForm__cancel {
    order: 2;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .CreditCardForm__cancel {
      order: 0;
    }

    .CreditCardForm__submit {
      order: 0;
      margin-bottom: 0;
    }
  }
`;

export default styles;
