import React from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList } from 'react-native';
import ProductTile from '../../atoms/ProductTile';

const ProductList = ({ data }) => {
  return (
    <React.Fragment>
      <Text>PLP Page</Text>
      <FlatList className="product-wrapper" data={data} renderItem={ProductTile} />
    </React.Fragment>
  );
};

ProductList.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default ProductList;
