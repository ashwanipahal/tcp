import { css } from 'styled-components';

const RewardsPointsStyles = css`
  .progress-container {
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.colorPalette.userTheme.mprPrimary};
    width: 100%;
    overflow: hidden;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
  }

  .progressbar-rewards {
    background-color: ${props => props.theme.colorPalette.userTheme.mpr};
    width: 0%;
    height: 100%;
    position: relative;
  }

  .progress-container_plcc {
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.colorPalette.userTheme.plccLight};
    width: 100%;
    overflow: hidden;
  }

  .progressbar-rewards_plcc {
    background-color: ${props => props.theme.colorPalette.userTheme.plcc};
    width: 0%;
    height: 100%;
    position: relative;
  }

  .table-container {
    display: flex;
    justify-content: space-between;
  }

  .table-item {
    border-right: 1px solid ${props => props.theme.colorPalette.gray[600]};
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:last-child {
      border: none;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      border: none;
    }
  }

  .current-points {
    white-space: nowrap;
  }
  .my-rewards {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .my-rewards p {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0;
    }
  }
`;

export default RewardsPointsStyles;
