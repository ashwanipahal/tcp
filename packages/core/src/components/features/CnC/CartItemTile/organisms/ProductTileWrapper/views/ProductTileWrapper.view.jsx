import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { getIconPath, isMobileApp } from '@tcp/core/src/utils';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss, { miniBagCSS } from '../styles/ProductTileWrapper.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CartItemTileSkelton from '../../../molecules/CartItemTile/skelton/CartItemTileSkelton.view';

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

  onLinkClick = ({ e, componentId }) => {
    const { openOverlay } = this.props;
    e.preventDefault();
    openOverlay({
      component: componentId,
      variation: 'primary',
    });
  };

  getTickIcon = () => {
    return <Image alt="closeIcon" className="tick-icon" src={getIconPath('circle-check-fill')} />;
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

  renderItemSflSuccessMsg = (isBagPage, isCartItemSFL, itemSflSuccessMsg) => {
    const { isBagPageSflSection } = this.props;
    return (
      !isBagPageSflSection &&
      !isMobileApp() &&
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

  renderEmptyBag = (
    productSectionData,
    bagLabels,
    isUserLoggedIn,
    isBagPageSflSection,
    showPlccApplyNow,
    isBagPage
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
    if (isBagPage) {
      return (
        <>
          <CartItemTileSkelton />
          <CartItemTileSkelton />
        </>
      );
    }
    return null;
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
      setHeaderErrorState,
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
          <>
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
          </>
        );
      });
      return (
        <>
          {!isMobileApp() &&
            setHeaderErrorState(true, {
              labels,
              orderItems,
              pageView,
              isUnavailable,
              isSoldOut,
              getUnavailableOOSItems,
              confirmRemoveCartItem,
              isBagPageSflSection,
              isCartItemSFL,
              isCartItemsUpdating,
              isSflItemRemoved,
            })}
          {this.renderItemSflSuccessMsg(isBagPage, isCartItemSFL, labels.sflSuccess)}
          {this.renderSflItemRemovedMessage(isSflItemRemoved, labels.sflDeleteSuccess)}
          {orderItemsView}
        </>
      );
    }
    return (
      <>
        {!isMobileApp() &&
          setHeaderErrorState(true, {
            labels,
            orderItems,
            pageView,
            isUnavailable,
            isSoldOut,
            getUnavailableOOSItems,
            confirmRemoveCartItem,
            isBagPageSflSection,
            isCartItemSFL,
            isCartItemsUpdating,
            isSflItemRemoved,
          })}
        {this.renderItemSflSuccessMsg(isBagPage, isCartItemSFL, labels.sflSuccess)}
        {this.renderSflItemRemovedMessage(isSflItemRemoved, labels.sflDeleteSuccess)}
        {this.renderEmptyBag(
          productSectionData,
          bagLabels,
          isUserLoggedIn,
          isBagPageSflSection,
          showPlccApplyNow,
          isBagPage
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
