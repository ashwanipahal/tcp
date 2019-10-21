import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import PageContainer from '../styles/ Favorites.style.native';
import ProductListing from '../../ProductListing/views';

class FavoritesView extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  handleEditList = () => {};

  render() {
    const {
      activeDisplayName,
      activeWishListProducts,
      totalProductsCount,
      navigation,
      filters,
      currencySymbol,
      labels,
      selectedColorProductId,
      onGoToPDPPage,
      onQuickViewOpenClick,
      setLastDeletedItemId,
    } = this.props;
    return (
      <PageContainer>
        <BodyCopy
          margin="40px 0 0 0"
          dataLocator="pdp_write_review_icon"
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          color="gray.900"
          text="MY FAVORITES"
        />
        <LineComp borderWidth="2" marginTop="12" borderColor="black" />
        <BodyCopy
          margin="32px 0 0 0"
          dataLocator="pdp_write_review_icon"
          mobileFontFamily="secondary"
          fontSize="fs24"
          fontWeight="regular"
          color="gray.900"
          text={activeDisplayName}
          textAlign="center"
        />
        <LineComp borderWidth="1" marginTop="4" borderColor="gray.600" />
        <Anchor
          locator="pdp_write_review_icon"
          accessibilityRole="link"
          accessibilityLabel="Edit List Settings"
          text="Edit List Settings"
          anchorVariation="custom"
          colorName="gray.900"
          fontSizeVariation="large"
          onPress={this.handleEditList}
          centered
          underline
          margins="12px 0 0 0"
        />
        <ProductListing
          products={activeWishListProducts}
          filters={filters}
          totalProductsCount={totalProductsCount}
          filtersLength={0}
          navigation={navigation}
          onGoToPDPPage={onGoToPDPPage}
          isFavorite
          currencySymbol={currencySymbol}
          labels={labels}
          onQuickViewOpenClick={onQuickViewOpenClick}
          selectedColorProductId={selectedColorProductId}
          setLastDeletedItemId={setLastDeletedItemId}
        />
      </PageContainer>
    );
  }
}

FavoritesView.propTypes = {
  // eslint-disable-next-line
  wishlistsSummaries: PropTypes.arrayOf({}).isRequired,
  activeWishList: PropTypes.shape({}).isRequired,
  // eslint-disable-next-line
  activeWishListId: PropTypes.number.isRequired,
  activeWishListProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeDisplayName: PropTypes.string.isRequired,
  filters: PropTypes.shape({}),
  totalProductsCount: PropTypes.number.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  selectedColorProductId: PropTypes.string,
  onGoToPDPPage: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
};

FavoritesView.defaultProps = {
  filters: {},
  currencySymbol: '$',
  labels: {},
  selectedColorProductId: '',
};

export default FavoritesView;

export { FavoritesView as FavoritesViewVanilla };
