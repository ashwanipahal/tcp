import React from 'react';
import { PropTypes } from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

const FitSizeSelect = props => {
  const { options } = props;
  return options.map(listItem => {
    return <BodyCopy component="span">{listItem.displayName}</BodyCopy>;
  });
};

FitSizeSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default FitSizeSelect;
