import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Button } from '../../../../../../common/atoms';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListStyle from '../../ProductList.style';
import { isMobileApp } from '../../../../../../../utils';
import ProductsGridItem from './ProductsGridItem';

const isGridItem = item => {
  let flag = true;
  if (
    typeof item === 'string' ||
    (item &&
      // eslint-disable-next-line
      item.hasOwnProperty('type') &&
      (item.type === 'marketing' || item.type === 'marketing_contained'))
  ) {
    flag = false;
  }
  return flag;
};

const ProductList = props => {
  const {
    className,
    productsBlock,
    showQuickViewForProductId,
    currencySymbol,
    onAddItemToFavorites,
    onQuickViewOpenClick,
    onPickUpOpenClick,
    onColorChange,
    isBopisEnabled,
    unbxdId,
    onProductCardHover,
    isBopisEnabledForClearance,
    onQuickBopisOpenClick,
    currencyExchange,
    siblingProperties,
    loadedProductCount,
    labels,
    isPlcc,
    productTileVariation,
    isLoggedIn,
  } = props;
  let gridIndex = 0;

  return (
    <Fragment>
      {productsBlock.map((item, index) => {
        const isEvenElement = gridIndex % 2;
        if (typeof item === 'string') {
          gridIndex = 0;
        } else if (isGridItem(item)) {
          gridIndex += 1;
        }
        window.gridIndex = gridIndex;
        return typeof item === 'string' ? (
          <Heading
            key={item}
            className={`${className} item-title`}
            fontFamily="secondaryFontFamily"
          >
            {item}
          </Heading>
        ) : (
          <div className={`${className} product-tile ${productTileVariation}`}>
            <ProductsGridItem
              isMobile={isMobileApp()}
              loadedProductCount={loadedProductCount}
              key={item.productInfo.generalProductId}
              item={item}
              isGridView
              isShowQuickView={showQuickViewForProductId === item.productInfo.generalProductId}
              currencySymbol={currencySymbol}
              currencyExchange={currencyExchange}
              onAddItemToFavorites={onAddItemToFavorites}
              onQuickViewOpenClick={onQuickViewOpenClick}
              onPickUpOpenClick={onPickUpOpenClick}
              onColorChange={onColorChange}
              isBopisEnabled={isBopisEnabled}
              sqnNmbr={index + 1}
              unbxdId={unbxdId}
              onProductCardHover={onProductCardHover}
              isBopisEnabledForClearance={isBopisEnabledForClearance}
              isCanada={false}
              isPlcc={isPlcc}
              isPLPShowPickupCTA={false}
              isOnModelImgDisplay={false}
              isBossEnabled
              isBossClearanceProductEnabled
              isInternationalShipping={false}
              isShowVideoOnPlp={false}
              onQuickBopisOpenClick={onQuickBopisOpenClick}
              isProductsGridCTAView
              isMatchingFamily={false}
              siblingProperties={siblingProperties}
              isEvenElement={isEvenElement}
              gridIndex={gridIndex}
              isPLPredesign // isPLPredesign should always be true, because this code is taken from existing project(MRT) and this filed has many condition to run the new code correctly and this and if we remove this line we need to change the many existing files.
              isKeepAliveKillSwitch={false}
              labels={labels}
              isLoggedIn={isLoggedIn}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductList.propTypes = {
  className: PropTypes.string,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  /** the generalProductId of the product (if any) requesting quickView to show */
  showQuickViewForProductId: PropTypes.string,
  /** Price related currency symbol to be rendered */
  currencySymbol: PropTypes.string,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  /** callback for clicks on wishlist CTAs. Accepts: colorProductId. */
  onAddItemToFavorites: PropTypes.func,
  /** callback for clicks on quickView CTAs. Accepts a generalProductId, colorProductId */
  onQuickViewOpenClick: PropTypes.func,
  /** callback to trigger when the user chooses to display a different color (used to retrieve prices) */
  onColorChange: PropTypes.func,
  /** When flase, flags that BOPIS is globaly disabled */
  isBopisEnabled: PropTypes.bool,
  /* This unbxd request ID will be passed to UNXD product click anlytics as request ID */
  unbxdId: PropTypes.string,
  onProductCardHover: PropTypes.func,
  onPickUpOpenClick: PropTypes.func,
  isBopisEnabledForClearance: PropTypes.bool,
  onQuickBopisOpenClick: PropTypes.func,
  siblingProperties: PropTypes.shape({
    colorMap: PropTypes.arrayOf(PropTypes.shape({})),
    promotionalMessage: PropTypes.string,
    promotionalPLCCMessage: PropTypes.string,
  }),
  loadedProductCount: PropTypes.number.isRequired,
  labels: PropTypes.shape().isRequired,
  isPlcc: PropTypes.bool,
  productTileVariation: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};

ProductList.defaultProps = {
  className: '',
  productsBlock: [],
  showQuickViewForProductId: '',
  currencySymbol: '',
  onAddItemToFavorites: () => {},
  onQuickViewOpenClick: () => {},
  onPickUpOpenClick: () => {},
  onColorChange: () => {},
  isBopisEnabled: false,
  unbxdId: 'fc0d2287-4a11-4739-98b4-1e2fd91016c4',
  onProductCardHover: () => {},
  isBopisEnabledForClearance: false,
  onQuickBopisOpenClick: () => {},
  currencyExchange: [{ exchangevalue: 1 }],
  siblingProperties: {
    colorMap: [],
    promotionalMessage: '',
    promotionalPLCCMessage: '',
  },
  isPlcc: false,
  productTileVariation: '',
  isLoggedIn: false,
};

export default withStyles(ProductList, ProductListStyle);
export { ProductList as ProductListVanilla };
