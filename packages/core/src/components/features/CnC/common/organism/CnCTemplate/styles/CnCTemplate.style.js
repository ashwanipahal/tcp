import { css } from 'styled-components';

const styles = css`
  ${props => `
  background: ${props.theme.colors.PRIMARY.PALEGRAY};
  padding: ${props.theme.spacing.ELEM_SPACING.XXXS};
  margin-bottom: 3px;`}
`;

export default styles;
