import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf/RenderPerf';
import {
  CONTROLS_VISIBLE,
  PAGE_NAVIGATION_VISIBLE,
  RESULTS_VISIBLE,
} from '@tcp/core/src/constants/rum.constants';
import PromoModules from '../../../../common/organisms/PromoModules';

// Changes as per RWD-9852. Keeping this for future reference.
// import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';

import { Row, Col, PLPSkeleton } from '../../../../common/atoms';

import ProductsGrid from '../molecules/ProductsGrid/views';
import GlobalNavigationMenuDesktopL2 from '../molecules/GlobalNavigationMenuDesktopL2/views';
import withStyles from '../../../../common/hoc/withStyles';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';

import ProductListingStyle from '../ProductListing.style';

import FixedBreadCrumbs from '../molecules/FixedBreadCrumbs/views';

import ProductListingFiltersForm from '../molecules/ProductListingFiltersForm';
import ReadMore from '../molecules/ReadMore/views';
import SpotlightContainer from '../molecules/Spotlight/container/Spotlight.container';
import LoadedProductsCount from '../molecules/LoadedProductsCount/views';

// Minimum number of product results worth measuring with a UX timer
const MINIMUM_RESULTS_TO_MEASURE = 3;

const formatProductsData = products => {
  return products.map((tile, index) => {
    const {
      productInfo: { listPrice, offerPrice, name, generalProductId, priceRange },
      miscInfo: { categoryName },
    } = tile;
    const productId = generalProductId && generalProductId.split('_')[0];
    const productName = name;
    return {
      id: productId,
      colorId: generalProductId,
      name: productName,
      price: offerPrice,
      listPrice: listPrice,
      extPrice: priceRange.lowOfferPrice,
      position: index + 1,
      type: categoryName,
    };
  });
};

