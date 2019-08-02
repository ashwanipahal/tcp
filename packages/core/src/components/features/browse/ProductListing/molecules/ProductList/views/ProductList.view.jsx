import React from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../../../../../common/atoms';

const products = [
  {
    name: 'abcd',
  },
  {
    name: 'defg',
  },
  {
    name: 'sdfsdf',
  },
  {
    name: 'asdf',
  },
  {
    name: '345e',
  },
  {
    name: 'eddf',
  },
  {
    name: '4566',
  },
];
const ProductList = ({ className }) => {
  return (
    <div className={className}>
      {products.map((item, index) => {
        let ignoreGutterVal = {};
        if ((index + 1) % 4 === 0) {
          ignoreGutterVal = { large: true };
        }
        if ((index + 1) % 3 === 0) {
          ignoreGutterVal = { medium: true };
        }
        return (
          <Col
            colSize={{ small: 3, medium: 2, large: 3 }}
            ignoreGutter={ignoreGutterVal}
            className="product-tile"
          >
            {item.name}
          </Col>
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  className: PropTypes.string,
};

ProductList.defaultProps = {
  className: '',
};

export default ProductList;
