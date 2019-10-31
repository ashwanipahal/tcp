import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { ScrollViewContainer } from '../styles/OutfitDetails.native.style';
import CustomImage from '../../../../common/atoms/CustomImage';
import OutfitProduct from '../molecules/OutfitProduct/OutfitProduct.native';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';

const keyExtractor1 = (_, index) => {
  return `outfit-details-${index}`;
};

/**
 * @function renderItem populates the L1 menu item from the data passed to it
 * @param {object} item Details of the L1 menu item passed from the loop
 */
const renderItem = ({
  item,
  plpLabels,
  productsCount,
  index,
  handleAddToBag,
  addToFavorites,
  addToBagEcom,
  currentState,
  labels,
  navigation,
  isLoggedIn,
}) => {
  return (
    <OutfitProduct
      plpLabels={plpLabels}
      outfitProduct={item}
      productIndexText={`Product ${index + 1} of ${productsCount}`}
      labels={labels}
      navigation={navigation}
      addToFavorites={addToFavorites}
      isLoggedIn={isLoggedIn}
      handleAddToBag={() => {
        handleAddToBag(addToBagEcom, item, item.generalProductId, currentState);
      }}
    />
  );
};

renderItem.propTypes = {
  item: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
  productsCount: PropTypes.string,
  index: PropTypes.number,
  handleAddToBag: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.shape({}),
  labels: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoggedIn: PropTypes.bool,
};

renderItem.defaultProps = {
  item: {},
  plpLabels: {},
  productsCount: '0',
  index: 0,
  currentState: null,
  labels: {},
  navigation: {},
  isLoggedIn: false,
};

const OutfitDetailsView = props => {
  const {
    outfitImageUrl,
    outfitProducts,
    plpLabels,
    handleAddToBag,
    addToFavorites,
    addToBagEcom,
    currentState,
    labels,
    isPickupModalOpen,
    navigation,
    isLoggedIn,
  } = props;
  return (
    <ScrollViewContainer>
      <CustomImage url={outfitImageUrl} width="100%" />
      <FlatList
        data={outfitProducts}
        keyExtractor={keyExtractor1}
        listKey={(_, index) => `outfit-details-list-${index}`}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            plpLabels,
            productsCount: outfitProducts.length,
            index,
            handleAddToBag,
            addToFavorites,
            addToBagEcom,
            currentState,
            labels,
            navigation,
            isLoggedIn,
          })
        }
      />
      {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
      <AddedToBagContainer />
    </ScrollViewContainer>
  );
};

OutfitDetailsView.propTypes = {
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
  item: PropTypes.shape({}),
  handleAddToBag: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}),
  isPickupModalOpen: PropTypes.bool,
  navigation: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool,
};

OutfitDetailsView.defaultProps = {
  outfitImageUrl: '',
  outfitProducts: null,
  plpLabels: {},
  item: PropTypes.shape({}),
  labels: {},
  isPickupModalOpen: false,
  navigation: {},
  isLoggedIn: false,
};

export default OutfitDetailsView;