const ProductListView = ({
  className,
  productsBlock,
  currentNavIds,
  navTree,
  breadCrumbs,
  filters,
  totalProductsCount,
  initialValues,
  filtersLength,
  longDescription,
  labels,
  labelsFilter,
  categoryId,
  formValues,
  getProducts,
  onSubmit,
  sortLabels,
  slpLabels,
  onPickUpOpenClick,
  isFilterBy,
  currencyAttributes,
  currency,
  isLoadingMore,
  plpTopPromos,
  plpGridPromos,
  plpHorizontalPromos,
  asPathVal,
  isSearchListing,
  AddToFavoriteErrorMsg,
  removeAddToFavoritesErrorMsg,
  isLoggedIn,
  isPlcc,
  pageItems,
  products,
  store,
  setClickAnalyticsData,
  pageNameProp,
  pageSectionProp,
  pageSubSectionProp,
  trackPageLoad,
  ...otherProps
}) => {
  // State needed to trigger UX timer once initial product results have rendered
  const [resultsExist, setResultsExist] = useState(false);

  // Effect needed to set the above state
  useEffect(() => {
    const initialProductBlock = productsBlock[0] || [];
    if (initialProductBlock.length >= MINIMUM_RESULTS_TO_MEASURE && !resultsExist) {
      setResultsExist(true);
    }
  }, [productsBlock.length]);

  useEffect(() => {
    const productsFormatted = formatProductsData(products);
    if (products.length) {
      trackPageLoad({
        pageType: 'browse',
        pageName: 'browse',
        pageSection: 'browse',
        pageSubSection: 'browse',
        products: productsFormatted,
        // customEvents: ['prodView', 'event1'],
      });
    }
  }, [products.length]);

  return (
    <div className={className}>
      <Row>
        <Col className="fixed-bread-crumb-height" colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="bread-crumb">
            <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 2 }}>
          <div className="sidebar">
            <GlobalNavigationMenuDesktopL2
              navigationTree={navTree}
              activeCategoryIds={currentNavIds}
            />
            {/* UX timer */}
            <RenderPerf.Measure name={PAGE_NAVIGATION_VISIBLE} />
          </div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 10 }}>
          {plpTopPromos.length > 0 && (
            <PromoModules
              plpTopPromos={plpTopPromos}
              asPath={asPathVal}
              isLoggedIn={isLoggedIn}
              isPlcc={isPlcc}
            />
          )}
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="filter-section" id="filterWrapper">
              <ProductListingFiltersForm
                filtersMaps={filters}
                totalProductsCount={totalProductsCount}
                initialValues={initialValues}
                filtersLength={filtersLength}
                labels={labelsFilter}
                onSubmit={onSubmit}
                formValues={formValues}
                getProducts={getProducts}
                sortLabels={sortLabels}
                slpLabels={slpLabels}
                isFilterBy={isFilterBy}
                isLoadingMore={isLoadingMore}
              />
              {/* UX timer */}
              <RenderPerf.Measure name={CONTROLS_VISIBLE} />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }} className="show-count-section">
            <LoadedProductsCount
              totalProductsCount={totalProductsCount}
              showingItemsLabel={slpLabels}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductsGrid
              productsBlock={productsBlock}
              labels={labels}
              currency={currency}
              currencyAttributes={currencyAttributes}
              isLoadingMore={isLoadingMore}
              isSearchListing={isSearchListing}
              plpGridPromos={plpGridPromos}
              plpHorizontalPromos={plpHorizontalPromos}
              getProducts={getProducts}
              asPathVal={asPathVal}
              AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
              removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
              isLoggedIn={isLoggedIn}
              isPlcc={isPlcc}
              pageNameProp={pageNameProp}
              pageSectionProp={pageNameProp}
              pageSubSectionProp={pageNameProp}
              {...otherProps}
            />
            {/* UX timer */}
            {resultsExist && <RenderPerf.Measure name={RESULTS_VISIBLE} />}
            {/* Skeleton placeholder */}
            {isLoadingMore ? <PLPSkeleton col={20} /> : null}
          </Col>

          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ReadMore
              description={longDescription}
              labels={labels}
              className={`${className} seo-text`}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {categoryId ? <SpotlightContainer categoryId={categoryId} /> : null}
          </Col>
        </Col>
      </Row>
      <QuickViewModal onPickUpOpenClick={onPickUpOpenClick} />
    </div>
  );
};

ProductListView.propTypes = {
  className: PropTypes.string,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  /* eslint-disable */
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  categoryId: PropTypes.string,
  navTree: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  filters: PropTypes.shape({}),
  totalProductsCount: PropTypes.string,
  initialValues: PropTypes.shape({}),
  filtersLength: PropTypes.shape({}),
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  getProducts: PropTypes.func,
  onSubmit: PropTypes.func,
  formValues: PropTypes.shape({}).isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  isFilterBy: PropTypes.bool.isRequired,
  currencyAttributes: PropTypes.shape({}).isRequired,
  currency: PropTypes.string,
  isLoadingMore: PropTypes.bool,
  plpTopPromos: PropTypes.arrayOf(
    PropTypes.shape({
      // Only including the most important property
      moduleName: PropTypes.string,
    })
  ),
  asPathVal: PropTypes.string,
  isSearchListing: PropTypes.bool,
  plpGridPromos: PropTypes.shape({}),
  plpHorizontalPromos: PropTypes.shape({}),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
};

ProductListView.defaultProps = {
  className: '',
  productsBlock: [],
  longDescription: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  filters: {},
  totalProductsCount: '',
  initialValues: {},
  filtersLength: {},
  categoryId: '',
  labels: {},
  labelsFilter: {},
  sortLabels: [],
  slpLabels: {},
  isFilterBy: true,
  isLoadingMore: true,
  currency: 'USD',
  plpTopPromos: [],
  asPathVal: '',
  isSearchListing: false,
  plpGridPromos: {},
  plpHorizontalPromos: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
};

export default withStyles(ProductListView, ProductListingStyle);
