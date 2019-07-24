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
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  selectChange = (value, elem) => {
    console.log(value);
    if (value) {
      this.setState({
        [elem]: value,
      });
    }
  };

  addToBagEcom = item => {
    const { addToCartEcom } = this.props;
    const { quantity } = this.state;
    const pdpObj = parseProductFromAPI(item, item.uniqueId, false, getImgPath, false, false);
    const {
      product: { colorFitsSizesMap },
    } = pdpObj;
    const { color, fits } = colorFitsSizesMap[0];
    const selectedColor = color.name;
    const selectedFit = fits[0].hasFits ? fits[0].fitName : '';
    const selectedSize = fits[0].sizes[0].sizeName;

    const formData = {
      size: selectedSize,
      fit: selectedFit,
      quantity,
      color: selectedColor,
      wishlistItemId: false,
    };
    const cartItemInfo = getCartItemInfo(pdpObj.product, formData);
    addToCartEcom(cartItemInfo);
  };

  addToBagBoss() {}

  addToBagBopis() {}

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
              selectChange={this.selectChange}
              addToBagEcom={this.addToBagEcom}
            />
          )}
          numColumns={2}
        />
      </React.Fragment>
    );
  }
}
