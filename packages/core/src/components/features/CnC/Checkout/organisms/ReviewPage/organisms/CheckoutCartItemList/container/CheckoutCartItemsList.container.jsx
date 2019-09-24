import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BAGPAGE_SELECTORS from '../../../../../../BagPage/container/BagPage.selectors';
import { getLabelsCartItemTile } from '../../../../../../CartItemTile/container/CartItemTile.selectors';
import CheckoutCartItemsList from '../views/CheckoutCartItemsList.view';

export const CheckoutCartItemList = ({
  itemsCount,
  items,
  currencySymbol,
  labels,
  bagPageLabels,
}) => {
  return (
    <CheckoutCartItemsList
      itemsCount={itemsCount}
      items={items}
      currencySymbol={currencySymbol}
      labels={labels}
      bagPageLabels={bagPageLabels}
    />
  );
};

const mapStateToProps = state => {
  return {
    itemsCount: BAGPAGE_SELECTORS.getTotalItems(state),
    items: BAGPAGE_SELECTORS.getOrderItems(state),
    currencySymbol: BAGPAGE_SELECTORS.getCurrentCurrency(state),
    labels: getLabelsCartItemTile(state),
    bagPageLabels: BAGPAGE_SELECTORS.getBagPageLabels(state),
  };
};

CheckoutCartItemList.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  items: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  bagPageLabels: PropTypes.shape({}),
};

CheckoutCartItemList.defaultProps = {
  labels: {},
  bagPageLabels: {},
};

export default connect(mapStateToProps)(CheckoutCartItemList);
