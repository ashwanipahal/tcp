import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListStyle from '../../ProductList.style';
import { isMobileApp } from '../../../../../../../utils';
import ProductsGridItem from './ProductsGridItem';
import { GRID_ITEMS_TYPES } from '../propTypes/productsAndItemsPropTypes';

const isGridItem = item => {
  let flag = true;
  if (
    typeof item === 'string' ||
    (item &&
      // eslint-disable-next-line
      item.hasOwnProperty('type') &&
      (item.type === GRID_ITEMS_TYPES.MARKETING ||
        item.type === GRID_ITEMS_TYPES.CONTAINED_MARKETING_ITEM))
  ) {
    flag = false;
  }
  return flag;
};

const ProductList = ({
  className,
  products,
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
}) => {
  let gridIndex = 0;
  return (
    <div className={className}>
      {products.map((item, index) => {
        const isEvenElement = gridIndex % 2;
        if (typeof item === 'string') {
          gridIndex = 0;
        } else if (isGridItem(item)) {
          gridIndex += 1;
        }
        window.gridIndex = gridIndex;
        return (
          <div className="product-tile">
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
              isPlcc={false}
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
              isEvenElement={false}
              gridIndex={gridIndex}
              isPLPredesign={false}
              isKeepAliveKillSwitch={false}
            />

            {/* <p>
              Name12:
              {item.productInfo.name}
            </p>
            <p>
              listPrice:
              {item.productInfo.listPrice}
            </p>
            <p>
              offerPrice:
              {item.productInfo.offerPrice}
            </p>
            <p>
              ratings:
              {item.productInfo.ratings}
            </p>
            <p>
              reviewsCount:
              {item.productInfo.reviewsCount}
            </p>
            <Button
              onClick={() => {}}
              buttonVariation="fixed-width"
              fill="BLUE"
              className="add-to-bag-btn"
            >
              Add to bag
            </Button> */}
          </div>
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  /** the generalProductId of the product (if any) requesting quickView to show */
  showQuickViewForProductId: PropTypes.string,
  /** Price related currency symbol to be rendered */
  currencySymbol: ProductsGridItem.propTypes.currencySymbol,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  /** callback for clicks on wishlist CTAs. Accepts: colorProductId. */
  onAddItemToFavorites: PropTypes.func,
  /** callback for clicks on quickView CTAs. Accepts a generalProductId, colorProductId */
  onQuickViewOpenClick: PropTypes.func,
  onPickUpOpenClick: PropTypes.func,
  /** callback to trigger when the user chooses to display a different color (used to retrieve prices) */
  onColorChange: PropTypes.func,
  /** When flase, flags that BOPIS is globaly disabled */
  isBopisEnabled: PropTypes.bool,
  /* This unbxd request ID will be passed to UNXD product click anlytics as request ID */
  unbxdId: PropTypes.string,
  onProductCardHover: PropTypes.func,
  isBopisEnabledForClearance: PropTypes.bool,
  onQuickBopisOpenClick: PropTypes.func,
  siblingProperties: PropTypes.shape({
    colorMap: PropTypes.arrayOf(PropTypes.shape({})),
    promotionalMessage: PropTypes.string,
    promotionalPLCCMessage: PropTypes.string,
  }),
  loadedProductCount: PropTypes.number.isRequired,
};

ProductList.defaultProps = {
  className: '',
  products: [],
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
};

export default withStyles(ProductList, ProductListStyle);
