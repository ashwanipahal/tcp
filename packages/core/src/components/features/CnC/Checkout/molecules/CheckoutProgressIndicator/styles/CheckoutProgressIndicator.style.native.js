import styled from 'styled-components/native';

export const StepIndicatorContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-left: 35px;
`;

export const ProgressStep = styled.View`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 60px;
`;

export const ProgressDot = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  width: 20px;
  height: 20px;
  border-radius: 10;
  border-width: 1;
  margin-top: 14px;
  margin-bottom: 14px;
`;

export const ProgressBar = styled.View`
  background-color: black;
  flex-grow: 1;
  height: 2px;
`;

export const StepIndicatorLabelsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 25px;
`;

export const ProgressStepLabels = styled.View`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const ProgressDotIcon = styled.Image`
  width: 22px;
  height: 22px;
`;

export default {
  StepIndicatorContainer,
  ProgressStep,
  ProgressDot,
  ProgressBar,
  StepIndicatorLabelsContainer,
  ProgressStepLabels,
};
