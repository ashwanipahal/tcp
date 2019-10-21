import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import RemoveSoldOut from '../../RemoveSoldOut';
import CARTPAGE_CONSTANTS from '../../../../CartItemTile/CartItemTile.constants';

import style from '../styles/InformationHeader.style';

class InformationHeader extends React.PureComponent {
  render() {
    const {
      confirmRemoveCartItem,
      isBagPageSflSection,
      isCartItemSFL,
      isCartItemsUpdating,
      isSflItemRemoved,
      labels,
      orderItems,
      pageView,
      isUnavailable,
      isSoldOut,
      styles,
      getUnavailableOOSItems,
      renderItemDeleteSuccessMsg,
      renderItemSflSuccessMsg,
      renderSflItemRemovedMessage,
      renderUpdatingBagItemSuccessfulMsg,
      className,
    } = this.props;
    const { isUpdating, isDeleting } = isCartItemsUpdating;
    const isBagPage = pageView === 'myBag';
    if (orderItems && orderItems.size > 0) {
      const showError = orderItems.find(tile => {
        const productDetail = getProductDetails(tile);
        return (
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT ||
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE
        );
      });
      return (
        <div className={`${className} information-header`}>
          {showError && (
            <ErrorMessage bagPage customClass={styles} error={labels.problemWithOrder} />
          )}
          {!isBagPageSflSection && isSoldOut && (
            <RemoveSoldOut
              pageView={pageView}
              labels={labels}
              removeCartItem={confirmRemoveCartItem}
              getUnavailableOOSItems={getUnavailableOOSItems}
              showLabelForRemove
            />
          )}
          {!isBagPageSflSection && isUnavailable && (
            <RemoveSoldOut pageView={pageView} labels={labels} />
          )}
          {renderItemDeleteSuccessMsg(
            isBagPageSflSection,
            isBagPage,
            isDeleting,
            labels.itemDeleted
          )}
          {renderItemSflSuccessMsg(isBagPage, isCartItemSFL, labels.sflSuccess)}
          {renderSflItemRemovedMessage(isSflItemRemoved, labels.sflDeleteSuccess)}
          {renderUpdatingBagItemSuccessfulMsg(isUpdating)}
        </div>
      );
    }
    return null;
  }
}

InformationHeader.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  styles: PropTypes.shape({}).isRequired,
  orderItems: PropTypes.shape([]).isRequired,
  pageView: PropTypes.string,
  isUnavailable: PropTypes.bool.isRequired,
  isSoldOut: PropTypes.bool.isRequired,
  getUnavailableOOSItems: PropTypes.shape([]),
  confirmRemoveCartItem: PropTypes.func.isRequired,
  isBagPageSflSection: PropTypes.bool,
  isCartItemSFL: PropTypes.bool.isRequired,
  isCartItemsUpdating: PropTypes.shape({}).isRequired,
  isSflItemRemoved: PropTypes.bool.isRequired,
  renderItemDeleteSuccessMsg: PropTypes.func.isRequired,
  renderItemSflSuccessMsg: PropTypes.func.isRequired,
  renderSflItemRemovedMessage: PropTypes.func.isRequired,
  renderUpdatingBagItemSuccessfulMsg: PropTypes.func.isRequired,
};

InformationHeader.defaultProps = {
  className: '',
  isBagPageSflSection: false,
  pageView: '',
  getUnavailableOOSItems: [],
};

export default withStyles(InformationHeader, style);

export { InformationHeader };
