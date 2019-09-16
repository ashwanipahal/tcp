import { css } from 'styled-components';

const styles = css`
  .history-section-separator {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }

  .point-history-content {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    > h3 {
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      font-family: ${props => props.theme.fonts.secondaryFontFamily};
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
    > p {
      margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
    }
    a {
      color: ${props => props.theme.colors.ANCHOR.PRIMARY};
    }
    .no-bm {
      margin-bottom: 0;
    }
    ul {
      list-style-type: disc;
      padding-left: 18px;
    }
    li {
      list-style-type: disc;
    }
  }
`;

export default styles;
