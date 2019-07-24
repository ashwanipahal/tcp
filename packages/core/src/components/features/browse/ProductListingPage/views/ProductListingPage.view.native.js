/* eslint-disable */
import React from 'react';
import { Text, FlatList, Image, View, Picker } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import { parseProductFromAPI } from '../../ProductListingPage/container/ProductListingPage.dataMassage';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import { getImgPath } from '../../ProductListingPage/util/utility';
import ProductListingPageStyle from '../styles/ProductListingPage.style.native';
import AddedToBagContainer from '../../../CnC/AddedToBag';

export class ProductListView extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  ProductTile = ({ item }) => {
    const url = `https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/${
      item.imagename
    }-6.jpg`;
    const pic = {
      uri: url,
    };
    return (
      <ProductListingPageStyle key={item.product_name} className="product-item">
        <View>
          <Text style={{ textAlign: 'center' }}>{item.product_name}</Text>
          <Text style={{ color: 'red', textAlign: 'center' }}>{item.min_offer_price}</Text>
          <Text style={{ color: 'black', textAlign: 'center' }}>{`Was ${
            item.min_list_price
          }`}</Text>
          <View className="product-quantity">
            <Text>Please select a quantity</Text>
            <Picker
              selectedValue={this.state.quantity}
              itemStyle={{ backgroundColor: 'white', color: 'blue', fontSize: 17, height: 60 }}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
            </Picker>
          </View>
          <Button
            fullWidth
            buttonVariation="variable-width"
            text="Add to Bag"
            onPress={() => this.addToBagEcom(item)}
          />
          <View className="product-store">
            <Text>Please select a store</Text>
            <Picker
              selectedValue={this.state.quantity}
              itemStyle={{ backgroundColor: 'white', color: 'blue', fontSize: 17, height: 60 }}
            >
              <Picker.Item label="Store 1" value="Store 1" />
              <Picker.Item label="Store 2" value="Store 2" />
              <Picker.Item label="Store 3" value="Store 3" />
              <Picker.Item label="Store 4" value="Store 4" />
            </Picker>
          </View>
          <Button fullWidth buttonVariation="variable-width" text="Add to BOSS" />
          <Button fullWidth buttonVariation="variable-width" text="Add to BOPIS" />
        </View>
        <View>
          <AddedToBagContainer />
        </View>
      </ProductListingPageStyle>
    );
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
          renderItem={this.ProductTile}
          numColumns={2}
        />
      </React.Fragment>
    );
  }
}
