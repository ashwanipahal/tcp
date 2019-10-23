import styled from 'styled-components';

const PickUpSkUSectionContainer = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.XS} 0px
    ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin: 0;
  ${props =>
    props.formEnabled
      ? `
    opacity: 1;
  `
      : `
    background-color: ${props.theme.colorPalette.gray[500]};
    z-index: ${props.theme.zindex.zModal};
    opacity: 0.25;
  `}
`;

const ImageWrapper = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 161px;
  align-items: center;
`;

const MultiItemQVWrapper = styled.View``;

const ProductSummaryContainer = styled.View`
  flex-direction: row;
  padding-right: ${props =>
    props.isMultiItemQVModal ? props.theme.spacing.ELEM_SPACING.XXL : '0px'};
`;
const OfferPriceAndBadge3Container = styled.View``;

const ListPriceAndBadgeContainer = styled.View`
  flex-direction: row;
`;
const ProductDetailSummary = styled.View`
  flex-wrap: wrap;
  flex: 1;
`;
const InputCheckboxWrapper = styled.View`
  position: relative;
  background-color: ${props => props.theme.colors.WHITE};
  width: 25px;
  margin-top: -25px;
  top: 26px;
  left: 90 %;
  z-index: ${props => props.theme.zindex.zModal + 1};
`;

export {
  PickUpSkUSectionContainer,
  MultiItemQVWrapper,
  ImageWrapper,
  ProductSummaryContainer,
  ProductDetailSummary,
  OfferPriceAndBadge3Container,
  ListPriceAndBadgeContainer,
  InputCheckboxWrapper,
};
