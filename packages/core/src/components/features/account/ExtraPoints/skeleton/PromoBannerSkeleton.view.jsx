import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

const PromoBannerSkeleton = ({ className }) => {
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
          className="col-border-color elem-pt-MED elem-pr-SM elem-pb-MED elem-pl-SM"
        >
          <LoaderSkelton width="100%" height="200px" />
        </Col>
      </Row>
    </div>
  );
};

PromoBannerSkeleton.propTypes = {
  className: PropTypes.string,
};

PromoBannerSkeleton.defaultProps = {
  className: '',
};

export default PromoBannerSkeleton;
