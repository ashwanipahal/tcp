import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from '../styles/MyRewardsSkeleton.style';

const MyRewardsSkeleton = ({ className }) => {
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 2,
            medium: 4,
          }}
          className="col-border-color elem-pt-MED elem-pr-SM elem-pb-MED elem-pl-SM"
        >
          <LoaderSkelton width="100%" height="300px" />
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 2,
            medium: 4,
          }}
          className="col-border-color elem-pt-MED elem-pr-SM elem-pb-MED elem-pl-SM"
        >
          <LoaderSkelton width="100%" height="300px" />
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 2,
            medium: 4,
          }}
          className="col-border-color elem-pt-MED elem-pr-SM elem-pb-MED elem-pl-SM"
        >
          <LoaderSkelton width="100%" height="300px" />
        </Col>
      </Row>
    </div>
  );
};

MyRewardsSkeleton.propTypes = {
  className: PropTypes.string,
};

MyRewardsSkeleton.defaultProps = {
  className: '',
};

export default withStyles(MyRewardsSkeleton, styles);
export { MyRewardsSkeleton as MyRewardsSkeletonVanilla };
