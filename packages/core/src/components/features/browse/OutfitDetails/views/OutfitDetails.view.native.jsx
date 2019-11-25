import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { ScrollViewContainer, RecommendationWrapper } from '../styles/OutfitDetails.native.style';
import CustomImage from '../../../../common/atoms/CustomImage';
import OutfitProduct from '../molecules/OutfitProduct/OutfitProduct.native';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import Recommendations from '../../../../../../../mobileapp/src/components/common/molecules/Recommendations';

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
  toastMessage,
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
      toastMessage={toastMessage}
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
    outfitId,
    pdpLabels,
    unavailableCount,
    toastMessage,
  } = props;
  const recommendationAttributes = {
    variation: 'moduleO',
    navigation,
    page: Constants.RECOMMENDATIONS_PAGES_MAPPING.OUTFIT,
    partNumber: outfitId,
    isHeaderAccordion: true,
  };
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
            toastMessage,
          })
        }
      />
      {!!unavailableCount && (
        <BodyCopyWithSpacing
          spacingStyles="margin-top-XS margin-bottom-MED"
          fontSize="fs16"
          fontFamily="secondary"
          text={`${unavailableCount} ${labels.lbl_outfit_unavailable}`}
        />
      )}
      <RecommendationWrapper>
        <Recommendations {...recommendationAttributes} />
        <Recommendations
          isRecentlyViewed
          {...recommendationAttributes}
          headerLabel={pdpLabels.recentlyViewed}
          portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
        />
      </RecommendationWrapper>

      {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
    </ScrollViewContainer>
  );
};

OutfitDetailsView.propTypes = {
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
  unavailableCount: PropTypes.number,
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
  outfitId: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  toastMessage: PropTypes.func,
};

OutfitDetailsView.defaultProps = {
  outfitImageUrl: '',
  outfitProducts: null,
  unavailableCount: 0,
  plpLabels: {},
  item: PropTypes.shape({}),
  labels: {},
  isPickupModalOpen: false,
  navigation: {},
  isLoggedIn: false,
  outfitId: '',
  pdpLabels: {},
  toastMessage: () => {},
};

export default OutfitDetailsView;
export { OutfitDetailsView as OutfitDetailsViewVanilla };
