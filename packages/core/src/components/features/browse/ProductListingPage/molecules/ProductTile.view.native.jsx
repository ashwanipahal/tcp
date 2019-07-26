/* eslint-disable */
/* dummy plp page | TODO: eslint fixes*/

import React from 'react';
import { Text, FlatList, Image, View, Picker } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import ProductListingPageStyle from '../styles/ProductListingPage.style.native';
import AddedToBagContainer from '../../../CnC/AddedToBag';

class ProductTile extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: 1,
      storeId: 110715,
    };
  }

  selectChange = (value, elem) => {
    if (value) {
      this.setState({
        [elem]: value,
      });
    }
  };

  render() {
    const { item, addToBagEcom, addToBagBossBopis } = this.props;
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
              onValueChange={value => this.selectChange(value, 'quantity')}
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
            onPress={() => addToBagEcom(item, this.state.quantity)}
            className="addToBagButton"
          />
          <View className="product-store">
            <Text>Please select a store</Text>
            <Picker
              selectedValue={this.state.storeId}
              itemStyle={{ backgroundColor: 'white', color: 'blue', fontSize: 17, height: 60 }}
              onValueChange={value => this.selectChange(value, 'storeId')}
            >
              <Picker.Item value="110715" label="Newport Center 110715" />
              <Picker.Item value="110961" label="Union Square 110961" />
              <Picker.Item value="111287" label="Bergenline Ave 111287" />
              <Picker.Item value="111723" label="Ferry St Newark 111723" />
              <Picker.Item value="111202" label="Newark 111202" />
              <Picker.Item value="111616" label="Franklin Square Sc 111616" />
              <Picker.Item value="110945" label="The Mills At Jersey Gardens 110945" />
            </Picker>
          </View>
          <Button
            fullWidth
            buttonVariation="variable-width"
            text="Add to BOSS"
            onPress={() => addToBagBossBopis(item, true, this.state.quantity, this.state.storeId)}
          />
          <Button
            fullWidth
            buttonVariation="variable-width"
            text="Add to BOPIS"
            onPress={() => addToBagBossBopis(item, false, this.state.quantity, this.state.storeId)}
          />
        </View>
        <View>
          <AddedToBagContainer />
        </View>
      </ProductListingPageStyle>
    );
  }
}

export default ProductTile;
