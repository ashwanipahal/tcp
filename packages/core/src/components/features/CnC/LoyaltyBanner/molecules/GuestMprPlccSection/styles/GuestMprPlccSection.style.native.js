import styled, { css } from 'styled-components/native';

const plccMpr = props =>
  props.pageChecksObj && props.pageChecksObj.isPlcc
    ? props.theme.colorPalette.userTheme.plcc
    : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  padding: 2px;
`;

const SubTotalLine = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[500]};
  margin-top: 12px;
`;

const HeadingLabel = styled.Text`
  padding-top: 12px;
  font-size: ${props => (props.pageChecksObj && props.pageChecksObj.isPlcc ? '12px;' : '16px;')};
  color: ${props =>
    props.pageChecksObj && props.pageChecksObj.isPlcc
      ? plccMpr
      : props.theme.colorPalette.gray[900]};
  ${props =>
    props.pageChecksObj &&
    props.pageChecksObj.pageCategoryArr &&
    props.pageChecksObj.pageCategoryArr.isReviewPage
      ? `color: ${plccMpr(props)}
      font-size: 16px;
      `
      : ''}
  ${props =>
    props.pageChecksObj &&
    props.pageChecksObj.pageCategoryArr &&
    props.pageChecksObj.pageCategoryArr.isConfirmationPage
      ? `${
          !props.pageChecksObj.earnedRewardAvailable && props.pageChecksObj.isGuest
            ? `color: ${props.theme.colorPalette.gray[900]};`
            : `color: ${plccMpr(props)}`
        }
      font-size: 16px;
      `
      : ''}
`;

const PointsValueText = styled.Text`
  color: ${props => plccMpr(props)};
`;

const SubHeadingLabel = styled.Text`
  color: ${plccMpr};
  padding-top: 12px;
  ${props =>
    props.pageChecksObj &&
    props.pageChecksObj.pageCategoryArr &&
    props.pageChecksObj.pageCategoryArr.isReviewPage
      ? `color: ${props.theme.colorPalette.gray[900]};
          font-size: 12px;
          `
      : ''}
`;

const DescriptionLabel = styled.Text`
  padding: 12px 20px 0;
  font-size: 12px;
`;

const RemainingPlccLabel = styled.Text`
  padding: 12px 20px 0;
  font-size: 12px;
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
