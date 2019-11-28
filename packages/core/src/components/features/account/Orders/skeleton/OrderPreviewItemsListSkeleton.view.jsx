import React from 'react';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

const OrderPreviewItemsListSkeleton = () => {
  return (
    <Row>
      <Col colSize={{ large: 2, medium: 2, small: 2 }}>
        <LoaderSkelton width="100%" height="300px" />
      </Col>
      <Col colSize={{ large: 3, medium: 5, small: 4 }} className="elem-ml-MED">
        <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
        <LoaderSkelton width="50%" height="20px" className="elem-mb-XS" />
        <LoaderSkelton width="75%" height="20px" />
      </Col>
    </Row>
  );
};

export default OrderPreviewItemsListSkeleton;
