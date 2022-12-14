import React from 'react';
import { PropTypes } from 'prop-types';
import { BodyCopy, SelectBox } from '@tcp/core/src/components/common/atoms';
import selectBoxStyle from './ProductSelect.style';

const ProductSelect = props => {
  const {
    input: { name },
  } = props;
  return (
    <React.Fragment>
      <BodyCopy fontSize="fs10" fontFamily="secondary" fontWeight="extrabold">
        <span>{`${name}:`}</span>
      </BodyCopy>
      <BodyCopy fontSize="fs12" fontFamily="secondary">
        <SelectBox {...props} inheritedStyles={selectBoxStyle} />
      </BodyCopy>
    </React.Fragment>
  );
};

ProductSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default ProductSelect;
