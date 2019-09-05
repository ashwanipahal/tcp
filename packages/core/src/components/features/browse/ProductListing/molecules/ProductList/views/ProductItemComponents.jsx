/**
 * @module ProductItemComponents
 * Container of smaller function that will be renderer as Component to create a ProductItem.
 *
 * @author Florencia <facosta@minutentag.com>
 */

import React from 'react';
import Dotdotdot from 'react-dotdotdot';
// import { isClient, isTouchClient } from 'routing/routingHelper';
// import { isTouchClient } from '../../../../../../../utils';
import { isClient, getIconPath, getLocator } from '../../../../../../../utils';
import { getFormattedLoyaltyText } from '../utils/productsCommonUtils';
// import { labels } from '../labels/labels';
import { Image, BodyCopy, Anchor } from '../../../../../../common/atoms';

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
  return (
    <div className="product-title-container">
      <Anchor
        handleLinkClick={e => productLink(loadedProductCount, pdpUrl, e)}
        to={pdpUrl}
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
/* eslint-disable */
export function ProductPricesSection(props) {
  const { currencySymbol, listPrice, offerPrice, noMerchantBadge, merchantTag } = props;
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
          className={'list-price'}
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

// export function ProductPickupIcon(props) {
//   // eslint-disable-next-line
//   const { isMobile, className, onClick, isShowBopisButton, keepAlive } = props;
//   const myClassName = isMobile
//     ? cssClassName('pickup-button-container ', className)
//     : cssClassName(
//         'pickup-icon-container ',
//         { 'hover-button-enabled ': !isTouchClient() },
//         className,
//         { ' keep-alive-pickup-icon': keepAlive }
//       );

//   const spinnerClassName = cssClassName(
//     isMobile ? 'pickup-button-icon-spinner ' : 'pickup-icon-spinner inline-spinner-item '
//   );

//   if (!isShowBopisButton) {
//     return null;
//   }
//   return (
//     <ButtonWithSpinner
//       spinnerClassName={spinnerClassName}
//       type="button"
//       data-analytics={labels.ANALYTICS.PICKUP_BUTTON_EVENT}
//       className={myClassName}
//       onClick={onClick}
//     >
//       <span className={cssClassName({ 'message-icon ': !isMobile })}>Pick up in store</span>
//     </ButtonWithSpinner>
//   );
// }

export class ProductWishlistIcon extends ServerToClientRenderPatch {
  render() {
    const { onClick, isRemove, isDisabled, isMobile } = this.props;
    let { className } = this.props;
    const removeTextHeader = isMobile ? 'Tap to Remove' : 'Click to Remove';
    const removeTxtDesc = isMobile
      ? 'Remove this item from your Favorites List by tapping the heart icon again.'
      : 'Remove this item from your Favorites List by clicking the heart icon again.';

    return (
      <div className="fav-icon-wrapper" onClick={onClick} isDisabled={isDisabled}>
        {isRemove ? (
          <div className="information-remove">
            <p className="information-remove-message">
              <strong className="remove-title">{removeTextHeader}</strong>
              <br />
              {removeTxtDesc}
            </p>
          </div>
        ) : (
          <button class="clear-button">
            <Image
              data-locator={getLocator('global_favorite_button')}
              alt="Add-to-favorite"
              title="addToFavorite"
              className={className}
              src={getIconPath('add-to-favorite')}
            />
          </button>
        )}
      </div>
    );
  }
}

export function BadgeItem(props) {
  // eslint-disable-next-line
  const { text, className, isShowBadges } = props;

  return (
    <div className={className}>
      <BodyCopy
        dataLocator={getLocator('global_productbadge_txt')}
        fontFamily="secondary"
        fontWeight="semibold"
        fontSize={['fs10', 'fs12', 'fs14']}
      >
        {isShowBadges && text}
      </BodyCopy>
    </div>
  );
}

export function PromotionalMessage(props) {
  const { text } = props;
  return (
    <BodyCopy
      fontSize={['fs10', 'fs12', 'fs14']}
      fontWeight="extrabold"
      fontFamily="secondary"
      data-locator={getLocator('global_loyalty_text')}
      className="loyalty-text-container"
    >
      {text && getFormattedLoyaltyText(text)[0]}
      {text && (
        <BodyCopy
          fontSize={['fs10', 'fs12', 'fs14']}
          fontWeight="extrabold"
          fontFamily="secondary"
          component="span"
          color="gray.900"
        >{` on${getFormattedLoyaltyText(text)[1]}`}</BodyCopy>
      )}
    </BodyCopy>
  );
}
