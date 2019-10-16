import { css } from 'styled-components';

const styles = css`
  .margin-wrapper {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
      ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }
`;

export default styles;
