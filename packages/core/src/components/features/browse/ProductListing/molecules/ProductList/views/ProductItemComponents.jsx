/**
 * @module ProductItemComponents
 * Container of smaller function that will be renderer as Component to create a ProductItem.
 *
 * @author Florencia <facosta@minutentag.com>
 */

import React from 'react';
import Dotdotdot from 'react-dotdotdot';
import PropTypes from 'prop-types';
// import { isClient, isTouchClient } from 'routing/routingHelper';
// import { isTouchClient } from '../../../../../../../utils';
import { isClient, getIconPath, getLocator } from '../../../../../../../utils';
import { getFormattedLoyaltyText, getProductListToPath } from '../utils/productsCommonUtils';
// import { labels } from '../labels/labels';
import { Image, BodyCopy, Anchor, Button, Col } from '../../../../../../common/atoms';

import ServerToClientRenderPatch from './ServerToClientRenderPatch';

export function productLink(loadedProductCount, pdpUrl, event) {
  event.preventDefault();
  if (isClient()) {
    window.sessionStorage.setItem('LAST_PAGE_PATH', window.location.pathname);
    window.sessionStorage.setItem('LOADED_PRODUCT_COUNT', loadedProductCount);
    window.sessionStorage.setItem('SCROLL_POINT', window.scrollY);
    window.location = pdpUrl;
  }
}

export function ProductTitle(values) {
  const { name, pdpUrl, loadedProductCount, children } = values;
  const pdpToPath = getProductListToPath(pdpUrl);
  return (
    <div className="product-title-container">
      <Anchor
        handleLinkClick={e => productLink(loadedProductCount, pdpUrl, e)}
        to={pdpToPath}
        asPath={pdpUrl}
        inheritedStyles="product-title-content"
      >
        <Dotdotdot clamp={2}>
          <BodyCopy fontSize={['fs12', 'fs13', 'fs14']} fontFamily="secondary">
            {name}
          </BodyCopy>
        </Dotdotdot>
      </Anchor>
      {children}
    </div>
  );
}

/* NOTE: This issue (DT-28867) added isMobile condition. */
/* NOTE: As per DT-29548, isMobile condition is not valid. "Offer" price should be shown below "List" price (always) */
/* NOTE: DT-27216, if offerPrice and listPrice are the same, just offerPrice should be shown (and will be black) */
export function ProductPricesSection(props) {
  const { currencySymbol, listPrice, offerPrice, merchantTag } = props;

  return (
    <div className="container-price">
      {offerPrice && (
        <BodyCopy
          dataLocator={getLocator('global_Price_text')}
          color="red.500"
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize={['fs15', 'fs18', 'fs20']}
        >
          {currencySymbol + offerPrice.toFixed(2)}
        </BodyCopy>
      )}
      {offerPrice && offerPrice !== listPrice && (
        <BodyCopy
          component="span"
          color="gray.700"
          fontFamily="secondary"
          fontWeight="semibold"
          fontSize={['fs10', 'fs12', 'fs14']}
          className="list-price"
        >
          {currencySymbol + listPrice.toFixed(2)}
        </BodyCopy>
      )}
      {merchantTag && (
        <BodyCopy
          component="span"
          color="red.500"
          fontFamily="secondary"
          fontWeight="semibold"
          className="merchant-tag"
          fontSize={['fs10', 'fs12', 'fs14']}
        >
          {merchantTag}
        </BodyCopy>
      )}
    </div>
  );
}

export class ProductWishlistIcon extends ServerToClientRenderPatch {
  render() {
    const { onClick, isRemove, isDisabled, isMobile, className, activeButton } = this.props;
    const removeTextHeader = isMobile ? 'Tap to Remove' : 'Click to Remove';
    const removeTxtDesc = isMobile
      ? 'Remove this item from your Favorites List by tapping the heart icon again.'
      : 'Remove this item from your Favorites List by clicking the heart icon again.';

    return (
      <BodyCopy
        component="div"
        role="button"
        className="fav-icon-wrapper"
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {isRemove ? (
          <div className="information-remove">
            <p className="information-remove-message">
              <strong className="remove-title">{removeTextHeader}</strong>
              <br />
              {removeTxtDesc}
            </p>
          </div>
        ) : (
          <button className="clear-button">
            <Image
              data-locator={getLocator('global_favorite_button')}
              alt="Add-to-favorite"
              title="addToFavorite"
              className={activeButton ? `${className} active` : className}
              src={activeButton ? getIconPath('added-to-favorite') : getIconPath('add-to-favorite')}
            />
          </button>
        )}
      </BodyCopy>
    );
  }
}

export function BadgeItem(props) {
  const { text, className, isShowBadges, customFontWeight, customFontSize } = props;

  return (
    <div className={className}>
      <BodyCopy
        dataLocator={getLocator('global_productbadge_txt')}
        fontFamily="secondary"
        fontWeight={customFontWeight || 'semibold'}
        fontSize={customFontSize}
      >
        {isShowBadges && text}
      </BodyCopy>
    </div>
  );
}

