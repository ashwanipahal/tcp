/**
 * @module ProductItemComponents
 * Container of smaller function that will be renderer as Component to create a ProductItem.
 *
 * @author Florencia <facosta@minutentag.com>
 */

import React from 'react';
// import { isClient, isTouchClient } from 'routing/routingHelper';
import { isClient, isTouchClient } from '@tcp/core/src/utils';
import { labels } from '../labels/labels';
import cssClassName from '../utils/cssClassName';

import ButtonWithSpinner from './ButtonWithSpinner';

import ServerToClientRenderPatch from './ServerToClientRenderPatch';

function productLink(loadedProductCount, pdpUrl, event) {
  event.preventDefault();
  if (isClient()) {
    window.sessionStorage.setItem('LAST_PAGE_PATH', window.location.pathname);
    window.sessionStorage.setItem('LOADED_PRODUCT_COUNT', loadedProductCount);
    window.sessionStorage.setItem('SCROLL_POINT', window.scrollY);
    window.location = pdpUrl;
  }
}

export function ProductMainImage(props) {
  // eslint-disable-next-line
  const { imageUrl, productName, pdpUrl, loadedProductCount, analyticsData, keepAlive } = props;
  return (
    <figure className="product-image-container" itemScope itemType="http://schema.org/ImageObject">
      <a
        className={keepAlive && 'out-of-stock-overlap'}
        onClick={e => productLink(loadedProductCount, pdpUrl, e)}
        title={productName}
        unbxdattr="product"
        unbxdparam_sku={analyticsData && analyticsData.pId}
        unbxdparam_prank={analyticsData && analyticsData.prank}
        href={pdpUrl}
      >
        <img
          className="product-image-content img-item"
          src={imageUrl}
          alt={productName}
          itemProp="contentUrl"
        />
      </a>
    </figure>
  );
}

export function ProductSKUInfo(props) {
  // eslint-disable-next-line
  const { color, size, fit } = props;

  if (!color && !size && !fit) {
    return null;
  }

  return (
    <div className="product-sku-info-container">
      {color && <img src={color.imagePath} alt={color.name} className="img-color" />}
      {/* eslint-disable-next-line */}
      {size && <span className="size-container">Size {size}</span>}
      {size && fit && <i className="separator-bar-icon">|</i>}
      {fit && <span className="fit-container">{fit}</span>}
    </div>
  );
}

export function ProductTitle(props) {
  // eslint-disable-next-line
  const { name, pdpUrl, loadedProductCount, children } = props;
  // eslint-disable-next-line
  const analyticsData = props.analyticsData ? props.analyticsData : {};
  return (
    <div className="product-title-container">
      <h3>
        <a
          onClick={e => productLink(loadedProductCount, pdpUrl, e)}
          className="product-title-content name-item"
          unbxdattr="product"
          unbxdparam_sku={analyticsData.pId}
          unbxdparam_prank={analyticsData.prank}
          href={pdpUrl}
        >
          {name}
        </a>
      </h3>
      {children}
    </div>
  );
}

/* NOTE: This issue (DT-28867) added isMobile condition. */
/* NOTE: As per DT-29548, isMobile condition is not valid. "Offer" price should be shown below "List" price (always) */
/* NOTE: DT-27216, if offerPrice and listPrice are the same, just offerPrice should be shown (and will be black) */
/* eslint-disable */
export function ProductPricesSection(props) {
  const {
    currencySymbol,
    listPrice,
    offerPrice,
    noMerchantBadge,
    merchantTag,
    hidePrefixListPrice,
  } = props;

  const offerPriceClass = cssClassName('text-price ', 'offer-price ', {
    'offer-price-only': offerPrice === listPrice,
  });
  const listPriceClass = cssClassName('text-price ', 'list-price ', {
    'no-badge': !noMerchantBadge,
  });
  const prefixListPrice = hidePrefixListPrice ? '' : 'Was: ';
  return (
    <div className="container-price">
      {offerPrice && (
        <span className={offerPriceClass}>{currencySymbol + offerPrice.toFixed(2)}</span>
      )}
      {offerPrice && offerPrice !== listPrice && (
        <span className={listPriceClass}>
          {prefixListPrice}
          {currencySymbol + listPrice.toFixed(2)}
        </span>
      )}
      {merchantTag && (
        <span className="badge-item-container merchant-badge-container">{merchantTag}</span>
      )}
    </div>
  );
}

export function ProductPickupIcon(props) {
  // eslint-disable-next-line
  const { isMobile, className, onClick, isShowBopisButton, keepAlive } = props;
  const myClassName = isMobile
    ? cssClassName('pickup-button-container ', className)
    : cssClassName(
        'pickup-icon-container ',
        { 'hover-button-enabled ': !isTouchClient() },
        className,
        { ' keep-alive-pickup-icon': keepAlive }
      );

  const spinnerClassName = cssClassName(
    isMobile ? 'pickup-button-icon-spinner ' : 'pickup-icon-spinner inline-spinner-item '
  );

  if (!isShowBopisButton) {
    return null;
  }
  return (
    <ButtonWithSpinner
      spinnerClassName={spinnerClassName}
      type="button"
      data-analytics={labels.ANALYTICS.PICKUP_BUTTON_EVENT}
      className={myClassName}
      onClick={onClick}
    >
      <span className={cssClassName({ 'message-icon ': !isMobile })}>Pick up in store</span>
    </ButtonWithSpinner>
  );
}

export class ProductWishlistIcon extends ServerToClientRenderPatch {
  render() {
    const { onClick, activeButton, isRemove, isDisabled, isMobile, keepAlive } = this.props;
    let { className } = this.props;
    const { hasTouchClient } = this.state;
    const removeTextHeader = isMobile ? 'Tap to Remove' : 'Click to Remove';
    const removeTxtDesc = isMobile
      ? 'Remove this item from your Favorites List by tapping the heart icon again.'
      : 'Remove this item from your Favorites List by clicking the heart icon again.';
    className = cssClassName(
      { 'favorite-icon-active ': activeButton || isRemove },
      { 'hover-button-enabled ': !hasTouchClient },
      'favorite-icon-container ',
      className,
      { ' keep-alive-fav-icon': keepAlive }
    );

    return (
      <button type="button" className={className} onClick={onClick} disabled={isDisabled}>
        Favorites
        {isRemove ? (
          <div className="information-remove">
            <p className="information-remove-message">
              <strong className="remove-title">{removeTextHeader}</strong>
              <br />
              {removeTxtDesc}
            </p>
          </div>
        ) : (
          <span className="message-icon">Add to favorites</span>
        )}
      </button>
    );
  }
}

export function BadgeItem(props) {
  // eslint-disable-next-line
  const { text, className, haveSpace } = props;
  const containerClassName = cssClassName('badge-item-container ', className);
  const hiddenClassName = cssClassName('sibling-badge-hidden ', className);

  if (!text) {
    if (haveSpace) {
      return <span className={hiddenClassName}>&nbsp;</span>;
    }
    return null;
  }

  return (
    <div className={containerClassName}>
      <p>{text}</p>
    </div>
  );
}

export function PromotionalMessage(props) {
  // eslint-disable-next-line
  const { message, className, haveSpace, wrapperClassName } = props;
  // eslint-disable-next-line
  const classNameValue = !!wrapperClassName ? wrapperClassName : 'promotion-message-container';
  const containerClassName = cssClassName(`${classNameValue} `, className);
  if (message) {
    return (
      <div className={containerClassName}>
        <div className="promotion-message" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    );
  }
  if (haveSpace) {
    return <span className="promotion-message-hidden">&nbsp;</span>;
  }
  return null;
}
