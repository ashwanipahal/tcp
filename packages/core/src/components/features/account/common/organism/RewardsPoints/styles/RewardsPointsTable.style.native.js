import styled from 'styled-components/native';

const RewardsOverviewContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: 120px;
`;

const MyRewardsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const CurrentPointsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const NextRewardsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export { RewardsOverviewContainer, MyRewardsWrapper, CurrentPointsWrapper, NextRewardsWrapper };
