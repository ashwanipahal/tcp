import { css } from 'styled-components';

const styles = css`
  .history-section-separator {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    @media ${props => props.theme.mediaQuery.mediumMax} {
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }
  }
  .point_history_grid {
    @media ${props => props.theme.mediaQuery.mediumMax} {
      width: 80%;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 100%;
    }
    width: 50%;
  }
`;

export default styles;
