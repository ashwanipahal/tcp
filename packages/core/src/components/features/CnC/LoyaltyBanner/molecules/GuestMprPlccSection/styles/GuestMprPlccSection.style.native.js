import styled, { css } from 'styled-components/native';

const plccMpr = props =>
  props.pageChecksObj && props.pageChecksObj.isPlcc
    ? props.theme.colorPalette.userTheme.plcc
    : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

const SubTotalLine = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[500]};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const HeadingLabel = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  font-size: ${props =>
    props.pageChecksObj && props.pageChecksObj.isPlcc
      ? props.theme.typography.fontSizes.fs12
      : props.theme.typography.fontSizes.fs16};
  color: ${props =>
    props.pageChecksObj && props.pageChecksObj.isPlcc
      ? plccMpr
      : props.theme.colorPalette.gray[900]};
  ${props =>
    props.pageChecksObj &&
    props.pageChecksObj.pageCategoryArr &&
    props.pageChecksObj.pageCategoryArr.isReviewPage
      ? `color: ${plccMpr(props)}
      font-size: ${props.theme.typography.fontSizes.fs16};
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
      font-size: ${props.theme.typography.fontSizes.fs16};
      `
      : ''}
`;

const SubHeadingLabel = styled.Text`
  color: ${plccMpr};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  ${props =>
    props.pageChecksObj &&
    props.pageChecksObj.pageCategoryArr &&
    props.pageChecksObj.pageCategoryArr.isReviewPage
      ? `color: ${props.theme.colorPalette.gray[900]};
          font-size: ${props.theme.typography.fontSizes.fs12};
          `
      : ''}
`;

const DescriptionLabel = styled.Text`
  padding: 12px 20px 0;
  font-size: 12px;
`;

const RemainingPlccLabel = styled.Text`
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS} 0;
  font-size: ${props => props.theme.typography.fontSizes.fs12};
`;

const ShowSubTotalWrapper = styled.View`
  padding: 0 5px;
`;

const CurrentTotalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
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

const PointsValueText = styled.Text`
  color: ${props => plccMpr(props)};
`;

const PointsToNextReward = styled.Text`
  color: ${props => plccMpr(props)};
`;

const SectionSymbol = styled.Text`
  color: ${props => plccMpr(props)};
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
  PointsToNextReward,
  SectionSymbol,
};
