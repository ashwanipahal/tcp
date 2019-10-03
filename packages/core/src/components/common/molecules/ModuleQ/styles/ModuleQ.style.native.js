import styled from 'styled-components/native';

import { Image } from '../../../atoms';

const TILE_SHADOW = `
  shadow-opacity: 0.15;
  shadow-radius: 2px;
  shadow-color: ${props => props.theme.colorPalette.black};
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const applyBackgroundClassStyle = props => {
  if (props.bgClass === 'yellow-bg') {
    return `
      background-color: #F5F5BE;
    `;
  }
  return '';
};

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
  ${applyBackgroundClassStyle}
`;

export const ImageSlidesWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const ImageSlideWrapper = styled.View`
  flex-direction: row;
  padding: 8px;
`;

export const OutfitItemsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const OutfitMainImageWrapper = styled.View`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const OutfitMainTileWrapper = styled.View`
  padding: ${props =>
    `${props.theme.spacing.ELEM_SPACING.XS} ${props.theme.spacing.ELEM_SPACING.MED} ${
      props.theme.spacing.ELEM_SPACING.XS
    }`};
  background-color: ${props => props.theme.colorPalette.white};
  ${TILE_SHADOW}
`;

export const OutfitItemTileWrapper = styled.View`
  padding: 4px 3px;
  background-color: ${props => props.theme.colorPalette.white};
  ${TILE_SHADOW}
`;

export const RestOutfitItemCountWrapper = styled.View`
  width: ${props => props.width};
  height: ${props => props.height};
  justify-content: center;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: contain;
`;

export const ImageItemWrapper = styled.View`
  flex-direction: row;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const Wrapper = styled.View`
  width: 100%;
`;

export const PromoContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const SecondHeaderContainer = styled.View`
  padding: ${props =>
    `${props.theme.spacing.ELEM_SPACING.SM} ${props.theme.spacing.ELEM_SPACING.XL} ${
      props.theme.spacing.ELEM_SPACING.LRG
    }`};
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;

  ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const ProductTabListContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default {
  Container,
  ImageItemWrapper,
  ButtonContainer,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  OutfitItemsWrapper,
  OutfitMainTileWrapper,
  OutfitItemTileWrapper,
  OutfitMainImageWrapper,
  RestOutfitItemCountWrapper,
  StyledImage,
  PromoContainer,
  MessageContainer,
  ProductTabListContainer,
  Wrapper,
};
