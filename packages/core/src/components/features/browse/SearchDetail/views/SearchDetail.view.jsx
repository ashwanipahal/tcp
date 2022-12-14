import React from 'react';
import { PropTypes } from 'prop-types';
import { getSiteId } from '@tcp/core/src/utils/utils';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf/RenderPerf';
import { CONTROLS_VISIBLE, RESULTS_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import ProductsGrid from '../../ProductListing/molecules/ProductsGrid/views';
import { Anchor, Row, Col, PLPSkeleton } from '../../../../common/atoms';
import LoadedProductsCount from '../../ProductListing/molecules/LoadedProductsCount/views';
import errorBoundary from '../../../../common/hoc/withErrorBoundary';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { isFiltersAvailable } from '../../ProductListing/container/ProductListing.selectors';
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';
import { updateLocalStorageData } from '../../../../common/molecules/SearchBar/userRecentStore';
import { routerPush } from '../../../../../utils/index';

const setDataInLocalStorage = (searchText, url) => {
  updateLocalStorageData(searchText, url);
};

const redirectToSuggestedUrl = (searchText, url) => {
  if (searchText) {
    setDataInLocalStorage(searchText, url);
    if (url) {
      routerPush(`/c?cid=${url.split('/c/')[1]}`, `${url}`, { shallow: false });
    } else {
      routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
    }
  }
};

class SearchListingView extends React.Component {
  componentDidUpdate(prevProps) {
    const { products, trackPageLoad, searchType, searchedText } = this.props;
    const productsFormatted = this.formatProductsData(products);
    if (prevProps.products !== products && productsFormatted.length && searchType && searchedText) {
      trackPageLoad({
        products: productsFormatted,
        pageSearchType: searchType,
        pageSearchText: searchedText,
        pageType: 'search',
        pageName: 'search:results',
        pageSection: 'search',
        pageSubSection: 'search',
        customEvents: ['event91', 'event92', 'event80', 'event20'],
        internalCampaignId: 'non-internal campaign',
        listingCount: products.length,
        pageNavigationText: 'non-browse',
        listingSortList: 'sort=recommended',
      });
    }
  }

  formatProductsData = products => {
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
        listPrice,
        extPrice: priceRange.lowOfferPrice,
        position: index + 1,
        type: categoryName,
      };
    });
  };

  render() {
    const {
      className,
      products,
      productsBlock,
      labels,
      totalProductsCount,
      searchedText,
      slpLabels,
      sortLabels,
      filters,
      filtersLength,
      formValues,
      getProducts,
      initialValues,
      labelsFilter,
      onSubmit,
      currency,
      currencyAttributes,
      onAddItemToFavorites,
      isLoggedIn,
      isLoadingMore,
      isSearchListing,
      searchResultSuggestions,
      asPathVal,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      ...otherProps
    } = this.props;

    const searchResultSuggestionsArg =
      searchResultSuggestions && searchResultSuggestions.length
        ? searchResultSuggestions.map(searchSuggestion => searchSuggestion.suggestion)
        : slpLabels.lbl_no_suggestion;
    return (
      <div className={className}>
        {searchResultSuggestionsArg !== slpLabels.lbl_no_suggestion && (
          <Row className="empty-search-result-suggestion">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy
                fontSize={['fs22', 'fs24', 'fs32']}
                component="div"
                fontFamily="secondary"
                fontWeight="semibold"
                textAlign="center"
              >
                {`${slpLabels.lbl_didYouMean} "`}
                <Anchor
                  noLink
                  className="suggestion-label"
                  to={`/${getSiteId()}/search/${searchResultSuggestionsArg}`}
                  onClick={e => {
                    e.preventDefault();
                    redirectToSuggestedUrl(`${searchResultSuggestionsArg}`);
                  }}
                >
                  {`${searchResultSuggestionsArg}`}
                </Anchor>
                {`"?`}
              </BodyCopy>
            </Col>
          </Row>
        )}
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {searchedText && (
              <BodyCopy
                className={`${className} searched-text-wrapper`}
                component="div"
                fontFamily="secondary"
                fontSize="fs14"
                fontWeight="regular"
              >
                {slpLabels.lbl_searched_for}
                <BodyCopy
                  fontFamily="secondary"
                  className="searched-label"
                  fontSize={['fs16', 'fs16', 'fs14']}
                  fontWeight="extrabold"
                >
                  {`"${searchedText.split('?')[0]}"`}
                </BodyCopy>
              </BodyCopy>
            )}
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductListingFiltersForm
              isFilterBy={isFiltersAvailable(filters)}
              filtersMaps={filters}
              totalProductsCount={totalProductsCount}
              initialValues={initialValues}
              filtersLength={filtersLength}
              labels={labelsFilter}
              onSubmit={onSubmit}
              formValues={formValues}
              sortLabels={sortLabels}
              getProducts={getProducts}
              slpLabels={slpLabels}
              isLoadingMore={isLoadingMore}
            />
            {/* UX timer */}
            <RenderPerf.Measure name={CONTROLS_VISIBLE} />
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <LoadedProductsCount
              className="show-items-count-section"
              totalProductsCount={totalProductsCount}
              showingItemsLabel={slpLabels}
            />
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {productsBlock.length ? (
              <>
                <ProductsGrid
                  className={className}
                  productsBlock={productsBlock}
                  products={products}
                  labels={labels}
                  productTileVariation="search-product-tile"
                  currencyAttributes={currencyAttributes}
                  currency={currency}
                  onAddItemToFavorites={onAddItemToFavorites}
                  isLoggedIn={isLoggedIn}
                  isLoadingMore={isLoadingMore}
                  isSearchListing={isSearchListing}
                  getProducts={getProducts}
                  asPathVal={asPathVal}
                  AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
                  removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
                  {...otherProps}
                />
                {/* UX timer */}
                <RenderPerf.Measure name={RESULTS_VISIBLE} />
              </>
            ) : null}
            {isLoadingMore ? <PLPSkeleton col={20} /> : null}
          </Col>
        </Row>
      </div>
    );
  }
}

