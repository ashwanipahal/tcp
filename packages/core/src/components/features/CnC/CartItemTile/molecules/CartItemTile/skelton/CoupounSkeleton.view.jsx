import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from './CoupounSkeleton.style';

const CouponSkeleton = ({ className, heading, couponList, labels }) => {
  return (
    <div className={`${className}`}>
      <BodyCopy
        className="couponList__heading"
        fontWeight="semibold"
        component="h2"
        fontSize="fs16"
        fontFamily="secondary"
      >
        {`${heading} (${couponList.size})`}
      </BodyCopy>

      <div className="couponList__iconContainer">
        <div className="couponList__helpIcon">?</div>
        <Anchor
          fontSizeVariation="medium"
          underline
          anchorVariation="primary"
          fontFamily="secondary"
        >
          {labels.HELP_APPLYING}
        </Anchor>
      </div>

      <div>
        <LoaderSkelton className="skeletonStyle" />
      </div>
    </div>
  );
};

CouponSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  couponList: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
};

export default withStyles(CouponSkeleton, styles);
export { CouponSkeleton as CouponSkeletonVanilla };
