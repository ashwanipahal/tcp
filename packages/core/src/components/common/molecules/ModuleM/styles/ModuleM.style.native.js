import styled from 'styled-components/native';
import { DamImage } from '../../../atoms';
/*
    This method is responsible to return the last image index
    of row on the basis of images length
  */
const getIndexes = totalImages => {
  const indexes = [];
  if (totalImages === 2 || totalImages === 3) {
    indexes.push(1);
  } else if (totalImages === 4 || totalImages === 5) {
    indexes.push(2);
  } else {
    indexes.push(2, 5);
  }
  return indexes;
};

export const StyledDamImage = styled(DamImage)`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  border-radius: ${props => (props.theme.isGymboree ? `50px` : `0`)};
`;

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 5px;
  padding: 0 14px;
`;

export const SecondHeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 12px;
`;

export const PromoContainer = styled.View`
  align-items: center;
  background: ${props => props.theme.colorPalette.blue[500]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
`;

export const ButtonTabsContainer = styled.View`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0
    ${props =>
      props.imageCount === 3
        ? props.theme.spacing.ELEM_SPACING.XXL
        : props.theme.spacing.ELEM_SPACING.SM};
  background-color: ${props => props.theme.colorPalette.blue[500]};
  height: ${props => props.imageDimension}px;
  width: ${props => props.imageDimension}px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 14px;
`;

export const Tile = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-right: ${props => (getIndexes(props.imageCount).includes(props.tileIndex) ? `0` : `10px`)};
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
  StyledDamImage,
};
