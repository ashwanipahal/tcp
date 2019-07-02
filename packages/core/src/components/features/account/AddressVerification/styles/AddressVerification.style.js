import { css } from 'styled-components';

const styles = css`
  .addressVerification {
    width: 80%;
    margin: 0 auto;
  }

  .addressVerification__input {
    display: flex;
  }

  .addressVerification__section {
    padding-bottom: 20px;
    margin-bottom: 20px;
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
