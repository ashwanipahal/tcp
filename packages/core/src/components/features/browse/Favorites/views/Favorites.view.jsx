import React from 'react';
import { PropTypes } from 'prop-types';
import ProductAltImages from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductList/views/ProductAltImages';
import { Row, Col, BodyCopy } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import FavoritesViewStyle from '../styles/Favorites.style';
import MoveItem from '../molecules/MoveItem';
import ProductTitle from '../molecules/ProductTitle';
import ProductRemoveSection from '../molecules/ProductRemoveSection';
import ProductSKUInfo from '../molecules/ProductSKUInfo';
import ProductPricesSection from '../molecules/ProductPricesSection';
import { ProductWishlistIcon } from '../../ProductListing/molecules/ProductList/views/ProductItemComponents';
import ProductStatus from '../molecules/ProductStatus';
import ProductPurchaseSection from '../molecules/ProductPurchaseSection';
import { STATUS, AVAILABILITY } from '../container/Favorites.constants';

const FavoritesView = props => {
  const {
    className,
    wishlistsSummaries,
    killSwitchKeepAliveProduct,
    activeWishList,
    createNewWishListMoveItem,
    deleteWishList,
    getActiveWishlist,
    createNewWishList,
    setLastDeletedItemId,
  } = props;

  const favoriteListMap = wishlistsSummaries.map(favorite => {
    const { id, displayName, itemsCount, isDefault } = favorite;
    const updatedDisplayName = displayName || id;
    return (
      <>
        <button className="wish-list" onClick={() => getActiveWishlist(id)}>
          <span className="favorite-list-name">
            {updatedDisplayName}
            {isDefault && <i className="heart-icon-container">Default</i>}
          </span>
          <p>
            <span>
              {updatedDisplayName}
              {isDefault && <i className="heart-icon-container">Default</i>}
            </span>
            <span className="item-list">
              {itemsCount}
              item
              {itemsCount > 1 ? 's' : ''}
            </span>
          </p>
        </button>
      </>
    );
  });

  const productsList =
    !!activeWishList &&
    // eslint-disable-next-line complexity
    activeWishList.items.map(item => {
      const {
        skuInfo: { color, fit, size },
        productInfo: { name, pdpUrl, offerPrice, listPrice },
        itemInfo: { itemId, quantity, availability, keepAlive },
        imagesByColor,
        quantityPurchased,
        isReadOnly,
      } = item;
      const itemNotAvailable = availability === AVAILABILITY.SOLDOUT;
      const isKeepAlive = killSwitchKeepAliveProduct && keepAlive;
      const imageUrls = imagesByColor[color.name].extraImages.map(
        imageEntry => imageEntry.regularSizeImageUrl
      );

      return (
        <div className="product-items">
          {!(isKeepAlive && itemNotAvailable) && (
            <ProductStatus
              status={(quantityPurchased > 0 && STATUS.PURCHASED) || availability}
              keepAlive={isKeepAlive}
            />
          )}
          {!isReadOnly && (
            <ProductWishlistIcon
              onClick={() => setLastDeletedItemId({ itemId })}
              isDisabled={itemNotAvailable}
              isRemove
            />
          )}
          <ProductAltImages
            pdpUrl={pdpUrl}
            imageUrls={imageUrls}
            productName={name}
            keepAlive={isKeepAlive && itemNotAvailable}
          />
          <ProductTitle name={name} pdpUrl={pdpUrl} />
          {itemNotAvailable ? (
            <ProductRemoveSection onClick={this.handleRemoveItem} itemId={itemId} />
          ) : (
            <ProductPricesSection listPrice={listPrice} offerPrice={offerPrice} />
          )}
          <ProductSKUInfo color={color} size={size} fit={fit} />
          {!itemNotAvailable && (
            <div className="purchased-and-move-dropdown-container">
              <ProductPurchaseSection
                key="purchased-section"
                purchased={quantityPurchased}
                quantity={quantity}
              />
              {!isReadOnly && (
                <MoveItem
                  key="move-item-select"
                  wishlistItemId={itemId}
                  favoriteList={wishlistsSummaries}
                  createNewWishListMoveItem={createNewWishListMoveItem}
                  deleteWishList={deleteWishList}
                />
              )}
            </div>
          )}
        </div>
      );
    });

  return (
    <Row className={className} fullBleed>
      <Col
        colSize={{ small: 6, medium: 8, large: 12 }}
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <BodyCopy fontWeight="extrabold" fontSize="fs16" className="favorite-title">
          MY FAVORITES
        </BodyCopy>
      </Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 6 }}
        offsetLeft={{ small: 0, medium: 0, large: 3 }}
        className="favorite-list"
      >
        {favoriteListMap}
        <button onClick={createNewWishList}>Create New List</button>
      </Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 2 }}
        offsetLeft={{ small: 0, medium: 0, large: 1 }}
        className="share-list"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <span>Dropdown end</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="display-list"
      >
        <span>Display By:</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="sort-list"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <span>Sort By:</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="brand"
      >
        <span>Brand:</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="fav-items"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <span>4 Items</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 12 }}
        className="product-list"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        {productsList}
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 12 }}
        className="recommendation"
      >
        <div>You may also like</div>
      </Col>
    </Row>
  );
};

FavoritesView.propTypes = {
  className: PropTypes.string,
  wishlistsSummaries: PropTypes.arrayOf({}),
  killSwitchKeepAliveProduct: PropTypes.bool,
  activeWishList: PropTypes.shape({}),
  createNewWishListMoveItem: PropTypes.func.isRequired,
  deleteWishList: PropTypes.func.isRequired,
  getActiveWishlist: PropTypes.func.isRequired,
  createNewWishList: PropTypes.func.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
};

FavoritesView.defaultProps = {
  className: '',
  wishlistsSummaries: [],
  killSwitchKeepAliveProduct: false,
  activeWishList: {},
};

export default withStyles(FavoritesView, FavoritesViewStyle);
