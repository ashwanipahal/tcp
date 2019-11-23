import styled from 'styled-components/native';

export const OutfitProductContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colorPalette.gray[500]};
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 100%;
`;

export const DetailsContainer = styled.View`
  width: 55%;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ImageContainer = styled.View`
  width: 30%;
  align-items: center;
`;

export const DiscountedPriceContainer = styled.View`
  flex-direction: row;
`;

export const FavoriteView = styled.View`
  width: 15%;
  align-items: center;
`;

export const OutfitProductWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
