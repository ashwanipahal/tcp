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

const OfferPriceAndBadge3View = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const TitleContainer = styled.TouchableOpacity`
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
  TitleContainer,
  TitleText,
  AddToBagContainer,
  OfferPriceAndFavoriteIconContainer,
  ImageSectionContainer,
  RowContainer,
  OfferPriceAndBadge3View,
};
