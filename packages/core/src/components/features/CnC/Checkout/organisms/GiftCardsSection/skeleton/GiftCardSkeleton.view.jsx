import React from 'react';
import PropTypes from 'prop-types';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { Row, Col } from '../../../../../../common/atoms';

export const GiftCardSkeleton = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Row className="column-styling">
        <Col>
          <LoaderSkelton width="100px" height="30px" />
        </Col>
        <Col>
          <LoaderSkelton width="175px" height="60px" />
        </Col>
      </Row>
    </div>
  );
};

GiftCardSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export { GiftCardSkeleton as GiftCardSkeletonVanilla };
