import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import OutfitProduct from '@tcp/core/src/components/features/browse/OutfitDetails/molecules/OutfitProduct/OutfitProduct.native';
import { getMapSliceForColorProductId } from '../../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { Container } from '../styles/BundleProductItems.style.native';

class BundleProductItems extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentColorIndex: 0,
      generalProductId: '',
    };
  }

  colorindex = (colorindex, generalProductId) => {
    this.setState({ currentColorIndex: colorindex, generalProductId });
  };

  /**
   * @function renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  renderItem = ({ item, index }) => {
    const {
      plpLabels,
      colorProductId,
      currentBundle,
      handleAddToBag,
      addToFavorites,
      addToBagEcom,
      currentState,
      labels,
      navigation,
      isLoggedIn,
      addToBagErrorId,
      addToBagError,
      toastMessage,
      isKeepAliveEnabled,
      outOfStockLabels,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
    } = this.props;

    const { currentColorIndex, generalProductId } = this.state;
    const productItem = item.products;

    // eslint-disable-next-line no-shadow
    const getColorProductId = (colorProductId, colorFitsSizesMap, currentColorIndex) => {
      return (
        (colorProductId === '' &&
          colorFitsSizesMap &&
          colorFitsSizesMap[currentColorIndex].colorProductId) ||
        colorProductId
      );
    };

    const colorProductIdValue =
      generalProductId === productItem.generalProductId
        ? getColorProductId(colorProductId, productItem.colorFitsSizesMap, currentColorIndex)
        : null;

    const colorProduct =
      productItem &&
      getMapSliceForColorProductId(productItem.colorFitsSizesMap, colorProductIdValue);

    return (
      <OutfitProduct
        toastMessage={toastMessage}
        plpLabels={plpLabels}
        outfitProduct={productItem}
        productIndexText={`Product ${index + 1} of ${currentBundle.length}`}
        labels={labels}
        navigation={navigation}
        isLoggedIn={isLoggedIn}
        handleAddToBag={() => {
          handleAddToBag(addToBagEcom, productItem, productItem.generalProductId, currentState);
        }}
        addToBagError={addToBagErrorId === productItem.generalProductId && addToBagError}
        addToFavorites={addToFavorites}
        isBundleProduct
        isKeepAliveEnabled={isKeepAliveEnabled}
        outOfStockLabels={outOfStockLabels}
        AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
        removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
        pageName="BUNDLE"
        productMiscInfo={colorProduct}
        favoriteCount={colorProduct.favoritedCount}
        colorindex={this.colorindex}
      />
    );
  };

  keyExtractor1 = (_, index) => {
    return `collection-details-${index}`;
  };

  render() {
    const { currentBundle } = this.props;
    return (
      <Container>
        <FlatList
          data={currentBundle}
          keyExtractor={this.keyExtractor1}
          listKey={(_, index) => `collection-details-list-${index}`}
          renderItem={({ item, index }) => this.renderItem({ item, index })}
        />
      </Container>
    );
  }
}

BundleProductItems.propTypes = {
  currentBundle: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  plpLabels: PropTypes.shape({}).isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool.isRequired,
  addToBagError: PropTypes.string,
  addToBagErrorId: PropTypes.string,
  toastMessage: PropTypes.func.isRequired,
  isKeepAliveEnabled: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}),
  colorProductId: PropTypes.string,
};

BundleProductItems.defaultProps = {
  labels: {},
  addToBagError: '',
  addToBagErrorId: '',
  outOfStockLabels: {},
  colorProductId: '',
};

export default BundleProductItems;
export { BundleProductItems as BundleProductItemsVanilla };
