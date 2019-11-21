import React from 'react';
import { PropTypes } from 'prop-types';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import ProductsGrid from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductsGrid/views';
import { getLabelValue } from '@tcp/core/src/utils';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';
import { Row, Col, BodyCopy, InputCheckBox } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import FavoritesViewStyle from '../styles/Favorites.style';
import { getNonEmptyFiltersList, getSortsList, getVisibleWishlistItems } from '../Favorites.util';
import SelectWishListDropdown from '../molecules/SelectWishListDropdown/SelectWishListDropdown';
import NoFavoritesFound from '../molecules/NoFavoritesFound/views';
import CustomSelect from '../../../../common/molecules/CustomSelect/views';
import AddList from '../molecules/AddList/views';
import EditList from '../molecules/EditList/views';
import ShareList from '../molecules/ShareList/views';
import CopyLink from '../molecules/CopyLink/views';
import ModalWrapper from '../molecules/ModalWrapper';

class FavoritesView extends React.PureComponent {
  currentPopupName;

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  getSharableLink = () => {
    const { activeWishList, wishlistsSummaries } = this.props;
    const activeWishListId = activeWishList && activeWishList.id;
    const currentWishList =
      wishlistsSummaries &&
      wishlistsSummaries.length > 0 &&
      wishlistsSummaries.filter(wishlist => {
        return wishlist.id === activeWishListId;
      });
    return currentWishList[0].shareableLink;
  };

  handleFacebookShare = () => {
    const shareUrl = this.getSharableLink();
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    window.open(url);
  };

  shareClickHandler = value => {
    if (value === 'Email') {
      this.handleShareList();
    } else if (value === 'Copy Link') {
      this.handleCopyLink();
    } else {
      this.handleFacebookShare();
    }
  };

  renderProductList = () => {
    const {
      wishlistsSummaries,
      activeWishList,
      createNewWishListMoveItem,
      createNewWishList,
      setLastDeletedItemId,
      labels,
      onQuickViewOpenClick,
      selectedColorProductId,
      filteredId,
      sortId,
      gymSelected,
      tcpSelected,
      isKeepAliveEnabled,
      outOfStockLabels,
    } = this.props;

    let filteredItemsList =
      !!activeWishList && getVisibleWishlistItems(activeWishList.items, filteredId, sortId);
    if (filteredItemsList) {
      if (gymSelected) {
        filteredItemsList = filteredItemsList.filter(item => !item.itemInfo.isTCP);
      } else if (tcpSelected) {
        filteredItemsList = filteredItemsList.filter(item => item.itemInfo.isTCP);
      }
    }

    return (
      !!filteredItemsList && (
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
            isKeepAliveEnabled={isKeepAliveEnabled}
            outOfStockLabels={outOfStockLabels}
          />
          <QuickViewModal selectedColorProductId={selectedColorProductId} />
        </>
      )
    );
  };

