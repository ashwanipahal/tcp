import React from 'react';
import { Text, FlatList, View } from 'react-native';

// eslint-disable-next-line
const ProductTile = ({ item }) => {
  return (
    <View key={item.id} className="product-item">
      <Text className="product-name"> Fetching from core</Text>
      <Text className="product-name">{item.product_name}</Text>
      <Text className="product-disc-price">{item.price}</Text>
    </View>
  );
};

// eslint-disable-next-line
export const ProductList = ({ data }) => {
  return (
    <React.Fragment>
      <Text>PLP DeltaSync Page</Text>
      <FlatList className="product-wrapper" data={data} renderItem={ProductTile} />
    </React.Fragment>
  );
};
