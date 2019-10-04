import styled from 'styled-components';

const PickUpSkUSectionContainer = styled.View`
  margin: 20px 32px 0 32px;
`;

const ImageWrapper = styled.View`
  margin-right: 20px;
  width: 164px;
`;
const ProductSummaryContainer = styled.View`
  flex-direction: row;
`;
const OfferPriceAndBadge3Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
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
};
