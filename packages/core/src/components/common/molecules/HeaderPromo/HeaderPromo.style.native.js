import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: ${props => props.theme.colors.PRIMARY.COLOR3};
`;
export const WrapperView = styled.TouchableOpacity``;

export const CenterView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const PromoImage = styled.Image`
  width: ${props => props.width || '6px'};
  height: ${props => props.height || '10px'};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default {
  Wrapper,
  WrapperView,
  PromoImage,
  CenterView,
};
