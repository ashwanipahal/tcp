import { css } from 'styled-components';

const style = css`
  display: flex;
  .tileheader__body {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export default style;
