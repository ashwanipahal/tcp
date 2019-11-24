import React from 'react';
import { PropTypes } from 'prop-types';
import ProductList from '../../ProductList/views';
import { isClient } from '../../../../../../../utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductsGridStyles from '../ProductsGrid.style';

// hardcoded value to load products before the end of the products list (400 is about the height of 1 row)
const NEXT_PAGE_LOAD_OFFSET = 400;

function findElementPosition(objArg) {
  let obj = objArg;
  let curleft = 0;
  let curtop = 0;

  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
    obj = obj.offsetParent;
  } while (obj);

  return {
    left: curleft,
    top: curtop,
  };
}

class ProductsGrid extends React.Component {
  static propTypes = {
    isLoadingMore: PropTypes.bool,
    productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
    getMoreProducts: PropTypes.func.isRequired,
    onPickUpOpenClick: PropTypes.func,
    onQuickViewOpenClick: PropTypes.func,
    isGridView: PropTypes.bool,
    className: PropTypes.string,
    labels: PropTypes.string,
    productTileVariation: PropTypes.string,
    currency: PropTypes.string,
    currencyAttributes: PropTypes.shape({}).isRequired,
    onAddItemToFavorites: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    isSearchListing: PropTypes.bool,
    plpGridPromos: PropTypes.shape({}),
    plpHorizontalPromos: PropTypes.shape({}),
    // showQuickViewForProductId: PropTypes.string,
    getProducts: PropTypes.func,
    asPathVal: PropTypes.string,
    AddToFavoriteErrorMsg: PropTypes.string,
    removeAddToFavoritesErrorMsg: PropTypes.func,
  };

  static defaultProps = {
    isLoadingMore: false,
    productsBlock: [],
    onPickUpOpenClick: null,
    onQuickViewOpenClick: null,
    isGridView: false,
    className: '',
    labels: '',
    productTileVariation: '',
    currency: 'USD',
    isLoggedIn: false,
    isSearchListing: false,
    plpGridPromos: {},
    plpHorizontalPromos: {},
    getProducts: () => {},
    asPathVal: '',
    AddToFavoriteErrorMsg: '',
    removeAddToFavoritesErrorMsg: () => {},
  };

  constructor(props, context) {
    super(props, context);

    this.captureContainerDivRef = ref => {
      this.containerDivRef = ref;
    };
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
    this.loadEnable = false;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleLoadNextPage, true);
    document.addEventListener('mousewheel', this.handleLoadNextPage, true);
    document.addEventListener('DOMMouseScroll', this.handleLoadNextPage, true);
    this.loadEnable = false;
  }

  componentDidUpdate() {
    // TODO - fix this when user comes back from PDP, to select the same item, this is required
  }

  componentWillUnmount() {
    if (isClient()) {
      document.removeEventListener('scroll', this.handleLoadNextPage, true);
      document.removeEventListener('mousewheel', this.handleLoadNextPage, true);
      document.removeEventListener('DOMMouseScroll', this.handleLoadNextPage, true);
    }
  }

  handleLoadNextPage() {
    const { isLoadingMore, productsBlock, getMoreProducts } = this.props;
    const offsetY =
      findElementPosition(this.containerDivRef).top + this.containerDivRef.offsetHeight;

    if (this.loadEnable && !isLoadingMore && this.containerDivRef && productsBlock.length) {
      if (window.pageYOffset + window.innerHeight + NEXT_PAGE_LOAD_OFFSET > offsetY) {
        this.loadEnable = false;
        getMoreProducts();
      }
    } else if (window.pageYOffset + window.innerHeight + NEXT_PAGE_LOAD_OFFSET < offsetY) {
      this.loadEnable = true;
    }
  }

  render() {
    const {
      isGridView,
      productsBlock,
      className,
      labels,
      isLoadingMore,
      onPickUpOpenClick,
      onQuickViewOpenClick,
      productTileVariation,
      currency,
      currencyAttributes,
      onAddItemToFavorites,
      isLoggedIn,
      isSearchListing,
      plpGridPromos,
      plpHorizontalPromos,
      // showQuickViewForProductId,
      getProducts,
      asPathVal,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      ...otherProps
    } = this.props;

    const containerClassName = `${className} main-section-container `;

    return (
      <main className={containerClassName}>
        <section
          ref={this.captureContainerDivRef}
          className={`products-grid-container ${isGridView ? 'product-grid-view-container' : ''}`}
        >
          <div className="product-grid-content">
            <div className="products-listing-grid">
              <div className="product-grid-block-container">
                {!!productsBlock.length &&
                  productsBlock.map((block, index) => {
                    const nextBlock =
                      index < productsBlock.length - 1 ? productsBlock[index + 1] : false;
                    const isPerfectBlock = nextBlock
                      ? block.length === 21 && typeof nextBlock[0] === 'string'
                      : false;
                    return (
                      <ProductList
                        isPerfectBlock={isPerfectBlock}
                        productsBlock={block}
                        onPickUpOpenClick={onPickUpOpenClick}
                        className={`${className} product-list`}
                        labels={labels}
                        onQuickViewOpenClick={onQuickViewOpenClick}
                        productTileVariation={productTileVariation}
                        currency={currency}
                        currencyAttributes={currencyAttributes}
                        isLoggedIn={isLoggedIn}
                        onAddItemToFavorites={onAddItemToFavorites}
                        // showQuickViewForProductId={showQuickViewForProductId}
                        isSearchListing={isSearchListing}
                        plpGridPromos={plpGridPromos}
                        plpHorizontalPromos={plpHorizontalPromos}
                        getProducts={getProducts}
                        asPathVal={asPathVal}
                        AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
                        removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
                        {...otherProps}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default withStyles(ProductsGrid, ProductsGridStyles);
