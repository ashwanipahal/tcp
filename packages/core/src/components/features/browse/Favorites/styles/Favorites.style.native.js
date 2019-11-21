import styled from 'styled-components';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const PageContainer = styled.View`
  justify-content: center;
`;

const BrandFilterContainer = styled.View`
  position: absolute;
  ${getAdditionalStyle};
`;

const RowContainer = styled.View`
  flex-direction: row;
  ${getAdditionalStyle}
`;

const NoFavoriteContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const RecommendationWrapper = styled.View`
  margin-left: -${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const DropDownContainer = styled.View`
  margin-top: 12px;
`;

const ShareDropDownContainer = styled.View`
  align-self: flex-end;
`;

const ListHeaderContainer = styled.View`
  background-color: ${props => props.theme.colors.WHITE};
`;

const ListFooterContainer = styled.View`
  padding: 12px;
  background-color: ${props => props.theme.colors.WHITE};
`;

const DropDownWishlistItemContainer = styled.TouchableOpacity.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
  activeOpacity: 1,
})`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  background-color: ${props => props.theme.colors.WHITE};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const SelectedWishlistContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
`;

const ItemCountContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export {
  PageContainer,
  BrandFilterContainer,
  RowContainer,
  NoFavoriteContainer,
  RecommendationWrapper,
  DropDownContainer,
  ShareDropDownContainer,
  ListHeaderContainer,
  ListFooterContainer,
  DropDownWishlistItemContainer,
  SelectedWishlistContainer,
  ItemCountContainer,
};
