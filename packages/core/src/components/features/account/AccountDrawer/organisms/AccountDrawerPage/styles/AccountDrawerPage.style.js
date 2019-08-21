import { css } from 'styled-components';

const styles = css`
  .field {
    height: ${props => props.theme.spacing.FORM_FIELD_HEIGHT};
  }
  .hidden {
    display: none;
  }
`;

export default styles;
