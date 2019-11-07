import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

import styles from '../styles/AddressSkeleton.style';

const AddressSkelton = ({ className }) => {
  return (
    <div className={className}>
      <div className="elem-mb-LRG">
        <LoaderSkelton width="100%" height="42px" />
      </div>
      <div className="elem-mb-LRG">
        <LoaderSkelton width="75%" height="42px" />
      </div>
      <div>
        <LoaderSkelton width="100%" height="42px" />
      </div>
    </div>
  );
};

AddressSkelton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AddressSkelton, styles);
export { AddressSkelton as AddressSkeltonVanilla };
