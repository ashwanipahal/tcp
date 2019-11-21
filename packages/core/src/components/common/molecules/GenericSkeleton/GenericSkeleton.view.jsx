import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from './GenericSkeleton.style';

const AddressSkelton = ({ variation, className }) => {
  const marginBottomClass = variation === 'secondary' ? 'address-field-margin' : 'elem-mb-LRG';

  return (
    <div className={className}>
      <div className={marginBottomClass}>
        <LoaderSkelton className="address-field-size" />
      </div>
      <div className={marginBottomClass}>
        <LoaderSkelton className="address-field-centerSkeleton" />
      </div>
      <div>
        <LoaderSkelton className="address-field-size" />
      </div>
    </div>
  );
};

AddressSkelton.propTypes = {
  className: PropTypes.string.isRequired,
  variation: PropTypes.string.isRequired,
};

export default withStyles(AddressSkelton, styles);
