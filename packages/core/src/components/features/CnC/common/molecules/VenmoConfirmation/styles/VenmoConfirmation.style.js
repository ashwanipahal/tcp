import { css } from 'styled-components';

const styles = css`
  .venmo-confirmation-container {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .venmo-logo-wrapper {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[600]};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .venmo-logo {
    margin-top: -50%;
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    width: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export default styles;
