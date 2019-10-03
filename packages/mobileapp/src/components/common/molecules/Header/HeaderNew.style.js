import styled from 'styled-components/native';
import { isDisplayWithNotch } from '@tcp/core/src/utils/dimensions';
import { isAndroid } from '@tcp/core/src/utils/utils.app';

const getAdditionalStyle = props => {
  const { theme } = props;
  const headerHeight = isDisplayWithNotch()
    ? theme.spacing.LAYOUT_SPACING.XL
    : theme.spacing.LAYOUT_SPACING.LRG;
  return {
    ...(isAndroid() && { height: headerHeight }),
  };
};

const getSafeAreaStyle = props => {
  const { theme } = props;
  return `
  background: ${theme.colorPalette.white};
  border-bottom-color: ${theme.colorPalette.gray[500]};
  border-bottom-width: 1;
  `;
};

export const SafeAreaViewStyle = styled.SafeAreaView`
  ${getSafeAreaStyle}
  ${getAdditionalStyle}
`;

export const Container = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const CartCountContainer = styled.View`
  background-color: ${props => props.theme.colorPalette.primary.dark};
  width: 22px;
  height: 22px;
  border-radius: 11;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  border: 2px solid white;
`;

export const CartIconView = styled.Image`
  width: 32px;
  height: 32px;
`;

export const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  height: 36;
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
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
