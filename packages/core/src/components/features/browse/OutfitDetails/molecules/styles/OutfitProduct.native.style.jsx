import styled from 'styled-components/native';

export const OutfitProductContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colorPalette.gray[500]};
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-left: ${props => props.theme.gridDimensions.gridOffsetObj.small};
  padding-right: ${props => props.theme.gridDimensions.gridOffsetObj.small};
`;

export const DetailsContainer = styled.View`
  width: 50%;
`;

export const ImageContainer = styled.View`
  width: 50%;
`;

export const DiscountedPriceContainer = styled.View`
  flex-direction: row;
`;
