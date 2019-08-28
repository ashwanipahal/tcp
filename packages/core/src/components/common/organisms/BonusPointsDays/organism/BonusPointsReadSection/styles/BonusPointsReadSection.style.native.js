import styled from 'styled-components/native';

// Spacing.js not having near pixel values.
const BonusDayReadSection = styled.View`
  height: 80px;
`;

const BonusDayHeader = styled.View`
  flex-direction: row;
`;

const BonusDayWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`;

// Making Height Width as pixel perfect, otherwise doesn't match with the zeplin.
const Circle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const DotActive = styled(Circle)`
  background-color: ${props => props.theme.colorPalette.userTheme.mpr};
`;

const DotActivePlcc = styled(Circle)`
  background-color: ${props => props.theme.colorPalette.userTheme.plcc};
`;

const DotInactive = styled(Circle)`
  background-color: ${props => props.theme.colorPalette.gray[600]};
`;

const LeftHeaderContainer = styled.View`
  flex: 1.7;
  flex-direction: row;
  justify-content: flex-start;
`;

const RightHeaderContainer = styled.View`
  flex: 0.3;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-bottom-width: 1px;
`;

export {
  BonusDayReadSection,
  BonusDayHeader,
  LeftHeaderContainer,
  RightHeaderContainer,
  BonusDayWrapper,
  DotActive,
  DotInactive,
  DotActivePlcc,
};
