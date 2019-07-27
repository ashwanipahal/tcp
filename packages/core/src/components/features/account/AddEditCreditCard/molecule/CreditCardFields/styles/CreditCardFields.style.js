import { css } from 'styled-components';

const styles = css`
  .field {
    height: ${props => props.theme.spacing.FORM_FIELD_HEIGHT};

    .success__checkmark {
      top: 24px;
    }
  }
`;

export default styles;
