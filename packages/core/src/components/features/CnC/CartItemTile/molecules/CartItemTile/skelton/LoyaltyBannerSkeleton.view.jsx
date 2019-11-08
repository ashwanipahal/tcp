import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from './LoayaltyBannerSkeleton.styles';

const LoayaltyBannerSkeleton = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="div1">
        <LoaderSkelton />
      </div>
      <div className="div2">
        <LoaderSkelton />
      </div>
      <div className="div1">
        <LoaderSkelton />
      </div>
    </div>
  );
};

LoayaltyBannerSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(LoayaltyBannerSkeleton, styles);
export { LoayaltyBannerSkeleton as LoayaltyBannerSkeletonVanilla };
