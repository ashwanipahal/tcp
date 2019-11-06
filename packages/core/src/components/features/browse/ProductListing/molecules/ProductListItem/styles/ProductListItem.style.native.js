import styled, { css } from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margins, paddings } = props;
  return {
    ...(margins && { margin: margins }),
    ...(paddings && { padding: paddings }),
  };
};

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  ${getAdditionalStyle}
`;

const ListContainer = styled.View`
  width: ${props => (props.fullWidth ? '100%' : '48%')};
  ${props => (!props.renderPriceAndBagOnly ? `min-height: 412;` : ``)}
  background: white;
  ${getAdditionalStyle};
`;

const FavoriteIconContainer = styled.View``;

const OfferPriceAndFavoriteIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
const ListOfferPrice = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs15};
  color: ${props => props.theme.colorPalette.red[500]};
  line-height: 22;
  font-weight: ${props => props.theme.typography.fontWeights.black};
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

const TitleContainer = styled.TouchableOpacity`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  height: 32;
`;

const TitleText = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  color: ${props => props.theme.colorPalette.gray[900]};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  line-height: 14.4;
`;

const AddToBagContainer = styled.View`
  margin-top: auto;
`;

const ImageSectionContainer = styled.View`
  max-height: 205;
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
  ListOfferPrice,
  Badge3Text,
  TitleContainer,
  TitleText,
  AddToBagContainer,
  OfferPriceAndFavoriteIconContainer,
  ImageSectionContainer,
  RowContainer,
};
