import styled from 'styled-components/native';

export const OutfitProductContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colorPalette.gray[500]};
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export const DetailsContainer = styled.View`
  width: 50%;
  padding-left: 10px;
`;

export const ImageContainer = styled.View`
  width: 50%;
  padding-right: 10px;
`;

export const DiscountedPriceContainer = styled.View`
  flex-direction: row;
`;

export const FavoriteView = styled.View`
  width: 25px;
`;

export const OutfitProductWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
