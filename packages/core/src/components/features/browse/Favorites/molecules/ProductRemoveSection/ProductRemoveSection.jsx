import React from 'react';
import { PropTypes } from 'prop-types';

const ProductRemoveSection = ({ onClick, itemId }) => {
  return (
    <div className="remove-buttons-container">
      <button type="button" className="button-remove" onClick={onClick}>
        Remove
      </button>
      {itemId}
    </div>
  );
};

ProductRemoveSection.propTypes = {
  onClick: PropTypes.func.isRequired,
  itemId: PropTypes.string,
};

ProductRemoveSection.defaultProps = {
  itemId: '',
};

export default ProductRemoveSection;
