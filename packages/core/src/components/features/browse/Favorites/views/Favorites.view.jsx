import React from 'react';
import { PropTypes } from 'prop-types';
import ProductsGrid from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductsGrid/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';
import { Row, Col, BodyCopy, InputCheckBox } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import FavoritesViewStyle from '../styles/Favorites.style';
import { getNonEmptyFiltersList, getSortsList, getVisibleWishlistItems } from '../Favorites.util';

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
    filteredId,
    sortId,
    onFilterSelection,
    onSortSelection,
    selectBrandType,
    gymSelected,
    tcpSelected,
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

  const filters = activeWishList ? getNonEmptyFiltersList(activeWishList.items, labels) : [];
  let filteredItemsList =
    !!activeWishList && getVisibleWishlistItems(activeWishList.items, filteredId, sortId);

  if (filteredItemsList) {
    if (gymSelected) {
      filteredItemsList = filteredItemsList.filter(item => !item.itemInfo.isTCP);
    } else if (tcpSelected) {
      filteredItemsList = filteredItemsList.filter(item => item.itemInfo.isTCP);
    }
  }

  const productsList = !!filteredItemsList && (
    <>
      <ProductsGrid
        products={filteredItemsList}
        productsBlock={[filteredItemsList]}
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

  const brandOptions = [
    {
      name: 'gymboreeOption',
      dataLocator: 'gymboree-option',
      brandLabel: labels.lbl_fav_gym,
      checked: gymSelected,
    },
    {
      name: 'tcpOption',
      dataLocator: 'tcp-option',
      brandLabel: labels.lbl_fav_tcp,
      checked: tcpSelected,
    },
  ];

  return (
    <div className={className}>
      <Row fullBleed>
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
          {/* Placeholder for dropdown */}
          <span>Dropdown end</span>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ProductListingFiltersForm
            filtersMaps={{
              display_group_uFilter: filters,
              unbxdDisplayName: {
                display_group_uFilter: filters.length && filters[0].displayName,
              },
            }}
            totalProductsCount={!!activeWishList && activeWishList.items.length}
            initialValues={null}
            filtersLength={null}
            labels={labels}
            isFavoriteView
            favoriteSortingParams={getSortsList(labels)}
            onFilterSelection={onFilterSelection}
            onSortSelection={onSortSelection}
            defaultPlaceholder={getSortsList(labels)[0].displayName}
          />
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <div>
            <ul className="brand-option-list">
              <li className="brand-options is-label">{labels.lbl_fav_brand}</li>
              {brandOptions.map(({ name, dataLocator, brandLabel, checked }) => (
                <li className="brand-options" key={name}>
                  <InputCheckBox
                    execOnChangeByDefault={false}
                    dataLocator={dataLocator}
                    input={{ value: checked, onChange: selectBrandType, name }}
                  >
                    {brandLabel}
                  </InputCheckBox>
                </li>
              ))}
            </ul>
          </div>
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
          {/* Placeholder for you may also like */}
          <div>You may also like</div>
        </Col>
      </Row>
    </div>
  );
};

FavoritesView.propTypes = {
  className: PropTypes.string.isRequired,
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
  filteredId: PropTypes.string.isRequired,
  sortId: PropTypes.string.isRequired,
  onFilterSelection: PropTypes.func.isRequired,
  onSortSelection: PropTypes.func.isRequired,
  selectBrandType: PropTypes.string.isRequired,
  gymSelected: PropTypes.bool.isRequired,
  tcpSelected: PropTypes.bool.isRequired,
};

FavoritesView.defaultProps = {
  wishlistsSummaries: [],
  activeWishList: {},
  selectedColorProductId: '',
};

export default withStyles(FavoritesView, FavoritesViewStyle);
