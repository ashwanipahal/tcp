import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import OutfitProduct from '@tcp/core/src/components/features/browse/OutfitDetails/molecules/OutfitProduct/OutfitProduct.native';
import { Container } from '../styles/BundleProductItems.style.native';

class BundleProductItems extends React.PureComponent {
  /**
   * @function renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  renderItem = ({ item, index }) => {
    const {
      plpLabels,
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
    } = this.props;
    const productItem = item.products;
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
        addToFavorites={() => {
          addToFavorites({ colorProductId: productItem.generalProductId });
        }}
        isBundleProduct
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
};

BundleProductItems.defaultProps = {
  labels: {},
  addToBagError: '',
  addToBagErrorId: '',
};

export default BundleProductItems;
export { BundleProductItems as BundleProductItemsVanilla };
