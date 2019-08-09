import { css } from 'styled-components';

const styles = css`
  position: relative;

  .collapsible-header {
    height: 50px;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    box-sizing: border-box;
    width: 100%;
  }

  .collapsible-icon {
    position: absolute;
    right: 0;
    top: 30px;
  }

  .item-opened {
    display: block;
  }

  .item-closed {
    display: none;
  }
`;

export default styles;
