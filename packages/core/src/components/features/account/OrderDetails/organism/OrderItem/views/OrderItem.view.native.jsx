import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';

import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

import {
  ImageStyle,
  ImageBrandStyle,
  ImageBrandTCPStyle,
  OrderItemContainer,
  OrderItemImage,
  OrderItemContent,
  OrderContentWrapper,
} from '../styles/OrderItem.style.native';
import endpoints from '../../../../../../../service/endpoint';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');

/**
 * This function component use for return the OrderItems
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderItems = ({ className, ...otherProps }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const {
    item: {
      productInfo: { name, imagePath, color, fit, size, upc, pdpUrl },
      itemInfo: { linePrice, itemBrand, quantity, quantityCanceled, listPrice, offerPrice },
    },
    currencySymbol,
    isCanceledList,
    isShowWriteReview,
    ordersLabels,
  } = otherProps;

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
          <BodyCopyWithSpacing
            spacingStyles="margin-top-XXS"
            fontFamily="secondary"
            color="gray.800"
            fontSize="fs14"
            text={`${getLabelValue(ordersLabels, 'lbl_orderDetails_upc')} ${upc}`}
          />
          {!!size && (
            <BodyCopyWithSpacing
              spacingStyles="margin-top-XXS"
              margin-top="margin-top-XXS"
              fontFamily="secondary"
              color="gray.800"
              fontSize="fs14"
              text={`${getLabelValue(ordersLabels, 'lbl_orderDetails_color')} ${color.name}`}
            />
          )}
          <OrderContentWrapper>
            {!!fit && (
              <BodyCopy
                fontFamily="secondary"
                color="gray.800"
                fontSize="fs14"
                text={`${getLabelValue(ordersLabels, 'lbl_orderDetails_fit')} ${fit}`}
              />
            )}
            {!!size && (
              <BodyCopy
                fontFamily="secondary"
                color="gray.800"
                fontSize="fs14"
                text={`${getLabelValue(ordersLabels, 'lbl_orderDetails_size')} ${size}`}
              />
            )}
          </OrderContentWrapper>

          <ViewWithSpacing spacingStyles="margin-top-MED">
            <OrderContentWrapper>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="semibold"
                text={getLabelValue(ordersLabels, 'lbl_orderDetails_price')}
              />

              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                text={`${currencySymbol}${listPrice.toFixed(2)}`}
              />
            </OrderContentWrapper>

            <OrderContentWrapper>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="semibold"
                text={getLabelValue(ordersLabels, 'lbl_orderDetails_youPaid')}
              />

              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                text={`${currencySymbol}${offerPrice.toFixed(2)}`}
              />
            </OrderContentWrapper>
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
            <OrderContentWrapper>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="semibold"
                text={getLabelValue(ordersLabels, 'lbl_orderDetails_subTotal')}
              />

              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                text={`${currencySymbol}${(linePrice || 0).toFixed(2)}`}
              />
            </OrderContentWrapper>
            {isShowWriteReview && (
              <OrderContentWrapper>
                <Anchor
                  url={pdpUrl}
                  text={getLabelValue(ordersLabels, 'lbl_orderDetails_writeReview')}
                  underline
                  anchorVariation="primary"
                  fontSize="fs14"
                  fontWeight="semibold"
                />
              </OrderContentWrapper>
            )}
          </ViewWithSpacing>
        </OrderItemContent>
      </OrderItemContainer>
    </>
  );
};
OrderItems.propTypes = {
  className: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  orderGroup: PropTypes.shape({}).isRequired,
};

OrderItems.defaultProps = {
  className: '',
};

export default OrderItems;
