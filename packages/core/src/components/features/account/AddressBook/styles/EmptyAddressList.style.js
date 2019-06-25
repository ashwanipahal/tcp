import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  .emptyAddressList__row--marginBottom {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default styles;
