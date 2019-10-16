import React from 'react';
import { PropTypes } from 'prop-types';
import ProductsGrid from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductsGrid/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';
import { Row, Col, BodyCopy } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import FavoritesViewStyle from '../styles/Favorites.style';
import { getNonEmptyFiltersList } from '../Favorites.util';

const FavoritesView = props => {
  const {
    className,
    wishlistsSummaries,
    activeWishList,
    createNewWishListMoveItem,
    getActiveWishlist,
    createNewWishList,
    setLastDeletedItemId,
    labels,
    onQuickViewOpenClick,
    selectedColorProductId,
    // deleteWishList, @TODO will be used in the wish-list pop-up
  } = props;

  const favoriteListMap = wishlistsSummaries.map(favorite => {
    const { id, displayName, itemsCount, isDefault } = favorite;
    const updatedDisplayName = displayName || id;
    return (
      <>
        <button className="wish-list" onClick={() => getActiveWishlist(id)}>
          <span className="favorite-list-name">
            {updatedDisplayName}
            {isDefault && <i className="heart-icon-container">Default</i>}
          </span>
          <p>
            <span>
              {updatedDisplayName}
              {isDefault && <i className="heart-icon-container">Default</i>}
            </span>
            <span className="item-list">
              {itemsCount}
              item
              {itemsCount > 1 ? 's' : ''}
            </span>
          </p>
        </button>
      </>
    );
  });

  const productsList = !!activeWishList && (
    <>
      <ProductsGrid
        products={activeWishList.items}
        productsBlock={[activeWishList.items]}
        labels={labels}
        wishlistsSummaries={wishlistsSummaries}
        createNewWishList={createNewWishList}
        onQuickViewOpenClick={onQuickViewOpenClick}
        isFavoriteView
        removeFavItem={setLastDeletedItemId}
        createNewWishListMoveItem={createNewWishListMoveItem}
      />
      <QuickViewModal selectedColorProductId={selectedColorProductId} />
    </>
  );

  const filters = activeWishList ? getNonEmptyFiltersList(activeWishList.items, labels) : [];

  return (
    <>
      <Row className={className} fullBleed>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <BodyCopy fontWeight="extrabold" fontSize="fs16" className="favorite-title">
            MY FAVORITES
          </BodyCopy>
        </Col>
        <Col
          colSize={{ small: 6, medium: 8, large: 6 }}
          offsetLeft={{ small: 0, medium: 0, large: 3 }}
          className="favorite-list"
        >
          {favoriteListMap}
          <button onClick={createNewWishList}>Create New List</button>
        </Col>
        <Col
          colSize={{ small: 6, medium: 8, large: 2 }}
          offsetLeft={{ small: 0, medium: 0, large: 1 }}
          className="share-list"
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <span>Dropdown end</span>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ProductListingFiltersForm
            filtersMaps={{
              age_group_uFilter: filters,
              // TCPColor_uFilter: [],
              // categoryPath2_uFilter: [],
              // gender_uFilter: [],
              // l1category: '',
              unbxdDisplayName: {
                // TCPColor_uFilter: "Color",
                age_group_uFilter: "All",
                // categoryPath2_uFilter: "Category",
                // gender_uFilter: "Gender",
                // unbxd_price_range_uFilter: "Price",
                // v_tcpsize_uFilter: "Size",
              },
              // unbxd_price_range_uFilter: [],
              // v_tcpsize_uFilter: [],
            }}
            totalProductsCount={!!activeWishList && activeWishList.items.length}
            initialValues={null}
            filtersLength={null}
            labels={labels}
            isFavoriteView
            // onSubmit={onSubmit}
            // formValues={formValues}
            // sortLabels={sortLabels}
            // getProducts={getProducts}
            // slpLabels={slpLabels}
          />
        </Col>
      </Row>
      <Row>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          className="product-list"
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          {productsList}
        </Col>
        <Col
          hideCol={{ small: true, medium: true }}
          colSize={{ small: 6, medium: 8, large: 12 }}
          className="recommendation"
        >
          <div>You may also like</div>
        </Col>
      </Row>
    </>
  );
};

FavoritesView.propTypes = {
  className: PropTypes.string,
  wishlistsSummaries: PropTypes.arrayOf({}),
  activeWishList: PropTypes.shape({}),
  createNewWishListMoveItem: PropTypes.func.isRequired,
  // deleteWishList: PropTypes.func.isRequired, @TODO will be used in the wish-list pop-up
  getActiveWishlist: PropTypes.func.isRequired,
  createNewWishList: PropTypes.func.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  selectedColorProductId: PropTypes.string,
};

FavoritesView.defaultProps = {
  className: '',
  wishlistsSummaries: [],
  activeWishList: {},
  selectedColorProductId: '',
};

export default withStyles(FavoritesView, FavoritesViewStyle);
