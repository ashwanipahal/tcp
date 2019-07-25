/* eslint-disable */
/* dummy plp page | TODO: eslint fixes*/

import React from 'react';
import { Text, FlatList, Image, View, Picker } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import { parseProductFromAPI } from '../../ProductListingPage/container/ProductListingPage.dataMassage';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import { getImgPath } from '../../ProductListingPage/util/utility';
import ProductListingPageStyle from '../styles/ProductListingPage.style.native';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import ProductTile from '../molecules/ProductTile.view';

export class ProductListView extends React.Component {
  getPDPObject(item) {
    const pdpObj = parseProductFromAPI(item, item.uniqueId, false, getImgPath, false, false);
    const {
      product: { colorFitsSizesMap },
    } = pdpObj;
    const { color, fits, hasFits } = colorFitsSizesMap[0];
    const selectedColor = color.name;
    const selectedFit = hasFits ? fits[0].fitName : '';
    const selectedSize = fits[0].sizes[0].sizeName;

    const formData = {
      size: selectedSize,
      fit: selectedFit,
      color: selectedColor,
      wishlistItemId: false,
    };
    return { formData, product: pdpObj.product };
  }

  addToBagEcom = (item, newQuantity) => {
    const { addToCartEcom } = this.props;
    const quantity = newQuantity;
    let { product, formData } = this.getPDPObject(item);
    formData = {
      ...formData,
      quantity,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addToCartEcom(cartItemInfo);
  };

  addToBagBossBopis = (item, isBoss, quantity, newStoreId) => {
    const { addItemToCartBopis } = this.props;
    const storeId = newStoreId;
    let { product, formData } = this.getPDPObject(item);
    formData = {
      ...formData,
      quantity,
      isBoss,
      storeLocId: storeId,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addItemToCartBopis(cartItemInfo);
  };

  render() {
    const { data, className, addToCartEcom } = this.props;
    return (
      <React.Fragment>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>PLP-Page</Text>
        <FlatList
          className="product-wrapper"
          data={data}
          renderItem={({ item }) => (
            <ProductTile
              item={item}
              addToBagEcom={this.addToBagEcom}
              addToBagBossBopis={this.addToBagBossBopis}
            />
          )}
          numColumns={2}
        />
      </React.Fragment>
    );
  }
}
