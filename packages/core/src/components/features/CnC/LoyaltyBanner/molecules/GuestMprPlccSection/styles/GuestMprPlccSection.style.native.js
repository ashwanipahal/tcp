import styled, { css } from 'styled-components';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  padding: 2px;
`;

const SubTotalLine = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[500]};
  margin-top: 12px;
`;

const HeadingLabel = styled.Text`
  padding: 12px 45px 0;
`;

const PointsValueText = styled.Text`
  color: ${plccMpr};
`;

const SubHeadingLabel = styled.Text`
  color: ${plccMpr};
  padding-top: 12px;
`;

const DescriptionLabel = styled.Text`
  padding: 12px 20px 0;
`;

const RemainingPlccLabel = styled.Text`
  padding: 12px 20px 0;
`;

const ShowSubTotalWrapper = styled.View`
  padding: 0 5px;
`;

const CurrentTotalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
`;

const SubTotalLabel = styled.Text`
  color: ${props => props.theme.colorPalette.gray[800]};
`;

const SubTotalValue = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
`;

const EstimatedSubTotalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const EstimatedSubTotalLabel = styled.Text`
  max-width: 200px;
  color: ${props => props.theme.colorPalette.gray[800]};
`;

const EstimatedSubTotalValue = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
`;

export {
  Styles,
  SubTotalLine,
  HeadingLabel,
  PointsValueText,
  SubHeadingLabel,
  DescriptionLabel,
  RemainingPlccLabel,
  ShowSubTotalWrapper,
  CurrentTotalWrapper,
  SubTotalLabel,
  SubTotalValue,
  EstimatedSubTotalWrapper,
  EstimatedSubTotalLabel,
  EstimatedSubTotalValue,
};
