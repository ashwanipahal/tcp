/* eslint-disable */
import React from 'react';
import { Text, FlatList, Image } from 'react-native';
import ProductListingPageStyle from '../styles/ProductListingPage.style.native';

const ProductTile = ({ item }) => {
  const url = `https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/${
    item.imagename
  }-6.jpg`;
  const pic = {
    uri: url,
  };
  return (
    <ProductListingPageStyle key={item.product_name} className="product-item">
      <Text className="product-name"> Fetching from core</Text>
      <Text className="product-name">{item.product_name}</Text>
      <Text className="product-disc-price">{item.min_offer_price}</Text>
      <Text className="product-original-price">{`Was ${item.min_list_price}`}</Text>
    </ProductListingPageStyle>
  );
};

export const ProductListView = ({ data }) => {
  return (
    <React.Fragment>
      <Text>PLP Page</Text>
      <FlatList className="product-wrapper" data={data} renderItem={ProductTile} />
    </React.Fragment>
  );
};
