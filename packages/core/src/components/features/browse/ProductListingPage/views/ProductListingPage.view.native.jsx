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
import ProductTile from '../molecules/ProductTile.view.native';
import OrderLedgerContainer from '../../../CnC/BagPage/organisms/OrderLedger';

export class ProductListView extends React.Component {
  addToBagEcom = (product, quantity, brand, formData) => {
    const { addToCartEcom } = this.props;
    formData = {
      ...formData,
      quantity,
      brand,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addToCartEcom(cartItemInfo);
  };

  addToBagBossBopis = (product, isBoss, quantity, storeId, brand, formData) => {
    const { addItemToCartBopis } = this.props;
    formData = {
      ...formData,
      quantity,
      isBoss,
      brand: isBoss ? brand : 'tcp',
      storeLocId: storeId,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addItemToCartBopis(cartItemInfo);
  };

  render() {
    const { className, addToCartEcom, giftCardProducts } = this.props;
    let { data } = this.props;
    let allProducts = [];
    if (giftCardProducts.length || data.length) {
      allProducts = [...data, ...giftCardProducts];
    }

    return (
      <React.Fragment>
        <OrderLedgerContainer />
        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>PLP-Page</Text>
        <FlatList
          className="product-wrapper"
          data={allProducts}
          renderItem={({ item }) => {
            const pdpObj = parseProductFromAPI(
              item,
              item.uniqueId,
              false,
              getImgPath,
              false,
              false
            );
            return (
              <ProductTile
                item={pdpObj.product}
                addToBagEcom={this.addToBagEcom}
                addToBagBossBopis={this.addToBagBossBopis}
              />
            );
          }}
          numColumns={2}
        />
      </React.Fragment>
    );
  }
}
