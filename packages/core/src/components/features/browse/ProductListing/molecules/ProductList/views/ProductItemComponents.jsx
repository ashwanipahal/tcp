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
  const { text, className, isShowBadges, customFontWeight } = props;

  return (
    <div className={className}>
      <BodyCopy
        dataLocator={getLocator('global_productbadge_txt')}
        fontFamily="secondary"
        fontWeight={customFontWeight || 'semibold'}
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

PromotionalMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

BadgeItem.defaultProps = {
  text: '',
  className: '',
  customFontWeight: '',
  isShowBadges: true,
};

BadgeItem.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  isShowBadges: PropTypes.bool,
  customFontWeight: PropTypes.string,
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
