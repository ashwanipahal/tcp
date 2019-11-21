/* eslint-disable max-lines */
import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { getLoading, getLabelValue } from '@tcp/core/src/utils';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import {
  PageContainer,
  BrandFilterContainer,
  RowContainer,
  DropDownContainer,
  ShareDropDownContainer,
  ListHeaderContainer,
  ListFooterContainer,
  DropDownWishlistItemContainer,
  SelectedWishlistContainer,
  ItemCountContainer,
  RecommendationWrapper,
} from '../styles/Favorites.style.native';
import ProductListing from '../../ProductListing/views';
import { getNonEmptyFiltersList, getSortsList, getVisibleWishlistItems } from '../Favorites.util';
import SelectWishListDropdown from '../molecules/SelectWishListDropdown/SelectWishListDropdown.native';
import { Button } from '../../../../common/atoms';
import { ICON_NAME } from '../../../../common/atoms/Icon/Icon.constants';
import CustomIcon from '../../../../common/atoms/Icon';
import ModalWrapper from '../molecules/ModalWrapper';
import AddList from '../molecules/AddList';
import EditList from '../molecules/EditList';
import ShareList from '../molecules/ShareList';
import CopyLink from '../molecules/CopyLink';
import NoFavoritesFound from '../molecules/NoFavoritesFound/views';
import Recommendations from '../../../../../../../mobileapp/src/components/common/molecules/Recommendations';

const dropDownStyle = {
  height: 49,
  border: 1,
};
const itemStyle = {
  height: 49,
  color: 'gray.800',
};
const arrowImageStyle = {
  position: 'absolute',
  right: 0,
};

const ADD_LIST = 'addList';
const EDIT_LIST = 'editList';
const SHARE_LIST_BY_EMAIL = 'shareListByEmail';
const SHARE_LIST_BY_COPY_LINK = 'shareListByCopyLink';

class FavoritesView extends React.PureComponent {
  currentPopupName;

