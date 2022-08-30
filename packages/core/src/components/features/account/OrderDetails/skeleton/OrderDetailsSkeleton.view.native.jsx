import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

import {
  ViewWrapper,
  StyledRowDataContainer,
  HeadRowDataContainer,
  LeftLoaderSkeltonWrapper,
  RightLoaderSkeltonWrapper,
  OrdersPreviewViewWrapper,
  OrderItemImageView,
  OrderItemDetailView,
  MarginBottom,
} from '../styles/OrderDetailsSkeleton.style.native';

const OrderDetailsSkeleton = ({ ordersLabels }) => {
  return (
    <ViewWrapper>
      <ViewWithSpacing spacingStyles="margin-top-MED">
        <BodyCopyWithSpacing
          fontFamily="primary"
          fontSize="fs14"
          fontWeight="semibold"
          spacingStyles="margin-top-XS margin-bottom-XS"
          text={getLabelValue(ordersLabels, 'lbl_orderDetails_orderNumber')}
        />
        <LoaderSkelton width="30%" height="20px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-top-MED">
        <BodyCopyWithSpacing
          fontFamily="primary"
          fontSize="fs14"
          fontWeight="semibold"
          spacingStyles="margin-top-XXS margin-bottom-XS"
          text={getLabelValue(ordersLabels, 'lbl_orderDetails_orderDate')}
        />
        <LoaderSkelton width="30%" height="20px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-top-MED">
        <LoaderSkelton width="30%" height="50px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-top-MED">
        <LoaderSkelton width="30%" height="50px" />
      </ViewWithSpacing>
      <HeadRowDataContainer>
        <BodyCopyWithSpacing
          fontFamily="primary"
          fontSize="fs14"
          fontWeight="semibold"
          textAlign="left"
          text={getLabelValue(ordersLabels, 'lbl_orderDetails_orderSummary')}
        />

        <BodyCopyWithSpacing
          fontFamily="primary"
          fontSize="fs14"
          fontWeight="semibold"
          textAlign="left"
          text={getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}
        />
      </HeadRowDataContainer>
      <StyledRowDataContainer>
        <LeftLoaderSkeltonWrapper>
          <LoaderSkelton width="30%" height="20px" />
        </LeftLoaderSkeltonWrapper>
        <RightLoaderSkeltonWrapper>
          <LoaderSkelton height="20px" />
        </RightLoaderSkeltonWrapper>
      </StyledRowDataContainer>
      <LineComp borderColor="gray.600" borderWidth={1} marginTop={10} marginBottom={10} />
      <StyledRowDataContainer>
        <LeftLoaderSkeltonWrapper>
          <BodyCopyWithSpacing
            fontFamily="primary"
            fontSize="fs14"
            textAlign="left"
            fontWeight="semibold"
            spacingStyles="margin-top-XS margin-bottom-XS"
            text={`${getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}:`}
          />
        </LeftLoaderSkeltonWrapper>
        <RightLoaderSkeltonWrapper>
          <LoaderSkelton height="20px" />
        </RightLoaderSkeltonWrapper>
      </StyledRowDataContainer>
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
    </ViewWrapper>
  );
};

OrderDetailsSkeleton.propTypes = {
  ordersLabels: PropTypes.shape({}).isRequired,
};

export default OrderDetailsSkeleton;
