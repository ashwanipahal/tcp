import React from 'react';

import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

import {
  OrdersPreviewViewWrapper,
  OrderItemImageView,
  OrderItemDetailView,
  MarginBottom,
} from '../styles/OrderPreviewItemsListSkeleton.style.native';

const OrderPreviewItemsListSkeleton = () => {
  return (
    <OrdersPreviewViewWrapper>
      <OrderItemImageView>
        <LoaderSkelton width="100%" height="150px" />
      </OrderItemImageView>
      <OrderItemDetailView>
        <MarginBottom>
          <LoaderSkelton width="100%" height="30px" />
        </MarginBottom>
        <MarginBottom>
          <LoaderSkelton width="50%" height="20px" />
        </MarginBottom>
        <LoaderSkelton width="75%" height="20px" />
      </OrderItemDetailView>
    </OrdersPreviewViewWrapper>
  );
};

export default OrderPreviewItemsListSkeleton;
