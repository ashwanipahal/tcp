import { css } from 'styled-components';

const styles = css`
  border-bottom: 3px solid ${props => props.theme.colors.BLACK};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export default styles;
