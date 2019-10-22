import React from 'react';
import PropTypes from 'prop-types';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import OrderPreviewItem from '../../OrderPreviewItem';
import constants from '../../../../OrderDetails/OrderDetails.constants';

/**
 * This function component use for return the Order item list based on group
 * can be passed in the component.
 * @param otherProps - otherProps object used for showing Order Item list
 */
const OrderPreviewItemsList = ({ className, ...otherProps }) => {
  const { items, orderNumber, labels, navigation } = otherProps;
  const router = {
    query: {
      orderId: orderNumber,
    },
  };
  return (
    <>
      {items.slice(0, constants.STATUS_CONSTANTS.TOP_PREVIEW_ITEMS_COUNT).map((item, index) => (
        <OrderPreviewItem key={index.toString()} {...{ item }} {...otherProps} />
      ))}
      <ViewWithSpacing spacingStyles="margin-top-MED">
        <Button
          buttonVariation="fixed-width"
          fill="BLUE"
          color="white"
          onPress={() =>
            navigation.navigate('OrderDetailPage', {
              title: `${getLabelValue(
                labels,
                'lbl_orderDetail_heading',
                'orders'
              )} #${orderNumber}`,
              router,
            })
          }
          text="VIEW FULL ORDER DETAILS"
        />
      </ViewWithSpacing>
    </>
  );
};
OrderPreviewItemsList.propTypes = {
  className: PropTypes.string,
  orderNumber: PropTypes.string.isRequired,
  items: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isShowWriteReview: PropTypes.bool.isRequired,
  isCanceledList: PropTypes.bool,
};

OrderPreviewItemsList.defaultProps = {
  className: '',
  isCanceledList: false,
};

export default OrderPreviewItemsList;
