import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';

import {
  OrdersListItemMainView,
  OrdersListItemView,
} from '../styles/RecentOrdersSkeleton.style.native';

const RecentOrdersSkeleton = ({ labels }) => {
  return (
    <>
      <OrdersListItemMainView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
          />
          <LoaderSkelton width="70%" height="20px" />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderNumber', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
          />

          <LoaderSkelton width="70%" height="20px" />
        </OrdersListItemView>
        <OrdersListItemView />
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderType', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
          />
          <LoaderSkelton width="70%" height="20px" />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
          />
          <LoaderSkelton width="70%" height="20px" />
        </OrdersListItemView>
        <OrdersListItemView>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
          />
          <LoaderSkelton width="70%" height="20px" />
        </OrdersListItemView>
        <OrdersListItemView />
      </OrdersListItemMainView>
    </>
  );
};

RecentOrdersSkeleton.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default RecentOrdersSkeleton;
