import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, isMobileApp } from '@tcp/core/src/utils';

import { getProductDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import RemoveSoldOut from '../../RemoveSoldOut';
import CARTPAGE_CONSTANTS from '../../../../CartItemTile/CartItemTile.constants';

import style, { bagTileCSS, customStyles } from '../styles/InformationHeader.style';

class InformationHeader extends React.PureComponent {
  getTickIcon = () => {
    return <Image alt="closeIcon" className="tick-icon" src={getIconPath('circle-check-fill')} />;
  };

  renderItemDeleteSuccessMsg = (
    isBagPageSflSection,
    isBagPage,
    isDeleting,
    itemDeleteSuccessMsg
  ) => {
    const { isCartItemSFL } = this.props;
    return (
      !isCartItemSFL &&
      !isBagPageSflSection &&
      !isMobileApp() &&
      isDeleting && (
        <div className="delete-msg">
          {this.getTickIcon()}
          <BodyCopy
            component="span"
            fontSize="fs12"
            textAlign="center"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {itemDeleteSuccessMsg}
          </BodyCopy>
        </div>
      )
    );
  };

  renderItemSflSuccessMsg = (isBagPage, itemSflSuccessMsg) => {
    const { isBagPageSflSection, isCartItemSFL, pageView } = this.props;
    return (
      !isBagPageSflSection &&
      !isMobileApp() &&
      pageView !== 'myBag' &&
      isCartItemSFL && (
        <div className="delete-msg">
          {this.getTickIcon()}
          <BodyCopy
            component="span"
            fontSize="fs12"
            textAlign="center"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {itemSflSuccessMsg}
          </BodyCopy>
        </div>
      )
    );
  };

  renderSflItemRemovedMessage = (isSflItemRemoved, sflDeleteSuccessMsg) => {
    const { isBagPageSflSection } = this.props;
    return (
      isBagPageSflSection &&
      !isMobileApp() &&
      isSflItemRemoved && (
        <div className="delete-msg">
          {this.getTickIcon()}
          <BodyCopy
            component="span"
            fontSize="fs12"
            textAlign="center"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {sflDeleteSuccessMsg}
          </BodyCopy>
        </div>
      )
    );
  };

  /**
   * @method renderUpdatingBagItemSuccessfulMsg
   * @description render message once item get updated.
   * @memberof ProductTileWrapper
   */
  renderUpdatingBagItemSuccessfulMsg = isUpdating => {
    const { labels } = this.props;
    return (
      isUpdating &&
      !isMobileApp() && (
        <div className="delete-msg">
          {this.getTickIcon()}
          <BodyCopy
            component="span"
            fontSize="fs12"
            textAlign="center"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {labels.itemUpdated}
          </BodyCopy>
        </div>
      )
    );
  };

  render() {
    const {
      confirmRemoveCartItem,
      isBagPageSflSection,
      isCartItemsUpdating,
      isSflItemRemoved,
      labels,
      orderItems,
      pageView,
      isUnavailable,
      isSoldOut,
      getUnavailableOOSItems,
      className,
    } = this.props;
    const { isUpdating, isDeleting } = isCartItemsUpdating;
    const isBagPage = pageView === 'myBag';
    const styles = pageView === 'myBag' ? bagTileCSS : customStyles;
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
          {this.renderItemDeleteSuccessMsg(
            isBagPageSflSection,
            isBagPage,
            isDeleting,
            labels.itemDeleted
          )}
          {this.renderItemSflSuccessMsg(isBagPage, labels.sflSuccess)}
          {this.renderSflItemRemovedMessage(isSflItemRemoved, labels.sflDeleteSuccess)}
          {this.renderUpdatingBagItemSuccessfulMsg(isUpdating)}
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
};

InformationHeader.defaultProps = {
  className: '',
  isBagPageSflSection: false,
  pageView: '',
  getUnavailableOOSItems: [],
};

export default withStyles(InformationHeader, style);

export { InformationHeader };
