import { css } from 'styled-components';

const styles = css`
  .payment__heading {
    border-bottom: 3px solid ${props => props.theme.colorPalette.black};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }
  .payment__creditCard {
    margin-bottom: ${props =>
      props.cardList && props.cardList.size === 0 && props.theme.spacing.LAYOUT_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props =>
        props.cardList && props.cardList.size === 0 && props.theme.spacing.LAYOUT_SPACING.LRG};
    }
  }
  .payment__offers {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .payment__venmoCard {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
`;

export default styles;
