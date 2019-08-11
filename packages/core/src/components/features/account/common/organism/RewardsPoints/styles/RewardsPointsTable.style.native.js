import styled from 'styled-components/native';

const RewardsOverviewContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
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
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  justify-content: center;
  text-align: center;
`;

const VerticalLine = styled.View`
  border-left-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  align-self: flex-start;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export {
  RewardsOverviewContainer,
  MyRewardsWrapper,
  CurrentPointsWrapper,
  NextRewardsWrapper,
  TextWrapper,
  VerticalLine,
};
