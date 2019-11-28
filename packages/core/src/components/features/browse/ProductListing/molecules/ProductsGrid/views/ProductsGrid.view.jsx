import React from 'react';
import { PropTypes } from 'prop-types';
import throttle from 'lodash/throttle';
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
    openAddNewList: PropTypes.func,
    activeWishListId: PropTypes.number,
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
    openAddNewList: () => {},
    activeWishListId: '',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      // TODO - fix this - This would be used when integrating BOSS/ BOPIS
      // eslint-disable-next-line
      bopisAutoSkipStep1: true,
    };
    this.isLoadingMoreState = false;
    this.captureContainerDivRef = ref => {
      this.containerDivRef = ref;
    };
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
  }

  componentDidMount() {
    this.addRemoveScrollListeners('scroll');
  }

  componentDidUpdate(prevProps) {
    const { isLoadingMore: isOldLoadingMore } = prevProps;
    const { isLoadingMore } = this.props;
    if (!isLoadingMore && isOldLoadingMore !== isLoadingMore) {
      setTimeout(() => {
        // This hack is required to let the newly feteched products get rendered and then enable the flag
        // else the call to fetch product is going in infinite loop - RWD-14751
        this.isLoadingMoreState = isLoadingMore;
      }, 10);
    }
  }

  componentWillUnmount() {
    if (isClient()) {
      this.addRemoveScrollListeners('scroll', false);
    }
  }

  addRemoveScrollListeners(eventName, isAddEvent = true) {
    const throttleTime = 100;
    const throttleParam = { trailing: true, leading: true };
    document[isAddEvent ? 'addEventListener' : 'removeEventListener'](
      eventName,
      throttle(this.handleLoadNextPage, throttleTime, throttleParam)
    );
  }

  handleLoadNextPage() {
    const { productsBlock, getMoreProducts } = this.props;
    if (!this.isLoadingMoreState && this.containerDivRef && productsBlock.length) {
      const offsetY =
        findElementPosition(this.containerDivRef).top + this.containerDivRef.offsetHeight;

      if (window.pageYOffset + window.innerHeight + NEXT_PAGE_LOAD_OFFSET > offsetY) {
        this.isLoadingMoreState = true;
        getMoreProducts();
      }
    }
  }

  render() {
    const {
      isGridView,
      productsBlock,
      className,
      labels,
      isFavoriteView,
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
      removeFavItem,
      openAddNewList,
      activeWishListId,
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
                        isFavoriteView={isFavoriteView}
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
                        removeFavItem={removeFavItem}
                        openAddNewList={openAddNewList}
                        activeWishListId={activeWishListId}
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
