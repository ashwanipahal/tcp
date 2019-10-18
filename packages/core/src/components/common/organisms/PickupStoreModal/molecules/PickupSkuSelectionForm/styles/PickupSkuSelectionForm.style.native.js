import styled from 'styled-components';

const PickUpSkUSectionContainer = styled.View`
  margin: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS} 0;
`;

const ImageWrapper = styled.View`
  margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
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
