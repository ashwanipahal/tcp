import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 5px;
`;

export const SecondHeaderContainer = styled.View`
  margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 60%;
`;

export const PromoContainer = styled.View`
  align-items: center;
  background: ${props => props.theme.colorPalette.blue[500]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
`;

export const ButtonTabsContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ButtonContainer = styled.View`
  align-items: center;
  background-color: ${props => props.theme.colorPalette.blue[500]};
  padding: 27px 10px;
  height: ${props => props.imageDimension}px;
  width: ${props => props.imageDimension}px;
`;

export const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 14px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const Tile = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default {
  Container,
  HeaderContainer,
  SecondHeaderContainer,
  PromoContainer,
  ButtonTabsContainer,
  ButtonContainer,
  ImageContainer,
  Tile,
};
