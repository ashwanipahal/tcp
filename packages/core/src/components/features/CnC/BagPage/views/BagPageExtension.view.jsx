import React from 'react';
import Col from '../../../../common/atoms/Col';

const wrapSection = (Component, orderItemsCount) => {
  const isNoNEmptyBag = orderItemsCount > 0;
  if (!isNoNEmptyBag) {
    return (
      <Col
        colSize={{
          small: 6,
          medium: 5,
          large: 8,
        }}
      >
        {Component}
      </Col>
    );
  }
  return Component;
};

export default {
  wrapSection,
};
