import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const ProductLanding = ({ navigation: props }) => {
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

ProductLanding.propTypes = {
  getParam: PropTypes.func,
  navigation: PropTypes.shape,
};

ProductLanding.defaultProps = {
  getParam: null,
  navigation: null,
};

export default ProductLanding;
