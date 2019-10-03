import { css } from 'styled-components';

export default css`
  li {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
  }
`;
