import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 14px;
  margin-top: 22px;
  margin-bottom: 22px;
  background: ${props =>
    props.background === 'red' ? '#f53d3d' : props.theme.colorPalette.primary.dark};
`;
export const PromoTextBannerWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;
export const ButtonContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;
export const ContainerView = styled.View``;
export const Border = styled.View`
  height: 1px;
  background: ${props =>
    props.background === 'red'
      ? props.theme.colorPalette.secondary.dark
      : props.theme.colorPalette.primary.dark};
`;

export const DivImageCTAContainer = styled.View`
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export default {
  Container,
  PromoTextBannerWrapper,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
};
