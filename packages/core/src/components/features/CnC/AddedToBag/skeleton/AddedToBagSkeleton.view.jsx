import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { Row } from '../../../../common/atoms';
import styles from './AddedToBagSkeleton.style';

const AddedToBagSkeleton = ({ className }) => {
  return (
    <div className={`${className} tile-header`}>
      <Row fullBleed className="added-to-bag-skeleton-wrapper">
        <div className="price-points-wrapper">
          <div className="price-sub-text">
            <LoaderSkelton />
          </div>
          <div className="price-sub-value">
            <LoaderSkelton />
          </div>
        </div>
        <div className="price-points-wrapper">
          <div className="points-text">
            <LoaderSkelton />
          </div>
          <div className="points-value">
            <LoaderSkelton />
          </div>
        </div>

        <div className="sub-total-wrapper">
          <div className="price-sub-text">
            <LoaderSkelton />
          </div>
          <div className="price-sub-value">
            <LoaderSkelton />
          </div>
        </div>
      </Row>
    </div>
  );
};

AddedToBagSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AddedToBagSkeleton, styles);
export { AddedToBagSkeleton as AddedToBagSkeletonVanilla };
