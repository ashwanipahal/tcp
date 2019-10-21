import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

import {
  ImageStyle,
  ImageBrandStyle,
  ImageBrandTCPStyle,
  OrderItemContainer,
  OrderItemImage,
  OrderItemContent,
  OrderContentWrapper,
} from '../styles/OrderPreviewItem.style.native';
import endpoints from '../../../../../../../service/endpoint';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');

/**
 * This function component use for return the OrderItems
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderPreviewItem = ({ className, ...otherProps }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const {
    item: {
      productInfo: { name, imagePath },
      itemInfo: { itemBrand, quantity, quantityCanceled },
    },
    item,
    ordersLabels,
    isCanceledList,
  } = otherProps;

  const { status } = item.trackingInfo[0];

  return (
    <>
      <OrderItemContainer>
        <OrderItemImage>
          <ImageStyle source={{ uri: endpoints.global.baseURI + imagePath }} />
          {itemBrand === 'TCP' && <ImageBrandTCPStyle source={tcpImage} />}
          {itemBrand === 'GYM' && <ImageBrandStyle source={gymboreeImage} />}
        </OrderItemImage>
        <OrderItemContent spacingStyles="padding-right-SM padding-left-SM">
          <BodyCopy
            fontSize="fs14"
            fontWeight="semibold"
            textAlign="left"
            text={name}
            fontFamily="secondary"
          />

          <ViewWithSpacing spacingStyles="margin-top-MED">
            <OrderContentWrapper>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="semibold"
                text={getLabelValue(ordersLabels, 'lbl_orderDetails_quantity')}
              />

              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                text={isCanceledList ? quantityCanceled : quantity}
              />
            </OrderContentWrapper>
          </ViewWithSpacing>
          <ViewWithSpacing spacingStyles="margin-top-MED">
            <OrderContentWrapper>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="semibold"
                text="Status: "
              />

              <BodyCopy fontSize="fs14" fontFamily="secondary" text={status} />
            </OrderContentWrapper>
          </ViewWithSpacing>
        </OrderItemContent>
      </OrderItemContainer>
    </>
  );
};
OrderPreviewItem.propTypes = {
  className: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  orderGroup: PropTypes.shape({}).isRequired,
};

OrderPreviewItem.defaultProps = {
  className: '',
};

export default OrderPreviewItem;
