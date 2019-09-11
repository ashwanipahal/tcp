import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderWrapper = styled.View`
  ${props =>
    props.bannerPosition === 'overlay'
      ? `
    position: absolute;
    z-index: ${props.theme.zindex.zOverlay};
    align-items: center;
    background: ${props.theme.colorPalette.white};
    width: 186px;
    padding: 10px 10px 0px;
  `
      : `
    margin-top: ${props.theme.spacing.LAYOUT_SPACING.XXS};
    width: 100%;
  `};
`;

export const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
export const MainContainerView = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ContainerView = styled.View``;

export const Border = styled.View`
  height: 1px;
  background: ${props =>
    props.background === 'text'
      ? props.theme.colors.BUTTON.WHITE.BORDER
      : props.theme.colors.BUTTON.WHITE.TEXT};
`;

export const DivImageCTAContainer = styled.View``;
export const SeparatorView = styled.View`
  margin: -10px 20px 10px;
  height: 1px;
  width: 150px;
  background: ${props => props.theme.colorPalette.black};
`;

export default {
  Container,
  HeaderWrapper,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  SeparatorView,
  MainContainerView,
};
