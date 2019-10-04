import React from 'react';
import PropTypes from 'prop-types';
import ProductGridItem from '../../../features/browse/ProductListing/molecules/ProductList/views/ProductsGridItem';
import { isMobileApp } from '../../../../utils';
import withStyles from '../../hoc/withStyles';
import style from './ModuleO.style';

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
    className,
  } = props;
  return (
    <ul>
      <ProductGridItem
        className={className}
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
        isPLPredesign
        isKeepAliveKillSwitch={false}
        labels={labels}
        hideImageCarousel
      />
    </ul>
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
  onProductCardHover: PropTypes.func,
  isBopisEnabledForClearance: PropTypes.bool,
  isPlcc: PropTypes.bool,
  onQuickBopisOpenClick: PropTypes.func,
  siblingProperties: PropTypes.shape({}),
  isEvenElement: PropTypes.bool,
  gridIndex: PropTypes.number,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

ModuleO.defaultProps = {
  showQuickViewForProductId: '',
  currencySymbol: '',
  onAddItemToFavorites: () => {},
  onQuickViewOpenClick: () => {},
  onPickUpOpenClick: () => {},
  onColorChange: () => {},
  isBopisEnabled: false,
  unbxdId: '',
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

export { ModuleO as ModuleOVanilla };
export default withStyles(ModuleO, style);