export function PromotionalMessage(props) {
  const { text } = props;
  return (
    <Dotdotdot clamp={2}>
      <BodyCopy
        fontSize={['fs9', 'fs12', 'fs14']}
        fontWeight="extrabold"
        fontFamily="secondary"
        data-locator={getLocator('global_loyalty_text')}
        className="loyalty-text-container"
      >
        {text && getFormattedLoyaltyText(text)[0]}
        {text && (
          <BodyCopy
            fontSize={['fs9', 'fs12', 'fs14']}
            fontWeight="extrabold"
            fontFamily="secondary"
            component="span"
            color="gray.900"
          >
            {` on${getFormattedLoyaltyText(text)[1]}`}
          </BodyCopy>
        )}
      </BodyCopy>
    </Dotdotdot>
  );
}

const renderWishListItem = (item, labels) => (
  <div className="wish-list-item-section">
    <p className="wish-list-name">
      <span>
        {item.isDefault && (
          <Image
            src={getIconPath('selected-item-check-no-circle')}
            alt="check mark"
            className="wish-list-tick-mark icon-small"
            data-locator="wish-list-check-icon"
            height="20px"
          />
        )}
      </span>
      <span>{item.displayName}</span>
    </p>
    <p className="wish-list-count-section">
      <span className="wish-list-count">{item.itemsCount}</span>
      <span>{labels.lbl_fav_items}</span>
    </p>
  </div>
);

export const CreateWishList = props => {
  const {
    labels,
    wishlistsSummaries,
    createNewWishList,
    createNewWishListMoveItem,
    itemId,
  } = props;
  return (
    <div className="create-wish-list-section">
      <h4 className="create-wish-list-header">{labels.lbl_fav_myFavWishList}</h4>
      <ul>
        {wishlistsSummaries.map(item => (
          <li className="wish-list-item">
            {createNewWishListMoveItem ? (
              <Button
                onClick={() => createNewWishListMoveItem({ wisListId: item.id, id: itemId })}
                className="wish-list-item__button"
              >
                {renderWishListItem(item, labels)}
              </Button>
            ) : (
              renderWishListItem(item, labels)
            )}
          </li>
        ))}
      </ul>
      <Button
        onClick={createNewWishList}
        buttonVariation="fixed-width"
        fill="BLACK"
        data-locator="create-new-wish-list"
        className="create-new__button"
      >
        {labels.lbl_fav_createNewList}
      </Button>
    </div>
  );
};

export const ProductSKUInfo = props => {
  const { size, fit } = props;

  if (!size && !fit) {
    return null;
  }

  return (
    <div className="product-sku-info-container">
      {size && (
        <span className="size-container">
          Size
          {size}
        </span>
      )}
      {size && fit && <i className="separator-bar-icon">|</i>}
      {fit && <span className="fit-container">{fit}</span>}
    </div>
  );
};

export const PurchaseSection = (quantity, labels, quantityPurchased) =>
  !!quantity && (
    <div className="purchase-section">
      <span>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {quantityPurchased}/{quantity}
      </span>
      <span className="is-purchase-label">{labels.lbl_fav_purchased}</span>
    </div>
  );

export const WishListIcon = (
  isFavoriteView,
  isInDefaultWishlist,
  handleAddToWishlist,
  itemNotAvailable
) => {
  if (itemNotAvailable) {
    return null;
  }
  return (
    <Col colSize={{ small: 2, medium: 2, large: 2 }}>
      <ProductWishlistIcon
        onClick={handleAddToWishlist}
        activeButton={isInDefaultWishlist || isFavoriteView}
        className="fav-icon"
      />
    </Col>
  );
};

export const EditButton = (props, selectedColorProductId, itemNotAvailable) => {
  if (itemNotAvailable) {
    return null;
  }
  const { isFavoriteView, labels, onQuickViewOpenClick } = props;
  return (
    isFavoriteView && (
      <Anchor
        className="edit-fav-item__button"
        handleLinkClick={event => {
          event.preventDefault();
          onQuickViewOpenClick({ colorProductId: selectedColorProductId }, true);
        }}
        noLink
      >
        {labels.lbl_fav_edit}
      </Anchor>
    )
  );
};

ProductSKUInfo.propTypes = {
  size: PropTypes.string,
  fit: PropTypes.string,
};

ProductSKUInfo.defaultProps = {
  size: '',
  fit: '',
};

CreateWishList.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  wishlistsSummaries: PropTypes.arrayOf({}).isRequired,
  createNewWishList: PropTypes.func.isRequired,
  createNewWishListMoveItem: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
};

PromotionalMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

BadgeItem.defaultProps = {
  text: '',
  className: '',
  customFontWeight: '',
  isShowBadges: true,
  customFontSize: ['fs10', 'fs12', 'fs14'],
};

BadgeItem.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  isShowBadges: PropTypes.bool,
  customFontWeight: PropTypes.string,
  customFontSize: PropTypes.arrayOf(PropTypes.string),
};

ProductPricesSection.defaultProps = {
  currencySymbol: '$',
  listPrice: 0,
  offerPrice: 0,
  merchantTag: '',
};

ProductPricesSection.propTypes = {
  currencySymbol: PropTypes.string,
  listPrice: PropTypes.number,
  offerPrice: PropTypes.number,
  merchantTag: PropTypes.string,
};
