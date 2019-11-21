import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';

export const getLoading = () => {
  return (
    <BodyCopy
      margin="12px 0 0 0"
      dataLocator="pdp_product_badges"
      mobileFontFamily="secondary"
      fontSize="fs14"
      fontWeight="semibold"
      color="gray.900"
      text="Loading..."
      textAlign="center"
    />
  );
};

export default getLoading;
