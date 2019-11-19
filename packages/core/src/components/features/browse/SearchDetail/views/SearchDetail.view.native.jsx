import React from 'react';
import PropTypes from 'prop-types';
import { navigateToNestedRoute } from '@tcp/core/src/utils';
import { BodyCopy, Anchor } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles.native';
import {
  styles,
  PageContainer,
  Container,
  AnchorContainer,
  AnchorStyle,
} from '../SearchDetail.style.native';
import ProductListing from '../../ProductListing/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';

class SearchDetail extends React.PureComponent {
  listRef;

  setListRef = ref => {
    this.listRef = ref;
  };

  renderSearchTopSection = () => {
    const { slpLabels, navigation } = this.props;
    const searchedText = navigation && navigation.getParam('title');
    if (searchedText !== undefined) {
      return (
        <Container margins="0 12px 0 12px">
          <BodyCopy
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs14"
            text={slpLabels.lbl_searched_for}
          />
          <BodyCopy
            color="gray.900"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs16"
            text={`"${searchedText}"`}
          />
        </Container>
      );
    }
    return null;
  };

  didYouMeanText = (text, suggestion) => {
    return (
      <BodyCopy
        margin="12px 0 0 0"
        dataLocator="slp_store_name_value"
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="semibold"
        color={suggestion ? 'blue.800' : 'gray.900'}
        text={text}
      />
    );
  };

  goToSearchResultsPage = searchText => {
    const { navigation } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'SearchDetail', {
      title: searchText,
      isForceUpdate: true,
    });
  };

  renderDidYouMeanTextSection = searchResultSuggestionsArg => {
    const { slpLabels } = this.props;
    if (searchResultSuggestionsArg !== slpLabels.lbl_no_suggestion) {
      return (
        <Container margins="0 12px 0 12px">
          <AnchorContainer>
            {this.didYouMeanText(`${slpLabels.lbl_didYouMean} `, false)}
            <Anchor
              customStyle={AnchorStyle}
              onPress={() => this.goToSearchResultsPage(searchResultSuggestionsArg.toString())}
            >
              {this.didYouMeanText(`"${searchResultSuggestionsArg}"`, true)}
              {this.didYouMeanText('?', false)}
            </Anchor>
          </AnchorContainer>
        </Container>
      );
    }
    return null;
  };

  render() {
    const {
      searchedText,
      products,
      filters,
      totalProductsCount,
      filtersLength,
      labelsFilter,
      labels,
      isLoadingMore,
      lastLoadedPageNumber,
      submitProductListingFiltersForm,
      getProducts,
      navigation,
      sortLabels,
      onAddItemToFavorites,
      isLoggedIn,
      labelsLogin,
      searchResultSuggestions,
      slpLabels,
      ...otherProps
    } = this.props;

    const searchResultSuggestionsArg =
      searchResultSuggestions && searchResultSuggestions.length
        ? searchResultSuggestions.map(searchSuggestion => searchSuggestion.suggestion)
        : slpLabels.lbl_no_suggestion;
    return (
      <PageContainer>
        {searchResultSuggestionsArg !== slpLabels.lbl_no_suggestion
          ? this.renderDidYouMeanTextSection(searchResultSuggestionsArg)
          : this.renderSearchTopSection()}
        <ProductListing
          setListRef={this.setListRef}
          products={products}
          filters={filters}
          totalProductsCount={totalProductsCount}
          filtersLength={filtersLength}
          labelsFilter={labelsFilter}
          labels={labels}
          isLoadingMore={isLoadingMore}
          lastLoadedPageNumber={lastLoadedPageNumber}
          onSubmit={submitProductListingFiltersForm}
          getProducts={getProducts}
          navigation={navigation}
          onGoToPDPPage={this.onGoToPDPPage}
          sortLabels={sortLabels}
          onLoadMoreProducts={this.onLoadMoreProducts}
          onAddItemToFavorites={onAddItemToFavorites}
          isLoggedIn={isLoggedIn}
          labelsLogin={labelsLogin}
          isSearchListing
          {...otherProps}
        />
        <QuickViewModal navigation={navigation} />
      </PageContainer>
    );
  }
}

SearchDetail.propTypes = {
  searchedText: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filters: PropTypes.shape({}).isRequired,
  totalProductsCount: PropTypes.number.isRequired,
  filtersLength: PropTypes.shape({}).isRequired,
  labelsFilter: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}),
  isLoadingMore: PropTypes.bool.isRequired,
  lastLoadedPageNumber: PropTypes.number.isRequired,
  submitProductListingFiltersForm: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  onAddItemToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  labelsLogin: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  searchResultSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
};

SearchDetail.defaultProps = {
  searchedText: '',
  labels: {},
  slpLabels: {},
  sortLabels: {},
  onAddItemToFavorites: null,
  isLoggedIn: false,
  labelsLogin: {},
  searchResultSuggestions: [],
};

export default withStyles(SearchDetail, styles);
export { SearchDetail as SearchDetailVanilla };
