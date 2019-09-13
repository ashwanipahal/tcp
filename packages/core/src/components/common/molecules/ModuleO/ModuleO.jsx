import React from 'react';
import PropTypes from 'prop-types';
import ProductGridItem from '../../../features/browse/ProductListing/molecules/ProductList/views/ProductsGridItem';
import { isMobileApp } from '../../../../utils';

const ModuleO = props => {
  const {
    loadedProductCount,
    generalProductId,
    item,
    showQuickViewForProductId,
    currencySymbol,
    currencyExchange,
    onAddItemToFavorites,
    onQuickViewOpenClick,
    onPickUpOpenClick,
    onColorChange,
    isBopisEnabled,
    sequenceNumber,
    unbxdId,
    onProductCardHover,
    isBopisEnabledForClearance,
    isPlcc,
    onQuickBopisOpenClick,
    siblingProperties,
    isEvenElement,
    gridIndex,
    labels,
  } = props;
  return (
    <ProductGridItem
      isMobile={isMobileApp()}
      loadedProductCount={loadedProductCount}
      key={generalProductId}
      item={item}
      isShowQuickView={showQuickViewForProductId === generalProductId}
      currencySymbol={currencySymbol}
      currencyExchange={currencyExchange}
      onAddItemToFavorites={onAddItemToFavorites}
      onQuickViewOpenClick={onQuickViewOpenClick}
      onPickUpOpenClick={onPickUpOpenClick}
      onColorChange={onColorChange}
      isBopisEnabled={isBopisEnabled}
      sqnNmbr={sequenceNumber}
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
    />
  );
};

ModuleO.propTypes = {
  loadedProductCount: PropTypes.number.isRequired,
  generalProductId: PropTypes.string.isRequired,
  item: PropTypes.shape({}).isRequired,
  showQuickViewForProductId: PropTypes.string,
  currencySymbol: PropTypes.string,
  currencyExchange: PropTypes.arrayOf(
    PropTypes.oneOfType(
      PropTypes.shape({
        exchangeValue: PropTypes.number,
      })
    )
  ),
  onAddItemToFavorites: PropTypes.func,
  onQuickViewOpenClick: PropTypes.func,
  onPickUpOpenClick: PropTypes.func,
  onColorChange: PropTypes.func,
  isBopisEnabled: PropTypes.bool,
  sequenceNumber: PropTypes.number.isRequired,
  unbxdId: PropTypes.string,
  onProductCardHover: PropTypes.string,
  isBopisEnabledForClearance: PropTypes.string,
  isPlcc: PropTypes.string,
  onQuickBopisOpenClick: PropTypes.func,
  siblingProperties: PropTypes.shape({}),
  isEvenElement: PropTypes.bool,
  gridIndex: PropTypes.number,
  labels: PropTypes.shape({}).isRequired,
};

ModuleO.defaultProps = {
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
  isPlcc: false,
  siblingProperties: {
    colorMap: [],
    promotionalMessage: '',
    promotionalPLCCMessage: '',
  },
  isEvenElement: false,
  gridIndex: 0,
};

export default ModuleO;
