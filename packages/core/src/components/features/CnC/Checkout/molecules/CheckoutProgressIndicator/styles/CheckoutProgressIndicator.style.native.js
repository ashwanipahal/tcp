import styled from 'styled-components/native';

export const CheckoutProgressBar = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 15%
    ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const StepIndicatorContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

export const ProgressStep = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const ProgressDot = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  width: 20px;
  height: 20px;
  border-radius: 10;
  border-width: 1;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ProgressBar = styled.View`
  background-color: ${props => props.theme.colorPalette.black};
  flex: 1;
  height: 1px;
  width: 40px;
`;

export const StepIndicatorLabelsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin: 0;
`;

export const StyledAnchor = styled.View`
  top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  position: absolute;
  width: 70px;
  left: -${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const ProgressStepLabels = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: left;
  font-size: ${props => props.theme.typography.fontSizes.fs10};
`;

export const ProgressDotIcon = styled.Image`
  width: 22px;
  height: 22px;
`;

export const StyledDisableLabels = styled.Text`
  color: ${props => props.theme.colors.TEXT.DARK};
  position: absolute;
  top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  left: -${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 70px;
`;

export const ProgressDotActive = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  width: 20px;
  height: 20px;
  border-radius: 10;
  border-width: 2;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StyledAnchorCompleted = styled.View`
  position: absolute;
  top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  width: 70px;
  left: -${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export default {
  StepIndicatorContainer,
  ProgressStep,
  ProgressDot,
  ProgressDotActive,
  ProgressBar,
  StepIndicatorLabelsContainer,
  ProgressStepLabels,
  StyledDisableLabels,
  CheckoutProgressBar,
  StyledAnchor,
  StyledAnchorCompleted,
};
