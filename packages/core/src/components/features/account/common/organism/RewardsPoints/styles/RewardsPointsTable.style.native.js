import styled from 'styled-components/native';

const RewardsOverviewContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: 90px;
`;

const MyRewardsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const CurrentPointsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const NextRewardsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const TextWrapper = styled.View`
  height: 45px;
  justify-content: center;
  text-align: center;
`;

const VerticalLine = styled.View`
  border-left-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
  height: 45px;
  align-self: flex-start;
  margin-top: 5px;
`;

const RewardsTextStyle = {
  fontFamily: 'secondary',
  fontSize: 'fs13',
  fontWeight: 'regular',
  textAlign: 'center',
  color: `${props => props.theme.colorPalette.gray[900]}`,
};

const RewardsStyle = {
  fontFamily: 'secondary',
  fontSize: 'fs18',
  fontWeight: 'black',
  color: `${props => props.theme.colorPalette.black}`,
};

export {
  RewardsOverviewContainer,
  MyRewardsWrapper,
  CurrentPointsWrapper,
  NextRewardsWrapper,
  TextWrapper,
  VerticalLine,
  RewardsTextStyle,
  RewardsStyle,
};
