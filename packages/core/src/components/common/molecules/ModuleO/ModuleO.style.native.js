import styled from 'styled-components/native';

const OfferPriceAndFavoriteIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PricesSection = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const OfferPriceAndBadge3Container = styled.View`
  flex-direction: row;
`;

// Color is hard code as not in the style guide
const ListPrice = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs15};
  color: ${props => props.theme.colorPalette.red[500]};
  line-height: 22;
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

const ListOfferPrice = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  color: ${props => props.theme.colorPalette.gray[800]};
  line-height: 12;
  text-decoration-line: line-through;
`;

// Color is hard code as not in the style guide
const Badge3Text = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  color: #c01f1f;
  line-height: 12;
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const AddToBagContainer = styled.View`
  margin-top: auto;
`;

const StyledImage = styled.Image`
  max-height: 205;
`;

const Container = styled.View``;

export {
  PricesSection,
  OfferPriceAndBadge3Container,
  ListPrice,
  ListOfferPrice,
  Badge3Text,
  AddToBagContainer,
  OfferPriceAndFavoriteIconContainer,
  StyledImage,
  Container,
};
