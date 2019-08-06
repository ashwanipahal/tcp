import { css } from 'styled-components';

const RewardsPointsStyles = css`
  .progress-container {
    height: ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    background-color: ${props => props.theme.colorPalette.orange['300']};
    width: 100%;
    overflow: hidden;
  }

  .progressbar-rewards {
    background-color: ${props => props.theme.colorPalette.orange['800']};
    width: 0%;
    height: 100%;
    position: relative;
  }

  .table-container {
    display: flex;
    justify-content: space-between;
  }

  .table-item {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default RewardsPointsStyles;
