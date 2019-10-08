import styled from 'styled-components';

const PickUpSkUSectionContainer = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
`;

const ImageWrapper = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 161px;
  align-items: center;
`;
const ProductSummaryContainer = styled.View`
  flex-direction: row;
`;
const OfferPriceAndBadge3Container = styled.View``;

const ListPriceAndBadgeContainer = styled.View`
  flex-direction: row;
`;
const ProductDetailSummary = styled.View`
  flex-wrap: wrap;
  flex: 1;
`;

export {
  PickUpSkUSectionContainer,
  ImageWrapper,
  ProductSummaryContainer,
  ProductDetailSummary,
  OfferPriceAndBadge3Container,
  ListPriceAndBadgeContainer,
};
