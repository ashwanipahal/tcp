import { css } from 'styled-components';

const styles = css`
  &.alternate-sizes {
    display: flex;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
    width: 100%;
    border: solid 1px ${props => props.theme.colorPalette.gray[500]};
    border-left: 0;
    border-right: 0;
    .alternate-sizes-title {
      white-space: pre;
      padding-top: 2px;
    }
    .alternate-sizes-list {
      vertical-align: top;
      position: relative;
      a {
        padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
        color: ${props => props.theme.colorPalette.gray[900]};
        display: inline-block;
      }
    }
    .alternate-sizes-keys {
      display: inline-block;
    }
    li.alternate-sizes-keys:not(:last-child) {
      border-right: 1px solid ${props => props.theme.colorPalette.gray[900]};
    }
  }
`;

export default styles;
