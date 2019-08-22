import styled from 'styled-components/native';

const BonusDayReadSection = styled.View`
  flex: 1;
  border: 1px solid red;
`;

const BonusDayHeader = styled.View`
  flex-direction: row;
  height: 20px;
  border: 1px solid green;
`;

const BonusDayWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  border: 1px solid blue;
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
  background-color: ${props => props.theme.colorPalette.userTheme.mpr};
`;

const LinkWrapper = styled.View`
  justify-content: flex-end;
`;

export {
  BonusDayReadSection,
  BonusDayHeader,
  BonusDayWrapper,
  DotActive,
  DotInactive,
  LinkWrapper,
};
