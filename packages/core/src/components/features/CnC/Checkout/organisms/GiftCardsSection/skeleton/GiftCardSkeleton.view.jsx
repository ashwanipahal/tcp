import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from './GiftcardSkeleton.style';

const GiftCardSkeleton = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="column-styling">
        <LoaderSkelton width="150px" height="30px" />
        <LoaderSkelton width="175px" height="40px" inheritedStyles="float:right;" />
      </div>
    </div>
  );
};

GiftCardSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(GiftCardSkeleton, styles);
export { GiftCardSkeleton as GiftCardSkeletonVanilla };