SearchListingView.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.shape({}),
  filtersLength: PropTypes.shape({}),
  formValues: PropTypes.shape({
    sort: PropTypes.string.isRequired,
  }).isRequired,
  getProducts: PropTypes.func.isRequired,
  getMoreProducts: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  onSubmit: PropTypes.func.isRequired,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  totalProductsCount: PropTypes.number,
  searchedText: PropTypes.string,
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  currencyAttributes: PropTypes.shape({}),
  currency: PropTypes.string,
  onAddItemToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  isLoadingMore: PropTypes.bool,
  isSearchListing: PropTypes.bool,
  asPathVal: PropTypes.string,
  searchResultSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      suggestion: PropTypes.string.isRequired,
    })
  ),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  trackPageLoad: PropTypes.func,
  pageNameProp: PropTypes.string,
  pageSectionProp: PropTypes.string,
  pageSubSectionProp: PropTypes.string,
  searchType: PropTypes.string,
};

SearchListingView.defaultProps = {
  className: '',
  filters: {},
  filtersLength: {},
  initialValues: {},
  labelsFilter: {},
  products: [],
  productsBlock: [],
  labels: {},
  totalProductsCount: 0,
  searchedText: '',
  slpLabels: {},
  sortLabels: {},
  currencyAttributes: {
    exchangevalue: 1,
  },
  currency: 'USD',
  isLoggedIn: false,
  isLoadingMore: false,
  isSearchListing: true,
  asPathVal: '',
  searchResultSuggestions: [],
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  trackPageLoad: () => {},
  pageNameProp: '',
  pageSectionProp: '',
  pageSubSectionProp: '',
  searchType: 'keyword',
};

export default withStyles(errorBoundary(SearchListingView), SearchListingStyle);
export { SearchListingView as SearchListingViewVanilla };
