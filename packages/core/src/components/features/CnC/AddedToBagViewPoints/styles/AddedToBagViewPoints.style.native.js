import styled from 'styled-components/native';

const ViewPointsWrapper = styled.View`
  display: flex;
  margin: 0 10px;
`;

const DefaultView = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const DefaultText = styled.Text`
  color: ${props => props.theme.colorPalette.black};
  font-size: ${props => props.theme.typography.fontSizes.fs13};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

const DefaultLabel = styled.Text`
  flex: 1;
`;

const DefaultValue = styled.Text``;

const BoldText = styled.Text`
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  flex: 1;
`;

const PromoValue = styled.Text`
  color: ${props => props.theme.colors.PROMO.YELLOW};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
`;
const BoldValue = styled.Text`
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
`;

const Horizontal = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.PRIMARY.DARK};
  margin-bottom: 10px;
`;

export {
  DefaultView,
  DefaultLabel,
  ViewPointsWrapper,
  DefaultValue,
  BoldValue,
  PromoValue,
  BoldText,
  DefaultText,
  Horizontal,
};
