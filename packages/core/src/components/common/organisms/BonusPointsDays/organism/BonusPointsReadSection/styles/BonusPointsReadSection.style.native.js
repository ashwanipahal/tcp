import styled from 'styled-components/native';

const BonusDayReadSection = styled.View`
  flex: 1;
`;

const BonusDayHeader = styled.View`
  flex-direction: row;
  height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const BonusDayWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Circle = styled.View`
  width: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.SM / 2};
  margin: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const DotActive = styled(Circle)`
  background-color: ${props => props.theme.colorPalette.gray[600]};
`;

const DotInactive = styled(Circle)`
  background-color: ${props =>
    props.isPlcc
      ? props.theme.colorPalette.userTheme.plcc
      : props.theme.colorPalette.userTheme.mpr};
`;

const LeftHeaderContainer = styled.View`
  flex: 1.5;
  flex-direction: row;
  justify-content: flex-start;
`;

const RightHeaderContainer = styled.View`
  flex: 0.5;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export {
  BonusDayReadSection,
  BonusDayHeader,
  LeftHeaderContainer,
  RightHeaderContainer,
  BonusDayWrapper,
  DotActive,
  DotInactive,
};
