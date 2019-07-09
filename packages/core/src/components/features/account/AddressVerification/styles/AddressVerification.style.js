import { css } from 'styled-components';

const styles = css`
  .addressVerification__input {
    display: flex;
  }

  .addressVerification__section {
    border-bottom: 1px solid;
  }

  .addressVerification__section--noBorder {
    border-bottom: none;
  }

  .addressVerification__cta {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export default styles;