  brandFilterList = () => {
    const { labels, selectBrandType, gymSelected, tcpSelected } = this.props;
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

  handleAddList = () => {
    this.currentPopupName = 'addList';
    this.setState({
      isOpenModal: true,
    });
  };

  handleEditList = () => {
    this.currentPopupName = 'editList';
    this.setState({
      isOpenModal: true,
    });
  };

  handleShareList = () => {
    this.currentPopupName = 'shareList';
    this.setState({
      isOpenModal: true,
    });
  };

  handleCopyLink = () => {
    this.currentPopupName = 'copyLink';
    this.setState({
      isOpenModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  getCurrentPopUpHeading = () => {
    const { labels } = this.props;
    if (this.currentPopupName === 'addList') {
      return getLabelValue(labels, 'lbl_fav_create_new_list_heading');
    }
    if (this.currentPopupName === 'shareList' || this.currentPopupName === 'copyLink') {
      return getLabelValue(labels, 'lbl_fav_share_list_heading');
    }

    return '';
  };

  onAddNewListHandler = data => {
    console.log('onAddNewListHandler:', data);
  };

  onEditListHandler = data => {
    console.log('onEditListHandler:', data);
  };

  renderModalWrapper = () => {
    const { labels } = this.props;
    const { isOpenModal } = this.state;
    const modalHeight =
      this.currentPopupName === 'shareList'
        ? { minHeight: '850px', height: '850px', maxHeight: '850px' }
        : { minHeight: '459px', height: '459px', maxHeight: '459px' };
    return (
      <ModalWrapper
        labels={labels}
        heading={this.getCurrentPopUpHeading()}
        modalMargins="0 14px 0 14px"
        isOpenModal={isOpenModal}
        onCloseModal={this.onCloseModal}
        widthConfig={{ small: '375px', medium: '432px', large: '432px' }}
        heightConfig={modalHeight}
      >
        {this.getCurrentPopUp()}
      </ModalWrapper>
    );
  };

  getCurrentPopUp = () => {
    const { labels } = this.props;
    if (this.currentPopupName === 'addList') {
      return (
        <AddList
          labels={labels}
          onHandleSubmit={this.onAddNewListHandler}
          onCloseModal={this.onCloseModal}
        />
      );
    }
    if (this.currentPopupName === 'editList') {
      return (
        <EditList
          labels={labels}
          onHandleSubmit={this.onEditListHandler}
          onCloseModal={this.onCloseModal}
        />
      );
    }
    if (this.currentPopupName === 'shareList') {
      return (
        <ShareList
          labels={labels}
          onHandleSubmit={this.onEditListHandler}
          onCloseModal={this.onCloseModal}
        />
      );
    }
    if (this.currentPopupName === 'copyLink') {
      return (
        <CopyLink
          labels={labels}
          onHandleSubmit={this.onEditListHandler}
          onCloseModal={this.onCloseModal}
          shareableLink={this.getSharableLink()}
        />
      );
    }
    return null;
  };

  render() {
    const {
      className,
      wishlistsSummaries,
      activeWishList,
      getActiveWishlist,
      createNewWishList,
      labels,
      slpLabels,
      onFilterSelection,
      onSortSelection,
      defaultWishList,
      filteredId,
      sortId,
      gymSelected,
      tcpSelected,
    } = this.props;

    const shareOptions = [
      {
        title: labels.lbl_fav_facebook,
        value: labels.lbl_fav_facebook,
        content: <span>{labels.lbl_fav_facebook}</span>,
      },
      {
        title: labels.lbl_fav_email,
        value: labels.lbl_fav_email,
        content: <span>{labels.lbl_fav_email}</span>,
      },
      {
        title: labels.lbl_fav_copyLink,
        value: labels.lbl_fav_copyLink,
        content: <span>{labels.lbl_fav_copyLink}</span>,
      },
    ];
    const filters = activeWishList ? getNonEmptyFiltersList(activeWishList.items, labels) : [];

    const recommendationAttributes = {
      variations: 'moduleO',
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.HOMEPAGE,
      showLoyaltyPromotionMessage: false,
      headerAlignment: 'left',
    };

    let filteredItemsList =
      !!activeWishList && getVisibleWishlistItems(activeWishList.items, filteredId, sortId);
    if (filteredItemsList) {
      if (gymSelected) {
        filteredItemsList = filteredItemsList.filter(item => !item.itemInfo.isTCP);
      } else if (tcpSelected) {
        filteredItemsList = filteredItemsList.filter(item => item.itemInfo.isTCP);
      }
    }

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
        {filteredItemsList.length !== 0 ? (
          <>
            <Row fullBleed className="list-selection-row">
              <Col colSize={{ small: 6, medium: 6, large: 8 }}>
                <Row fullBleed>
                  <Col
                    colSize={{ small: 6, medium: 5, large: 6 }}
                    offsetLeft={{ medium: 3, large: 6 }}
                  >
                    <SelectWishListDropdown
                      labels={labels}
                      wishlistsSummaries={wishlistsSummaries}
                      createNewWishList={createNewWishList}
                      getActiveWishlist={getActiveWishlist}
                      activeWishList={activeWishList}
                      defaultWishList={defaultWishList}
                      openAddNewList={this.handleAddList}
                      openEditList={this.handleEditList}
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
                      clickHandler={(e, value) => this.shareClickHandler(value)}
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
              <Col colSize={{ large: 12, medium: 8, small: 6 }}>{this.brandFilterList()}</Col>
            </Row>
            <Row fullBleed>
              <Col
                colSize={{ small: 6, medium: 8, large: 12 }}
                className="product-list"
                ignoreGutter={{ small: true, medium: true, large: true }}
              >
                {this.renderProductList()}
              </Col>
            </Row>
            {this.renderModalWrapper()}
          </>
        ) : (
          <Row fullBleed>
            <NoFavoritesFound labels={labels} />
            <Col
              hideCol={{ small: true, medium: true }}
              colSize={{ small: 6, medium: 8, large: 12 }}
              className="recommendation"
            >
              <div>
                <Recommendations {...recommendationAttributes} />
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

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
  isKeepAliveEnabled: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}),
  defaultWishList: PropTypes.shape({}),
};

FavoritesView.defaultProps = {
  wishlistsSummaries: [],
  activeWishList: {},
  selectedColorProductId: '',
  outOfStockLabels: {},
  slpLabels: {},
  defaultWishList: {},
};

export default withStyles(FavoritesView, FavoritesViewStyle);
