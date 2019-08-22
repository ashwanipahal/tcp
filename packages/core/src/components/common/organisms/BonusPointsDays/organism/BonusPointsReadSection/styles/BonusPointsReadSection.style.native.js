import styled from 'styled-components/native';

const BonusDayReadSection = styled.View`
  flex: 1;
`;

const BonusDayHeader = styled.View`
  flex-direction: row;
  height: 20px;
`;

const BonusDayWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const DotActive = styled.View`
  width: 11px;
  height: 11px;
  border-radius: 5px;
  margin: 5px;
  background-color: ${props => props.theme.colorPalette.gray[600]};
`;

const DotInactive = styled.View`
  width: 11px;
  height: 11px;
  border-radius: 5px;
  margin: 5px;
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
