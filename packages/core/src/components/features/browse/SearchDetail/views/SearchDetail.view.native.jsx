import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../common/atoms/index.native';
import withStyles from '../../../../common/hoc/withStyles.native';
import { styles, PageContainer, Container } from '../SearchDetail.style.native';
import ProductListing from '../../ProductListing/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import AddedToBagContainer from '../../../CnC/AddedToBag';

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
      ...otherProps
    } = this.props;

    return (
      <PageContainer>
        {this.renderSearchTopSection()}
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
          {...otherProps}
        />
        <QuickViewModal />
        <AddedToBagContainer />
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
};

SearchDetail.defaultProps = {
  searchedText: '',
  labels: {},
  slpLabels: {},
  sortLabels: {},
  onAddItemToFavorites: null,
  isLoggedIn: false,
};

export default withStyles(SearchDetail, styles);
export { SearchDetail as SearchDetailVanilla };
