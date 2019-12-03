import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from './GenericSkeleton.style';

const AddressSkelton = ({ isCardView, className }) => {
  const marginBottomClass = isCardView ? 'elem-mb-LRG' : 'address-field-margin';

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
  isCardView: PropTypes.string.isRequired,
};

export default withStyles(AddressSkelton, styles);
