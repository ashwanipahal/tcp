import { css } from 'styled-components';

const Styles = css`
  .links-wrapper {
    display: flex;
    justify-content: center;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  ${props =>
    props.isProductDetailView
      ? `
      .links-wrapper {
        padding-top: ${props.theme.spacing.ELEM_SPACING.XS};
      }
      .footer-wrapper {
        text-align: center;
      }`
      : ``};
  .space-between {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.large} {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .links-container {
    display: flex;
  }
`;

export default Styles;
