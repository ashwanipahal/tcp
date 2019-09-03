import styled, { css } from 'styled-components/native';

const ListContainer = styled.View`
  width: 50%;
  height: 428;
  background: white;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const FavoriteIconContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Badge1Container = styled.View`
  height: 14;
`;

const Badge1Text = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  color: ${props => props.theme.colorPalette.gray[900]};
  line-height: 12;
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
`;

const Badge2Container = styled.View`
  height: 14;
`;

const Badge2Text = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  color: ${props => props.theme.colorPalette.gray[900]};
  line-height: 12;
  font-weight: ${props => props.theme.typography.fontWeights.black};
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
  line-height: 18;
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

const TitleContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  height: 32;
`;

const TitleText = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  color: ${props => props.theme.colorPalette.gray[900]};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  line-height: 14.4;
`;

const PromotionalMessageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: 24;
`;

// Color is hard code as not in the style guide
const PromotionalMessage = styled.Text`
  color: ${props =>
    props.isPlcc
      ? props.theme.colorPalette.userTheme.plcc
      : props.theme.colorPalette.userTheme.mpr};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs9};
  line-height: 11;
`;

const PromotionalMessagePostfix = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
`;

const AddToBagContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const styles = css``;

export {
  styles,
  ListContainer,
  FavoriteIconContainer,
  Badge1Container,
  Badge1Text,
  Badge2Container,
  Badge2Text,
  PricesSection,
  OfferPriceAndBadge3Container,
  ListPrice,
  ListOfferPrice,
  Badge3Text,
  TitleContainer,
  TitleText,
  PromotionalMessageContainer,
  PromotionalMessage,
  AddToBagContainer,
  PromotionalMessagePostfix,
};
