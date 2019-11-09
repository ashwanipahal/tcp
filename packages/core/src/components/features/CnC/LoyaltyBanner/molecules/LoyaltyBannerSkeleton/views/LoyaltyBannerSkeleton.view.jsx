import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from '../styles/LoayaltyBannerSkeleton.styles';

const LoyaltyBannerSkeleton = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="loyalty-banner-section-wrapper">
        <div className="loyalty-banner-header-footer">
          <LoaderSkelton />
        </div>
        <div className="loyalty-banner-content">
          <LoaderSkelton />
        </div>
        <div className="loyalty-banner-header-footer">
          <LoaderSkelton />
        </div>
      </div>
    </div>
  );
};

LoyaltyBannerSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(LoyaltyBannerSkeleton, styles);
export { LoyaltyBannerSkeleton as LoyaltyBannerSkeletonVanilla };
