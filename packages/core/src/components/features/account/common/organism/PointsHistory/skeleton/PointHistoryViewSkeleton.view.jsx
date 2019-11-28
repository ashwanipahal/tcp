import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

import styles from '../styles/PointHistoryViewSkeleton.style';

const PointHistoryViewSkeleton = ({ className, isPointHistoryPage }) => {
  return (
    <div className={className}>
      {isPointHistoryPage ? (
        <Row fullBleed>
          <Col colSize={{ large: 3, medium: 2, small: 2 }}>
            <LoaderSkelton width="100%" height="20px" />
          </Col>
          <Col colSize={{ large: 4, medium: 3, small: 2 }}>
            <LoaderSkelton width="100%" height="20px" />
          </Col>
          <Col colSize={{ large: 3, medium: 3, small: 2 }}>
            <LoaderSkelton width="100%" height="20px" />
          </Col>
        </Row>
      ) : (
        <Row fullBleed>
          <Col colSize={{ large: 3, medium: 2, small: 2 }}>
            <LoaderSkelton width="100%" height="20px" />
          </Col>
          <Col colSize={{ large: 3, medium: 2, small: 2 }}>
            <LoaderSkelton width="100%" height="20px" />
          </Col>
          <Col colSize={{ large: 4, medium: 3, small: 2 }}>
            <LoaderSkelton width="100%" height="20px" />
          </Col>
        </Row>
      )}
    </div>
  );
};

PointHistoryViewSkeleton.propTypes = {
  className: PropTypes.string,
  isPointHistoryPage: PropTypes.bool,
};

PointHistoryViewSkeleton.defaultProps = {
  className: '',
  isPointHistoryPage: false,
};

export default withStyles(PointHistoryViewSkeleton, styles);
export { PointHistoryViewSkeleton as PointHistoryViewSkeletonVanilla };
