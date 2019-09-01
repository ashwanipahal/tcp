import styled from 'styled-components/native';

export const CheckoutProgressBar = styled.View`
  padding-bottom: 10px;
`;

export const StepIndicatorContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 13px 0 0 35px;
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
  height: 1px;
`;

export const StepIndicatorLabelsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 25px 6px;
`;

export const ProgressStepLabels = styled.View`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: ${props => props.theme.typography.fontSizes.fs10};
`;

export const ProgressDotIcon = styled.Image`
  width: 22px;
  height: 22px;
`;

export const StyledDisableLabels = styled.Text`
  color: ${props => props.theme.colors.TEXT.DARK};
`;

export default {
  StepIndicatorContainer,
  ProgressStep,
  ProgressDot,
  ProgressBar,
  StepIndicatorLabelsContainer,
  ProgressStepLabels,
  StyledDisableLabels,
  CheckoutProgressBar,
};
