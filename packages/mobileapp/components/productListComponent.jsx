/* eslint-disable */
import React from 'react';
import { Text, FlatList } from 'react-native';
import { ProductTile } from './productTileComponent';

const ProductList = ({ data }) => {
  return (
    <React.Fragment>
      <Text>PLP Page</Text>
      <FlatList className="product-wrapper" data={data} renderItem={ProductTile} />
    </React.Fragment>
  );
};

export default ProductList;
