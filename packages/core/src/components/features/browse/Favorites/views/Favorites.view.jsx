import React from 'react';
import { PropTypes } from 'prop-types';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import ProductsGrid from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductsGrid/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';
import { Row, Col, BodyCopy, InputCheckBox } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import FavoritesViewStyle from '../styles/Favorites.style';
import { getNonEmptyFiltersList, getSortsList, getVisibleWishlistItems } from '../Favorites.util';
import NoFavoritesFound from '../molecules/NoFavoritesFound/views';
import SelectWishListDropdown from '../molecules/SelectWishListDropdown';
import CustomSelect from '../../../../common/molecules/CustomSelect/views';

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
    slpLabels,
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
    defaultWishList,
  } = props;

  const shareClickHandler = value => {
    console.log(value);
  };

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

  // filteredItemsList = []; DELETE this LINE

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

  const recommendationAttributes = {
    variations: 'moduleO',
    page: Constants.RECOMMENDATIONS_PAGES_MAPPING.HOMEPAGE,
    showLoyaltyPromotionMessage: false,
    headerAlignment: 'left',
  };

  const shareOptions = [
    {
      title: 'Email',
      value: 'Email',
      content: <span>Email</span>,
    },
    {
      title: labels.lbl_fav_copyLink,
      value: labels.lbl_fav_copyLink,
      content: <span>{labels.lbl_fav_copyLink}</span>,
    },
  ];

  const BrandFilterList = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          <BodyCopy fontWeight="extrabold" fontSize="fs16" className="favorite-title">
            {labels.lbl_fav_myFavorites}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="list-selection-row">
        <Col colSize={{ small: 6, medium: 6, large: 8 }}>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 5, large: 6 }} offsetLeft={{ medium: 3, large: 6 }}>
              <SelectWishListDropdown
                labels={labels}
                wishlistsSummaries={wishlistsSummaries}
                createNewWishList={createNewWishList}
                getActiveWishlist={getActiveWishlist}
                activeWishList={activeWishList}
                defaultWishList={defaultWishList}
              />
            </Col>
          </Row>
        </Col>
        <Col colSize={{ small: 6, medium: 2, large: 4 }}>
          <Row fullBleed>
            <Col
              colSize={{ small: 2, medium: 6, large: 4 }}
              offsetLeft={{ small: 4, medium: 2, large: 8 }}
            >
              <CustomSelect
                options={shareOptions}
                activeTitle={labels.lbl_fav_share}
                clickHandler={(e, value) => shareClickHandler(value)}
                customSelectClassName="social-share-fav-list"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row fullBleed>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ProductListingFiltersForm
            filtersMaps={{
              display_group_uFilter: filters,
              unbxdDisplayName: {
                display_group_uFilter: filters.length && filters[0].displayName,
              },
            }}
            totalProductsCount={!!activeWishList && activeWishList.items.length}
            initialValues={{}}
            filtersLength={{}}
            labels={labels}
            slpLabels={slpLabels}
            isFavoriteView
            favoriteSortingParams={getSortsList(labels)}
            onFilterSelection={onFilterSelection}
            onSortSelection={onSortSelection}
            defaultPlaceholder={getSortsList(labels)[0].displayName}
          />
        </Col>
      </Row>
      <Row className="brand-filter-section" fullBleed>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <BrandFilterList />
        </Col>
      </Row>
      <Row>
        <Col
          colSize={{ small: 6, medium: 8, large: 12 }}
          className="product-list"
          ignoreGutter={{ small: true, medium: true, large: true }}
        >
          {filteredItemsList.length === 0 ? <NoFavoritesFound labels={labels} /> : productsList}
        </Col>
        <Col
          hideCol={{ small: true, medium: true }}
          colSize={{ small: 6, medium: 8, large: 12 }}
          className="recommendation"
        >
          {/* Placeholder for you may also like */}
          <div>
            <Recommendations {...recommendationAttributes} />
          </div>
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
  // getActiveWishlist: PropTypes.func.isRequired,
  createNewWishList: PropTypes.func.isRequired,
  getActiveWishlist: PropTypes.func.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  slpLabels: PropTypes.shape({}),
  onQuickViewOpenClick: PropTypes.func.isRequired,
  selectedColorProductId: PropTypes.string,
  filteredId: PropTypes.string.isRequired,
  sortId: PropTypes.string.isRequired,
  onFilterSelection: PropTypes.func.isRequired,
  onSortSelection: PropTypes.func.isRequired,
  selectBrandType: PropTypes.string.isRequired,
  gymSelected: PropTypes.bool.isRequired,
  tcpSelected: PropTypes.bool.isRequired,
  defaultWishList: PropTypes.shape({}),
};

FavoritesView.defaultProps = {
  wishlistsSummaries: [],
  activeWishList: {},
  selectedColorProductId: '',
  slpLabels: {},
  defaultWishList: {},
};

export default withStyles(FavoritesView, FavoritesViewStyle);
