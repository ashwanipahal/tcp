import { css } from 'styled-components';

const styles = css`
  flex: 1;
  flex-direction: column;
  .empty-bag-text {
    flex: 1;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
  }
  .empty-bag-subtext {
    flex: 1;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
    .small-text {
      width: 90%;
      text-align: center;
    }
  }
`;

export default styles;
