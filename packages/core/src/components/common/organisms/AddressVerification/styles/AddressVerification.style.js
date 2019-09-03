import { css } from 'styled-components';

const styles = css`
  .addressVerification__input {
    display: flex;
  }

  .addressVerification__section {
    border-bottom: 1px solid;
    margin-left: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .addressVerification__section--noBorder {
    border-bottom: none;
  }

  .addressVerification__ctaContainer {
    margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    }
  }

  .addressVerification__cta {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
  }
`;

export default styles;
