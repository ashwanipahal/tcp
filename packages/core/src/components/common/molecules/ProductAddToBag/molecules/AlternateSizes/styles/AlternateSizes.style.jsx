import { css } from 'styled-components';

const styles = css`
  &.alternate-sizes {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
    width: 100%;
    border: solid 1px ${props => props.theme.colorPalette.gray[500]};
    border-left: 0;
    border-right: 0;
    font-family: ${props => props.theme.typography.fonts.secondary};
    .alternate-sizes-title {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      color: ${props => props.theme.colorPalette.gray[900]};
      font-weight: ${props => props.theme.typography.fontWeights.semibold};
    }
    .alternate-sizes-list {
      vertical-align: top;
      position: relative;
      li {
        font-size: ${props => props.theme.typography.fontSizes.fs12};
        font-weight: ${props => props.theme.typography.fontWeights.semibold};
        display: inline-block;
      }
      a {
        padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
        color: ${props => props.theme.colorPalette.gray[900]};
        text-decoration: underline;
        display: inline-block;
      }
    }
    li.alternate-sizes-keys:not(:last-child) {
      border-right: 1px solid ${props => props.theme.colorPalette.gray[900]};
    }
  }
`;

export default styles;
