import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  .emptyAddressList__row--marginBottom {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default styles;
