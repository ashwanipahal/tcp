import { css } from 'styled-components';

const RewardsPointsStyles = css`
  .progress-container {
    height: ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    background-color: ${props => props.theme.colorPalette.userTheme.mprPrimary};
    width: 100%;
    overflow: hidden;
  }

  .progressbar-rewards {
    background-color: ${props => props.theme.colorPalette.userTheme.mpr};
    width: 0%;
    height: 100%;
    position: relative;
  }

  .progress-container_plcc {
    height: ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
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
`;

export default RewardsPointsStyles;
