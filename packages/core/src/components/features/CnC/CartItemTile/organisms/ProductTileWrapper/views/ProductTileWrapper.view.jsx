import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { getIconPath } from '@tcp/core/src/utils';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss, {
  customStyles,
  miniBagCSS,
  bagTileCSS,
} from '../styles/ProductTileWrapper.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import RemoveSoldOut from '../../../../common/molecules/RemoveSoldOut';

class ProductTileWrapper extends React.PureComponent<props> {
  constructor(props) {
    super(props);
    this.state = {
      isEditAllowed: true,
      openedTile: 0,
      swipedElement: null,
    };
  }

  toggleEditAllowance = () => {
    const { isEditAllowed } = this.state;
    const { onItemEdit } = this.props;
    if (onItemEdit) {
      onItemEdit(isEditAllowed);
    }
    this.setState({
      isEditAllowed: !isEditAllowed,
    });
  };

  setSwipedElement = elem => {
    this.setState({ swipedElement: elem });
  };

  getTickIcon = () => {
    return <Image alt="closeIcon" className="tick-icon" src={getIconPath('circle-check-fill')} />;
  };

  getHeaderError = (labels, orderItems, pageView) => {
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
        showError && <ErrorMessage bagPage customClass={styles} error={labels.problemWithOrder} />
      );
    }
    return false;
  };

  setSelectedProductTile = ({ index }) => {
    this.setState({ openedTile: index });
  };

  isEditAllowed = (productDetail, pageView) => {
    const { isEditAllowed } = this.state;
    if (
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE ||
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT ||
      (pageView !== 'myBag' && productDetail.miscInfo.orderItemType === CARTPAGE_CONSTANTS.BOPIS)
    ) {
      return false;
    }
    return isEditAllowed;
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
      isBagPage &&
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

  renderItemSflSuccessMsg = (isBagPage, isCartItemSFL, itemSflSuccessMsg) => {
    const { isBagPageSflSection } = this.props;
    return (
      !isBagPageSflSection &&
      isBagPage &&
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

  renderUpdatingBagItemSuccessfulMsg = isUpdating => {
    const { labels } = this.props;
    return (
      isUpdating && (
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

  onLinkClick = ({ e, componentId }) => {
    const { openOverlay } = this.props;
    e.preventDefault();
    openOverlay({
      component: componentId,
      variation: 'primary',
    });
  };

  renderEmptyBag = (
    productSectionData,
    bagLabels,
    isUserLoggedIn,
    isBagPageSflSection,
    showPlccApplyNow
  ) => {
    if (productSectionData.size === 0) {
      return (
        <EmptyBag
          bagLabels={bagLabels}
          isUserLoggedIn={isUserLoggedIn}
          isBagPageSflSection={isBagPageSflSection}
          showPlccApplyNow={showPlccApplyNow}
          onLinkClick={this.onLinkClick}
        />
      );
    }
    return <></>;
  };

  render() {
    const {
      orderItems,
      bagLabels,
      labels,
      pageView,
      confirmRemoveCartItem,
      isUserLoggedIn,
      isPlcc,
      sflItemsCount,
      isBagPageSflSection,
      isCartItemsUpdating,
      sflItems,
      showPlccApplyNow,
      isCartItemSFL,
      isSflItemRemoved,
    } = this.props;
    const productSectionData = isBagPageSflSection ? sflItems : orderItems;
    let isUnavailable;
    let isSoldOut;
    const isBagPage = pageView === 'myBag';
    const inheritedStyles = isBagPage ? productTileCss : miniBagCSS;
    const getUnavailableOOSItems = [];
    const { openedTile, swipedElement } = this.state;
    if (productSectionData && productSectionData.size > 0) {
      const orderItemsView = productSectionData.map((tile, index) => {
        const productDetail = getProductDetails(tile);
        if (productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT) {
          getUnavailableOOSItems.push(productDetail.itemInfo.itemId);
          isSoldOut = true;
        }
        if (productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE) {
          getUnavailableOOSItems.push(productDetail.itemInfo.itemId);
          isUnavailable = true;
        }
        return (
          <CartItemTile
            inheritedStyles={inheritedStyles}
            labels={labels}
            productDetail={productDetail}
            key={`${getProductName(tile)}`}
            pageView={pageView}
            toggleEditAllowance={this.toggleEditAllowance}
            isEditAllowed={this.isEditAllowed(productDetail, pageView)}
            isPlcc={isPlcc}
            itemIndex={index}
            openedTile={openedTile}
            setSelectedProductTile={this.setSelectedProductTile}
            setSwipedElement={this.setSwipedElement}
            swipedElement={swipedElement}
            sflItemsCount={sflItemsCount}
            isBagPageSflSection={isBagPageSflSection}
          />
        );
      });
      const { isDeleting, isUpdating } = isCartItemsUpdating;
      return (
        <>
          {!isBagPageSflSection && this.getHeaderError(labels, productSectionData, pageView)}
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
          {this.renderItemSflSuccessMsg(isBagPage, isCartItemSFL, labels.sflSuccess)}
          {this.renderSflItemRemovedMessage(isSflItemRemoved, labels.sflDeleteSuccess)}
          {this.renderUpdatingBagItemSuccessfulMsg(isUpdating)}
          {orderItemsView}
        </>
      );
    }
    return (
      <>
        {this.renderEmptyBag(
          productSectionData,
          bagLabels,
          isUserLoggedIn,
          isBagPageSflSection,
          showPlccApplyNow
        )}
      </>
    );
  }
}

ProductTileWrapper.defaultProps = {
  pageView: '',
  bagLabels: {},
  isBagPageSflSection: false,
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  sflItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  confirmRemoveCartItem: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  pageView: PropTypes.string,
  bagLabels: PropTypes.shape(),
  sflItemsCount: PropTypes.number.isRequired,
  isBagPageSflSection: PropTypes.bool,
  showPlccApplyNow: PropTypes.bool.isRequired,
  isCartItemSFL: PropTypes.bool.isRequired,
  isSflItemRemoved: PropTypes.bool.isRequired,
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
