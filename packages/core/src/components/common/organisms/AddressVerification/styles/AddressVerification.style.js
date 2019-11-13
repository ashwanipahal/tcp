import { css } from 'styled-components';

const styles = css`
  .addressVerification__input {
    display: flex;
  }

  .addressVerification {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .addressVerification__section {
    border-bottom: 1px solid;
    border-color: ${props => props.theme.colors.PRIMARY.GRAY};
  }

  .addressVerification__section--noBorder {
    border-bottom: none;
  }

  .addressVerification__ctaContainer {
    margin: ${props => props.theme.spacing.LAYOUT_SPACING.MED}
      ${props => props.theme.spacing.LAYOUT_SPACING.LRG}
      ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }

  .addressVerification__cta {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
  }
`;

export default styles;
