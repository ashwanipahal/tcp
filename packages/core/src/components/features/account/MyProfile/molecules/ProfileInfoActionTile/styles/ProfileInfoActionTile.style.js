import { css } from 'styled-components';

const styles = css`
  position: relative;
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  display: block;
  height: 150px;
  pointer-events: ${props => (props.activityCompletionState ? 'none' : 'auto')};

  .img-cont {
    min-height: 55px;
    padding-top: 30px;
  }

  .tile-icon {
    max-height: 55px;
  }

  .activity-complete-icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

export default styles;
