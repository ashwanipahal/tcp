import styled from 'styled-components/native';

export const SafeAreaViewStyle = styled.SafeAreaView`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  background: ${props => props.theme.colorPalette.white};
  min-height: ${props => props.theme.spacing.LAYOUT_SPACING.LRG1};
`;

export const Container = styled.View`
  flex-direction: row;
`;

export const BackgroundView = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  width: 22px;
  height: 22px;
  border-radius: 11;
  position: absolute;
  margin-top: 14px;
`;

export const RoundView = styled.View`
  background-color: ${props => props.theme.colorPalette.primary.dark};
  width: 20px;
  height: 20px;
  border-radius: 10;
  position: absolute;
  margin-top: 14px;
`;

export const CartIconView = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const TextStyle = { position: 'absolute', marginTop: 18, paddingRight: 5.6 };

export const Touchable = styled.TouchableOpacity`
  align-items: flex-end;
  align-self: flex-end;
  width: 45px;
`;

export const LeftSection = styled.View`
  justify-content: center;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 20%;
  height: 100%;
`;
export const MiddleSection = styled.View`
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;
export const RightSection = styled.View`
  width: 20%;
  height: 100%;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const TitleText = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  line-height: 14.5;
`;
