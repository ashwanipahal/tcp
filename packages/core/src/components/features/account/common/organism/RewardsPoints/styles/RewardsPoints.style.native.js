import styled from 'styled-components/native';

const RewardsPointsView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const currentPointsStyle = () => {
  return `
  width:140px;
  `;
};

const RewardStyle = () => {
  return `
  width:200px;
  `;
};

const ProgressBarStyle = props => {
  const { theme } = props;
  return `
  height: ${props.theme.spacing.ELEM_SPACING.SM};
  border-radius: ${props.theme.spacing.ELEM_SPACING.XXS};
  background-color: ${props.theme.colorPalette.orange['300']};
  width: 100%;
  overflow: hidden;
  margin:${theme.spacing.ELEM_SPACING.SM} 0;
  `;
};

const ProgressBarRewardStyle = props => {
  const { theme } = props;
  return `
  background-color: ${theme.colorPalette.orange['800']};
    width: 0%;
    height: ${theme.spacing.ELEM_SPACING.SM};
  `;
};

const pointheaderstyle = props => {
  const { theme } = props;
  return `
    margin-bottom:${theme.spacing.ELEM_SPACING.XS};
    width:100%;

  `;
};

const CurrentPointsWrapper = styled.Text`
  ${currentPointsStyle}
`;

const ProgressBarWrapper = styled.View`
  ${ProgressBarStyle}
`;

const ProgressBarRewardWrapper = styled.Text`
  ${ProgressBarRewardStyle}
`;

const RewardWrapper = styled.Text`
  ${RewardStyle}
`;

const PointHeadingWrapper = styled.Text`
  ${pointheaderstyle}
`;

export {
  RewardsPointsView,
  CurrentPointsWrapper,
  ProgressBarWrapper,
  ProgressBarRewardWrapper,
  RewardWrapper,
  PointHeadingWrapper,
};
