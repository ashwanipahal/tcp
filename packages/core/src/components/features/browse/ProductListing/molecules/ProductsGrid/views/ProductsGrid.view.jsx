/* eslint-disable */
import React from 'react';
import { PropTypes } from 'prop-types';
import ProductList from '../../ProductList/views';
import { isClient } from '../../../../../../../utils';

// hardcoded value to load products before the end of the products list (400 is about the height of 1 row)
const NEXT_PAGE_LOAD_OFFSET = 400;

function findElementPosition(obj) {
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
  static defaultProps = {
    isLoadingMore: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      bopisAutoSkipStep1: true,
    };

    // initLineClamp();

    this.captureContainerDivRef = ref => {
      this.containerDivRef = ref;
    };
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
  }

  componentWillMount() {
    if (isClient()) {
      document.addEventListener('scroll', this.handleLoadNextPage, true);
      document.addEventListener('mousewheel', this.handleLoadNextPage, true);
      document.addEventListener('DOMMouseScroll', this.handleLoadNextPage, true);
    }
  }

  componentDidUpdate() {
    if (isClient()) {
      const scrollEvent = parseInt(sessionStorage.getItem('SCROLL_EVENT'), 10) || 0;
      if (scrollEvent) {
        const scrollPoint = sessionStorage.getItem('SCROLL_POINT') || 0;
        if (scrollPoint > 0) {
          // do it only when LOADED_PRODUCT_COUNT == 0
          if (sessionStorage.getItem('RESET_SCROLL_CONDITIONS') > 0) {
            sessionStorage.setItem('SCROLL_POINT', 0);
            sessionStorage.setItem('LOADED_PRODUCT_COUNT', 20);
            sessionStorage.setItem('RESET_SCROLL_CONDITIONS', 0);
          }

          if (window.location.pathname === sessionStorage.getItem('LAST_PAGE_PATH')) {
            window.scrollTo({
              top: scrollPoint,
              behavior: 'instant',
            });
            sessionStorage.setItem('SCROLL_POINT', 0);
          }
        }
        sessionStorage.setItem('SCROLL_EVENT', 0);
      }
    }
  }

  componentWillUnmount() {
    if (isClient()) {
      document.removeEventListener('scroll', this.handleLoadNextPage, true);
      document.removeEventListener('mousewheel', this.handleLoadNextPage, true);
      document.removeEventListener('DOMMouseScroll', this.handleLoadNextPage, true);
    }
  }

  pickUpIconClick = (...args) => {
    this.setState(
      {
        bopisAutoSkipStep1: false,
      },
      () => {
        const { onPickUpOpenClick } = this.props;
        if (onPickUpOpenClick) {
          onPickUpOpenClick(...args);
        }
      }
    );
  };

  quickViewOpenClick = (...args) => {
    this.setState(
      {
        bopisAutoSkipStep1: true,
      },
      () => {
        const { onQuickViewOpenClick } = this.props;
        if (onQuickViewOpenClick) {
          onQuickViewOpenClick(...args);
        }
      }
    );
  };

  handleLoadNextPage() {
    if (!this.props.isLoadingMore && this.containerDivRef && this.props.productsBlock.length) {
      const offsetY =
        findElementPosition(this.containerDivRef).top + this.containerDivRef.offsetHeight;

      if (window.pageYOffset + window.innerHeight + NEXT_PAGE_LOAD_OFFSET > offsetY) {
        this.props.getMoreProducts();

        // this.props.onLoadMoreProducts().then(() => {
        //   this.setState({
        //     isLoadingMore: false
        //   });
        // }).catch(() => this.setState({
        //   isLoadingMore: false
        // }));
      }
    }
  }

  render() {
    const {
      plpOnDepartmentPage,
      isMobile,
      isShowEspot,
      isShowFilters,
      isHideSpotlights,
      categoryId,
      isShowVideoOnPlp,
      onQuickBopisOpenClick,
      currencySymbol,
      loadedProductCount,
      currencyExchange,
      slotsList,
      onAddItemToFavorites,
      outfits,
      showQuickViewForProductId,
      isGuest,
      isPlcc,
      isShowPickupModal,
      isPLPShowPickupCTA,
      isNewMobileFilterForm,
      isGridView,
      priceCurrency,
      unbxdBanners,
      unbxdId,
      onColorChange,
      isBopisEnabled,
      description,
      uniqueGridBlockId,
      isBopisEnabledForClearance,
      isPlpTwoColumnMobileActive,
      isL3CategoryListingViewEnabled,
      isOnModelImgDisplay,
      onProductCardHover,
      isCanada,
      isBossClearanceProductEnabled,
      isBossEnabled,
      isInternationalShipping,
      isProductsGridCTAView,
      isShowRecommendationOnPlp,
      categoryNameTop,
      isShowPLPId,
      isMatchingFamily,
      killSwitchKeepAliveProduct,
      isShowOldDesignPlp,
      isHideBundleProduct,
      isSearch,
      productPageSize,
      className,
      productsBlock,
      currentNavIds,
      navTree,
      breadCrumbs,
      longDescription,
      labels,
      isLoadingMore,
      ...otherProps
    } = this.props;

    const { bopisAutoSkipStep1 } = this.state;
    // const containerClassName = cssClassName('main-section-container ', ' grid-container');
    const containerClassName = 'main-section-container ';
    const isPLPredesign = isMobile || !isShowOldDesignPlp;
    return (
      <main className={containerClassName}>
        <section
          ref={this.captureContainerDivRef}
          className={`products-grid-container ${isGridView ? 'product-grid-view-container' : ''}`}
        >
          {/* DT-33014: AB Test for Mobile Filters */}
          {/* {isShowFilters && !isNewMobileFilterForm && <PlpFilterAndSortFormContainer />}
          {isShowFilters && isNewMobileFilterForm && <NewPlpFilterAndSortFormContainer />} */}

          {/* {isL3CategoryListingViewEnabled && <PlpL3CategoryContainer />} */}

          <div className="product-grid-content">
            {/* {!plpOnDepartmentPage && isShowEspot && !isInternationalShipping &&
              (slotsList
                ? <ContentSlotList isGuest={isGuest} isPlcc={isPlcc} contentSlots={slotsList} unbxdBanners={unbxdBanners}/>
                : (unbxdBanners ? <ContentSlot contentSlotName="search_result_with_result" className="search-result-slot" unbxdBanners={unbxdBanners.map(el => el.bannerHtml)}/> : null))
            } */}
            {/* <div className={cssClassName('products-listing-grid ', { 'products-listing-grid-without-white-space ': !isMobile }, { 'products-listing-grid-v1': isPLPredesign })}> */}
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
                        className={`${className} product-list`}
                        labels={labels}
                        {...otherProps}
                      />
                    );
                  })}

                {/* {!!outfits.length && outfits.map(item => (
                <div className="outfit-container item-container" key={item.generalProductId}>
                  <ProductMainImage pdpUrl={item.pdpUrl} imageUrl={item.imagePath} isMobile={isMobile} />
                  <CoverShadowLink isMobile={isMobile} redirectLink={item.pdpUrl}>
                    <span>SHOP THE LOOK &gt;</span>
                  </CoverShadowLink>
                </div>
              ))} */}
              </div>
              {/* {isLoadingMore && <Spinner className="loading-more-product">Loading more...</Spinner>} */}
            </div>
          </div>
        </section>

        {/* {isShowRecommendationOnPlp &&
          <RecomendationsResponsiveContainer
            wrapperClass="recently-viewed-plp"
            portalValue="recently-viewed-products"
            hideTitle={isMobile}
            isAccordion={isMobile}
          />}

        {description && <ReadMore description={description} />}
        {!isHideSpotlights && <SpotlightContainer categoryId={categoryId} />}

        {isShowPickupModal && <PickUpStoreModalContainer isShowAddItemSuccessNotification autoSkipStep1={bopisAutoSkipStep1} />} */}
      </main>
    );
  }
}

export default ProductsGrid;
