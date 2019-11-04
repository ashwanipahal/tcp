import { css } from 'styled-components';

const styles = css`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  .empty-bag-text {
    text-align: center;
  }
  .empty-bag-subtext {
    flex: 1;
    display: flex;
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
