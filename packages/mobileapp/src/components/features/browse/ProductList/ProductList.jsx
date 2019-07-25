import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const ProductList = ({ navigation: props }) => {
  const { getParam } = props;
  const productName = getParam('product');
  return (
    <React.Fragment>
      <Text>
        Product List Page
        {productName}
      </Text>
    </React.Fragment>
  );
};

ProductList.propTypes = {
  getParam: PropTypes.func,
  navigation: PropTypes.shape,
};

ProductList.defaultProps = {
  getParam: null,
  navigation: null,
};

export default ProductList;
