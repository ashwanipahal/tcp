import { css } from 'styled-components';

const styles = css`
  .capitalise {
    text-transform: uppercase;
  }
  .margin-wrapper {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
      ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }
`;

export default styles;
