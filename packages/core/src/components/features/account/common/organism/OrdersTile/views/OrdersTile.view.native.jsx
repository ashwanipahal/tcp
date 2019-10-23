import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import CustomButton from '../../../../../../common/atoms/Button';
import EmptyOrdersTile from '../../../molecule/EmptyOrdersTile';
import { OrdersTileItem } from '../molecules/OrderTileItem/views/OrdersTileItem.view';
import {
  UnderlineStyle,
  OrdersTileContainer,
  ButtonWrapperStyle,
} from '../styles/OrdersTile.style.native';
/*
OrdersTile component is used in AccountOverview screen on mobile app
*/
export const OrdersTile = ({ labels, ordersList, navigation, handleComponentChange }) => {
  const selectedOrders = ordersList && ordersList.orders.slice(0, 2);
  let ordersItemList;
  if (selectedOrders && selectedOrders.length) {
    ordersItemList = selectedOrders.map(orderItem => (
      <OrdersTileItem orderItem={orderItem} labels={labels} navigation={navigation} />
    ));
  } else {
    ordersItemList = <EmptyOrdersTile labels={labels} navigation={navigation} />;
  }
  return (
    <OrdersTileContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={getLabelValue(labels, 'lbl_ordersTile_heading', 'orders')}
        color="black"
        fontWeight="black"
      />
      <UnderlineStyle />
      {ordersItemList}
      <ButtonWrapperStyle>
        <CustomButton
          text={getLabelValue(labels, 'lbl_ordersTile_viewAllOrders', 'orders')}
          fill="BLUE"
          onPress={() => {
            handleComponentChange('myOrdersPageMobile');
          }}
        />
      </ButtonWrapperStyle>
    </OrdersTileContainer>
  );
};

OrdersTile.propTypes = {
  labels: PropTypes.shape({}),
  ordersList: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.isRequired,
};

OrdersTile.defaultProps = {
  labels: {
    lbl_ordersTile_heading: '',
    lbl_ordersTile_viewAllOrders: '',
  },
};

export default OrdersTile;
