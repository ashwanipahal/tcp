import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ScrollView } from 'react-native';
import withStyles from '../../../../common/hoc/withStyles';
import OutfitDetailsStyle from '../styles/OutfitDetails.native.style';
import CustomImage from '../../../../common/atoms/CustomImage';
import OutfitProduct from '../molecules/OutfitProduct/OutfitProduct.native';

const keyExtractor1 = (_, index) => {
  console.log('asdfsd', `outfit-details-${index}`);
  return `outfit-details-${index}`;
};

/**
 * @function renderItem populates the L1 menu item from the data passed to it
 * @param {object} item Details of the L1 menu item passed from the loop
 */
const renderItem = (item, plpLabels, productsCount, index) => {
  return (
    <OutfitProduct
      plpLabels={plpLabels}
      outfitProduct={item}
      productIndexText={`Product ${index + 1} of ${productsCount}`}
    />
  );
};

const OutfitDetailsView = ({ outfitImageUrl, outfitProducts, plpLabels }) => {
  return (
    <ScrollView>
      <CustomImage url={outfitImageUrl} width="100%" />
      <FlatList
        data={outfitProducts}
        keyExtractor={keyExtractor1}
        listKey={(_, index) => `outfit-details-list-${index}`}
        renderItem={({ item, index }) => renderItem(item, plpLabels, outfitProducts.length, index)}
      />
    </ScrollView>
  );
};

OutfitDetailsView.propTypes = {
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
};

OutfitDetailsView.defaultProps = {
  outfitImageUrl: '',
  outfitProducts: null,
  plpLabels: {},
};

export default withStyles(OutfitDetailsView, OutfitDetailsStyle);
