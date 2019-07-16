import { css } from 'styled-components';

const styles = css`
  .emptyCard__body {
    margin-right: 0;
  }
  .emptyCard__description--desktop {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
      display: block;
    }
  }
  .emptyCard__description--mobile {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .emptyCard__heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .emptyCard__imgWrapper {
    text-align: center;
  }
  .emptyCard__img {
    width: 64px;
  }
`;

export default styles;
