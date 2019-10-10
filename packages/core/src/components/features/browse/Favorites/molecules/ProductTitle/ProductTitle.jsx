import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { PropTypes } from 'prop-types';

const ProductTitle = ({ name, pdpUrl }) => {
  return (
    <div className="product-title-container">
      <h3>
        <button
          onClick={() => {
            Router.push([pdpUrl]);
          }}
          className="product-title-content name-item"
          unbxdattr="product"
        >
          {name}
        </button>
      </h3>
    </div>
  );
};

ProductTitle.propTypes = {
  name: PropTypes.string,
  pdpUrl: PropTypes.string,
};

ProductTitle.defaultProps = {
  name: '',
  pdpUrl: '',
};

export default ProductTitle;