  brandOptions;
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
    const { labels, gymSelected, tcpSelected } = props;
    this.brandOptions = [
      {
        name: 'tcpOption',
        dataLocator: 'fav_brand_tcp_lbl',
        brandLabel: labels.lbl_fav_tcp,
        checked: tcpSelected,
      },
      {
        name: 'gymboreeOption',
        dataLocator: 'fav_brand_gym_lbl',
        brandLabel: labels.lbl_fav_gym,
        checked: gymSelected,
      },
    ];
    this.state = {
      selectedWishlist: '',
      selectedShareOption: '',
      isOpenModal: false,
    };
  }

  onSelectBrandType = (branchId, isChecked) => {
    const { selectBrandType } = this.props;
    const data = {
      target: {
        id: branchId,
        checked: isChecked,
      },
    };
    if (selectBrandType) {
      selectBrandType(data);
    }
  };

  onAddNewListHandler = data => {
    console.tron.log('onAddNewListHandler:', data);
  };

  onEditListHandler = data => {
    console.tron.log('onEditListHandler:', data);
  };

  onDeleteListHandler = data => {
    console.tron.log('onDeleteListHandler:', data);
  };

  onCopyLinkHandler = data => {
    console.tron.log('onCopyLinkHandler:', data);
  };

  handleEditList = () => {
    this.currentPopupName = EDIT_LIST;
    this.setState({
      isOpenModal: true,
    });
  };

  handleShareListByEmail = () => {
    this.currentPopupName = SHARE_LIST_BY_EMAIL;
    this.setState({
      isOpenModal: true,
    });
  };

  handleShareListByCopyLink = () => {
    this.currentPopupName = SHARE_LIST_BY_COPY_LINK;
    this.setState({
      isOpenModal: true,
    });
  };

  handleAddList = () => {
    this.currentPopupName = ADD_LIST;
    this.setState({
      isOpenModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  renderModalWrapper = () => {
    const { labels } = this.props;
    const { isOpenModal } = this.state;
    return (
      <ModalWrapper
        labels={labels}
        heading={this.getCurrentPopUpHeading()}
        modalMargins="0 14px 0 14px"
        isOpenModal={isOpenModal}
        onCloseModal={this.onCloseModal}
      >
        {this.getCurrentPopUp()}
      </ModalWrapper>
    );
  };

  getCurrentPopUpHeading = () => {
    const { labels } = this.props;
    if (this.currentPopupName === ADD_LIST) {
      return getLabelValue(labels, 'lbl_fav_create_new_list_heading');
    }
    if (this.currentPopupName === EDIT_LIST) {
      return null;
    }
    if (this.currentPopupName === SHARE_LIST_BY_EMAIL) {
      return getLabelValue(labels, 'lbl_fav_share_list_heading');
    }
    if (this.currentPopupName === SHARE_LIST_BY_COPY_LINK) {
      return getLabelValue(labels, 'lbl_fav_share_list_heading');
    }
    return '';
  };

  getCurrentPopUp = () => {
    const { labels } = this.props;
    if (this.currentPopupName === ADD_LIST) {
      return (
        <AddList
          labels={labels}
          onHandleSubmit={this.onAddNewListHandler}
          onCloseModal={this.onCloseModal}
        />
      );
    }
    if (this.currentPopupName === EDIT_LIST) {
      return (
        <EditList
          labels={labels}
          onHandleSubmit={this.onEditListHandler}
          onCloseModal={this.onCloseModal}
          onDeleteList={this.onDeleteListHandler}
        />
      );
    }
    if (this.currentPopupName === SHARE_LIST_BY_EMAIL) {
      return (
        <ShareList
          labels={labels}
          onHandleSubmit={this.onEditListHandler}
          onCloseModal={this.onCloseModal}
        />
      );
    }

    if (this.currentPopupName === SHARE_LIST_BY_COPY_LINK) {
      return (
        <CopyLink
          labels={labels}
          onCopyLink={this.onCopyLinkHandler}
          onCloseModal={this.onCloseModal}
        />
      );
    }

    return null;
  };

  renderBrandFilter = () => {
    const { tcpSelected, gymSelected, labels } = this.props;
    return (
      <BrandFilterContainer margins="48px 0 0 0">
        <BodyCopy
          dataLocator="fav_brand_title"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.1700"
          text={labels.lbl_fav_brand}
        />
        <RowContainer margins="10px 0 0 0">
          <InputCheckbox
            dataLocator={this.brandOptions[0].dataLocator}
            execOnChangeByDefault={false}
            rightText={this.brandOptions[0].brandLabel}
            isChecked={tcpSelected}
            fontSize="fs14"
            input={{
              value: this.brandOptions[0].checked,
              onChange: isChecked => this.onSelectBrandType(this.brandOptions[0].name, isChecked),
            }}
          />
          <InputCheckbox
            margins="0 0 0 19px"
            dataLocator={this.brandOptions[1].dataLocator}
            execOnChangeByDefault={false}
            rightText={this.brandOptions[1].brandLabel}
            isChecked={gymSelected}
            fontSize="fs14"
            input={{
              value: this.brandOptions[1].checked,
              onChange: isChecked => this.onSelectBrandType(this.brandOptions[1].name, isChecked),
            }}
          />
        </RowContainer>
      </BrandFilterContainer>
    );
  };

  handleWishlistClick = value => {
    const { getActiveWishlist } = this.props;
    getActiveWishlist(value);
  };

  handleShareClick = () => {};

  renderHeader = () => {
    const { labels } = this.props;
    return (
      <ListHeaderContainer>
        <BodyCopy
          margin="12px 0 0 32px"
          dataLocator="fav_lbl_myFavorites"
          mobileFontFamily="primary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.900"
          text={getLabelValue(labels, 'lbl_fav_myFavorites')}
        />
      </ListHeaderContainer>
    );
  };

  // eslint-disable-next-line sonarjs/no-identical-functions
  renderFooter = () => {
    const { labels } = this.props;
    return (
      <ListFooterContainer>
        <Button
          buttonVariation="fixed-width"
          onPress={this.createWishlist}
          fill="BLACK"
          text={getLabelValue(labels, 'lbl_fav_createNewList')}
        />
      </ListFooterContainer>
    );
  };

  createWishlist = () => {};

  renderWishlistItems = ({ item }, onDropDownItemClick) => {
    const { displayName, itemsCount, isDefault } = item;
    return (
      <DropDownWishlistItemContainer
        onPress={() => onDropDownItemClick && onDropDownItemClick(item)}
        style={itemStyle}
      >
        <SelectedWishlistContainer>
          {isDefault && (
            <CustomIcon
              margins="0 4px 0 0"
              name={ICON_NAME.checkmark}
              size="fs16"
              color={itemStyle.color}
            />
          )}
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs13"
            color={isDefault ? 'gray.900' : itemStyle.color}
            fontWeight={isDefault ? 'extrabold' : 'regular'}
            text={displayName}
          />
        </SelectedWishlistContainer>
        {this.renderItemCount(itemsCount, isDefault)}
      </DropDownWishlistItemContainer>
    );
  };

  renderItemCount = (itemsCount, isDefault) => {
    const { labels } = this.props;
    return (
      <ItemCountContainer>
        <BodyCopy
          margin="0 4px 0 0"
          fontFamily="secondary"
          fontSize="fs13"
          color={isDefault ? 'gray.900' : itemStyle.color}
          fontWeight={isDefault ? 'extrabold' : 'regular'}
          text={itemsCount}
        />
        <BodyCopy
          margin="0 12px 0 0"
          fontFamily="secondary"
          fontSize="fs13"
          color={itemStyle.color}
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_fav_items')}
        />
      </ItemCountContainer>
    );
  };

  getSharingOptions = () => {
    const { labels } = this.props;
    return [
      {
        displayName: labels.lbl_fav_facebook,
        value: labels.lbl_fav_facebook,
      },
      {
        displayName: labels.lbl_fav_email,
        value: labels.lbl_fav_email,
      },
      {
        displayName: labels.lbl_fav_copyLink,
        value: labels.lbl_fav_copyLink,
      },
    ];
  };

  render() {
    const {
      activeWishListProducts,
      navigation,
      currencySymbol,
      labels,
      selectedColorProductId,
      onGoToPDPPage,
      onQuickViewOpenClick,
      setLastDeletedItemId,
      filteredId,
      sortId,
      onFilterSelection,
      onSortSelection,
      gymSelected,
      tcpSelected,
      isDataLoading,
      labelsPlpTiles,
      wishlistsSummaries,
      defaultWishList,
    } = this.props;

    const { selectedWishlist, selectedShareOption } = this.state;
    if (isDataLoading) return getLoading();
    const filtersArray = activeWishListProducts
      ? getNonEmptyFiltersList(activeWishListProducts, labels)
      : [];
    let filteredItemsList =
      !!activeWishListProducts &&
      getVisibleWishlistItems(activeWishListProducts, filteredId, sortId);
    if (filteredItemsList) {
      if (gymSelected) {
        filteredItemsList = filteredItemsList.filter(item => !item.itemInfo.isTCP);
      } else if (tcpSelected) {
        filteredItemsList = filteredItemsList.filter(item => item.itemInfo.isTCP);
      }
    }

    const recommendationAttributes = {
      variation: 'moduleO',
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.HOMEPAGE,
      showLoyaltyPromotionMessage: false,
      headerAlignment: 'left',
    };

    return (
      <PageContainer>
        {this.renderModalWrapper()}
        <BodyCopy
          margin="40px 0 0 0"
          dataLocator="fav_lbl_myFavorites"
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          color="gray.900"
          text={getLabelValue(labels, 'lbl_fav_myFavorites')}
        />
        <LineComp borderWidth="2" marginTop="12" borderColor="black" />

        {filteredItemsList.length === 0 ? (
          <>
            <NoFavoritesFound labels={labels} />
            <RecommendationWrapper>
              <Recommendations {...recommendationAttributes} />
            </RecommendationWrapper>
          </>
        ) : (
          <>
            <DropDownContainer>
              <SelectWishListDropdown
                selectedValue={selectedWishlist}
                data={wishlistsSummaries}
                defaultWishList={defaultWishList}
                onValueChange={itemValue => {
                  this.setState({ selectedWishlist: itemValue }, () =>
                    this.handleWishlistClick(itemValue)
                  );
                }}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedItemFontWeight="semibold"
                dropDownItemFontWeight="regular"
                renderHeader={this.renderHeader}
                renderFooter={this.renderFooter}
                renderItems={this.renderWishlistItems}
                fontSize="fs24"
                labels={labels}
                arrowImageStyle={arrowImageStyle}
                isWishlist
              />
            </DropDownContainer>
            <DropDownContainer>
              <Anchor
                locator="pdp_write_review_icon"
                accessibilityLabel={getLabelValue(labels, 'lbl_fav_editListSettings')}
                text={getLabelValue(labels, 'lbl_fav_editListSettings')}
                anchorVariation="custom"
                colorName="gray.900"
                fontSizeVariation="normal"
                onPress={this.handleEditList}
                centered
                underline
              />
            </DropDownContainer>

            <ShareDropDownContainer>
              <SelectWishListDropdown
                selectedValue={selectedShareOption}
                data={this.getSharingOptions()}
                onValueChange={itemValue => {
                  this.setState({ selectedShareOption: itemValue }, () =>
                    this.handleShareClick(itemValue)
                  );
                }}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedItemFontWeight="extrabold"
                dropDownItemFontWeight="regular"
                width="100px"
                labels={labels}
                isShareOptions
              />
            </ShareDropDownContainer>
            <ProductListing
              products={filteredItemsList}
              filters={filtersArray}
              totalProductsCount={filteredItemsList.length}
              filtersLength={0}
              navigation={navigation}
              onGoToPDPPage={onGoToPDPPage}
              isFavorite
              currencySymbol={currencySymbol}
              labelsFilter={labels}
              labels={labels}
              onQuickViewOpenClick={onQuickViewOpenClick}
              selectedColorProductId={selectedColorProductId}
              setLastDeletedItemId={setLastDeletedItemId}
              sortLabels={getSortsList(labels)}
              onFilterSelection={onFilterSelection}
              onSortSelection={onSortSelection}
              filteredId={filteredId}
              renderBrandFilter={this.renderBrandFilter}
              labelsPlpTiles={labelsPlpTiles}
            />
          </>
        )}
      </PageContainer>
    );
  }
}

FavoritesView.propTypes = {
  // eslint-disable-next-line
  wishlistsSummaries: PropTypes.arrayOf({}).isRequired,
  activeWishList: PropTypes.shape({}).isRequired,
  // eslint-disable-next-line
  activeWishListId: PropTypes.number.isRequired,
  activeWishListProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filters: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
  currencySymbol: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  selectedColorProductId: PropTypes.string,
  onGoToPDPPage: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
  filteredId: PropTypes.string,
  sortId: PropTypes.string.isRequired,
  onFilterSelection: PropTypes.func.isRequired,
  onSortSelection: PropTypes.func.isRequired,
  selectBrandType: PropTypes.string.isRequired,
  gymSelected: PropTypes.bool.isRequired,
  tcpSelected: PropTypes.bool.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  labelsPlpTiles: PropTypes.shape({}).isRequired,
  getActiveWishlist: PropTypes.func.isRequired,
  defaultWishList: PropTypes.shape({}),
};

FavoritesView.defaultProps = {
  filters: {},
  currencySymbol: '$',
  labels: {},
  selectedColorProductId: '',
  filteredId: 'ALL',
  defaultWishList: {},
};

export default FavoritesView;

export { FavoritesView as FavoritesViewVanilla };
