/* eslint-disable max-lines */
import React from 'react';
import { View, Share, Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';
import { ShareDialog } from 'react-native-fbsdk';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { getLoading, getLabelValue } from '@tcp/core/src/utils';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import {
  PageContainer,
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

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const numberOfColumn = 2;
const dropdownWidth = win.width / numberOfColumn - paddingAroundImage;

const ADD_LIST = 'addList';
const EDIT_LIST = 'editList';
const SHARE_LIST_BY_EMAIL = 'shareListByEmail';
const SHARE_LIST_BY_COPY_LINK = 'shareListByCopyLink';

class FavoritesView extends React.PureComponent {
  currentPopupName;
  addListFromMoveOption = false;
  selectedItemId = '';

  brandOptions;
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      seeSuggestedDictionary: {},
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
    const { createNewWishList, createNewWishListMoveItem } = this.props;
    this.onCloseModal();
    if (this.addListFromMoveOption) {
      const payload = {
        ...data,
        itemId: this.selectedItemId,
      };
      if (createNewWishListMoveItem) {
        createNewWishListMoveItem(payload);
      }
      this.addListFromMoveOption = false;
      this.selectedItemId = '';
    } else if (createNewWishList) createNewWishList(data);
  };

  onEditListHandler = data => {
    const { updateWishList } = this.props;
    this.onCloseModal();
    if (updateWishList) {
      updateWishList(data);
    }
  };

  onDeleteListHandler = data => {
    const { deleteWishList } = this.props;
    this.onCloseModal();
    if (deleteWishList) {
      deleteWishList(data);
    }
  };

  onShareListEmailHandler = data => {
    this.onCloseModal();
    const { sendWishListEmail } = this.props;
    const payload = {
      shareToEmailAddresses: data.toEmail,
      shareFromEmailAddresses: data.fromEmail,
      shareSubject: data.subject,
      shareMessage: data.message,
    };
    sendWishListEmail(payload);
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

  handleAddList = (closeDropDown, addListFromMoveOption) => {
    if (closeDropDown) {
      closeDropDown();
    }
    this.currentPopupName = ADD_LIST;
    this.addListFromMoveOption = addListFromMoveOption || false;
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
    const {
      labels,
      activeWishListId,
      activeWishList,
      wishlistsSummaries,
      userEmail,
      formErrorMessage,
    } = this.props;
    if (this.currentPopupName === ADD_LIST) {
      return (
        <AddList
          labels={labels}
          onHandleSubmit={this.onAddNewListHandler}
          onCloseModal={this.onCloseModal}
          formErrorMessage={formErrorMessage}
        />
      );
    }
    if (this.currentPopupName === EDIT_LIST) {
      const isCheckBoxDisabled = (wishlistsSummaries && wishlistsSummaries.length === 1) || false;
      return (
        <EditList
          labels={labels}
          onHandleSubmit={this.onEditListHandler}
          onCloseModal={this.onCloseModal}
          onDeleteList={this.onDeleteListHandler}
          activeWishListId={activeWishListId}
          formErrorMessage={formErrorMessage}
          initialValues={{
            listName: activeWishList.displayName,
            isChecked: activeWishList.isDefault,
          }}
          isCheckBoxDisabled={isCheckBoxDisabled}
        />
      );
    }
    if (this.currentPopupName === SHARE_LIST_BY_EMAIL) {
      return (
        <ShareList
          labels={labels}
          onHandleSubmit={this.onShareListEmailHandler}
          onCloseModal={this.onCloseModal}
          formErrorMessage={formErrorMessage}
          initialValues={{
            subject: getLabelValue(labels, 'lbl_fav_subject_default'),
            fromEmail: userEmail,
          }}
        />
      );
    }

    if (this.currentPopupName === SHARE_LIST_BY_COPY_LINK) {
      return <CopyLink labels={labels} onCloseModal={this.onCloseModal} />;
    }

    return null;
  };

  renderBrandFilter = () => {
    const { tcpSelected, gymSelected, isBothTcpAndGymProductAreAvailable } = this.props;
    if (!isBothTcpAndGymProductAreAvailable) {
      return null;
    }
    return (
      <RowContainer margins="12px 0 0 0">
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
    );
  };

  handleWishlistClick = value => {
    const { getActiveWishlist } = this.props;
    getActiveWishlist(value);
  };

  handleShareClick = value => {
    if (value === 'facebook') {
      this.shareLinkOnFacebook();
    } else if (value === 'email') {
      this.handleShareListByEmail();
    } else {
      this.onShareLink();
    }
  };

  getSharableLink = () => {
    const { activeWishList, wishlistsSummaries } = this.props;
    const activeWishListId = activeWishList && activeWishList.id;
    const currentWishList =
      wishlistsSummaries &&
      wishlistsSummaries.length > 0 &&
      wishlistsSummaries.filter(wishlist => {
        return wishlist.id === activeWishListId;
      });
    return currentWishList && currentWishList[0].shareableLink;
  };

  shareLinkOnFacebook = () => {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: this.getSharableLink(),
    };
    ShareDialog.canShow(shareLinkContent).then(canShow => {
      if (canShow) {
        return ShareDialog.show(shareLinkContent);
      }
      return null;
    });
  };

  onShareLink = () => {
    Share.share({
      message: this.getSharableLink(),
    });
  };

  renderHeader = margins => {
    const { labels } = this.props;
    return (
      <ListHeaderContainer>
        <BodyCopy
          margin={margins}
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

  renderFooter = (closeDropDown, addListFromMoveOption) => {
    const { labels, wishlistsSummaries } = this.props;
    const isDisable = (wishlistsSummaries && wishlistsSummaries.length === 5) || false;
    return (
      <ListFooterContainer>
        <Button
          buttonVariation="fixed-width"
          onPress={() => this.handleAddList(closeDropDown, addListFromMoveOption)}
          fill="BLACK"
          text={getLabelValue(labels, 'lbl_fav_createNewList')}
          disableButton={isDisable}
        />
      </ListFooterContainer>
    );
  };

  renderWishlistItems = ({ item }, onDropDownItemClick) => {
    const { activeWishList } = this.props;
    const { displayName, itemsCount, id } = item;
    const isSelectedFavorites = activeWishList && activeWishList.id === id;
    return (
      <DropDownWishlistItemContainer
        onPress={() => onDropDownItemClick && onDropDownItemClick(item)}
        style={itemStyle}
      >
        <SelectedWishlistContainer width="80%">
          {isSelectedFavorites && (
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
            color={isSelectedFavorites ? 'gray.900' : itemStyle.color}
            fontWeight={isSelectedFavorites ? 'extrabold' : 'regular'}
            text={displayName}
          />
        </SelectedWishlistContainer>
        {this.renderItemCount(itemsCount, isSelectedFavorites)}
      </DropDownWishlistItemContainer>
    );
  };

  renderItemCount = (itemsCount, isSelected) => {
    const { labels } = this.props;
    return (
      <ItemCountContainer>
        <BodyCopy
          margin="0 4px 0 0"
          fontFamily="secondary"
          fontSize="fs13"
          color={isSelected ? 'gray.900' : itemStyle.color}
          fontWeight={isSelected ? 'extrabold' : 'regular'}
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

  renderMoveToList = itemId => {
    const { labels, wishlistsSummaries, defaultWishList, activeWishList } = this.props;
    this.selectedItemId = itemId;
    return (
      <SelectWishListDropdown
        selectedValue={getLabelValue(labels, 'lbl_fav_moveToAnotherList')}
        data={wishlistsSummaries}
        defaultWishList={defaultWishList}
        activeWishList={activeWishList}
        onValueChange={itemValue => {
          this.handleMoveToList(itemValue, itemId);
        }}
        variation="secondary"
        dropDownStyle={{ ...dropDownStyle, height: 36 }}
        itemStyle={{ ...itemStyle, height: 36 }}
        renderHeader={() => this.renderHeader('16px 0 0 12px')}
        renderFooter={closeDropDown => this.renderFooter(closeDropDown, true)}
        renderItems={this.renderMoveToListItems}
        selectedItemFontWeight="regular"
        dropDownItemFontWeight="regular"
        labels={labels}
        isCustomiseListHeight
        isMoveToList
        width={dropdownWidth}
      />
    );
  };

  renderMoveToListItems = ({ item }, onDropDownItemClick) => {
    const { activeWishList, labels } = this.props;
    const { displayName, itemsCount, id } = item;
    const isSelectedFavorites = activeWishList && activeWishList.id === id;
    const selectedItem = {
      ...item,
      displayName: getLabelValue(labels, 'lbl_fav_moveToAnotherList'),
    };
    return (
      <DropDownWishlistItemContainer
        onPress={() => onDropDownItemClick && onDropDownItemClick(selectedItem)}
        style={itemStyle}
      >
        <SelectedWishlistContainer width="60%">
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs13"
            color={isSelectedFavorites ? 'gray.900' : itemStyle.color}
            fontWeight={isSelectedFavorites ? 'extrabold' : 'regular'}
            text={displayName}
          />
        </SelectedWishlistContainer>
        {this.renderItemCount(itemsCount, isSelectedFavorites)}
      </DropDownWishlistItemContainer>
    );
  };

  handleMoveToList = (wishListId, itemId) => {
    const { createNewWishListMoveItem } = this.props;
    if (createNewWishListMoveItem) {
      createNewWishListMoveItem({ wisListId: wishListId, itemId });
    }
  };

  getSharingOptions = () => {
    const { labels } = this.props;
    return [
      {
        displayName: labels.lbl_fav_facebook,
        value: 'facebook',
      },
      {
        displayName: labels.lbl_fav_email,
        value: 'email',
      },
      {
        displayName: labels.lbl_fav_copyLink,
        value: 'copyLink',
      },
    ];
  };

  onSeeSuggestedItems = (colorProductId, itemId) => {
    const { activeWishListId, onReplaceWishlistItem } = this.props;
    const { seeSuggestedDictionary } = this.state;
    const { navigation } = this.props;

    const recommendationAttributes = {
      variation: 'moduleP',
      navigation,
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.FAVORITES,
      partNumber: colorProductId,
      isHeaderAccordion: true,
      isSuggestedItem: true,
      outOfStockColorProductId: colorProductId,
      onDismissSuggestion: this.onCloseSuggestedModal,
      onReplaceWishlistItem,
      suggestedOOSItemId: itemId,
      activeWishListId,
    };
    const suggestedData = {
      colorProductId,
      attributes: recommendationAttributes,
    };
    const dictionary = { ...seeSuggestedDictionary, [colorProductId]: suggestedData };
    this.setState({
      seeSuggestedDictionary: dictionary,
    });
  };

  onCloseSuggestedModal = colorProductId => {
    const { seeSuggestedDictionary } = this.state;
    const suggestedData = {
      colorProductId: null,
      attributes: null,
    };
    const dictionary = { ...seeSuggestedDictionary, [colorProductId]: suggestedData };
    this.setState({
      seeSuggestedDictionary: dictionary,
    });
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
      activeWishList,
      isKeepAliveEnabled,
      outOfStockLabels,
      resetBrandFilters,
      isBothTcpAndGymProductAreAvailable,
      isLoggedIn,
      updateAppTypeHandler,
    } = this.props;

    const { selectedShareOption, seeSuggestedDictionary } = this.state;
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
    const displayName = (activeWishList && activeWishList.displayName) || '';

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
        <DropDownContainer>
          <SelectWishListDropdown
            selectedValue={displayName}
            data={wishlistsSummaries}
            defaultWishList={defaultWishList}
            activeWishList={activeWishList}
            onValueChange={itemValue => {
              if (resetBrandFilters) {
                resetBrandFilters();
              }
              this.handleWishlistClick(itemValue);
            }}
            variation="secondary"
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
            selectedItemFontWeight="semibold"
            dropDownItemFontWeight="regular"
            renderHeader={() => this.renderHeader('16px 0 0 32px')}
            renderFooter={this.renderFooter}
            renderItems={this.renderWishlistItems}
            fontSize="fs24"
            labels={labels}
            arrowImageStyle={arrowImageStyle}
            isWishlist
            isCustomiseListHeight
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
        {filteredItemsList.length === 0 ? (
          <View>
            <NoFavoritesFound labels={labels} />
            <RecommendationWrapper>
              <Recommendations {...recommendationAttributes} />
            </RecommendationWrapper>
          </View>
        ) : (
          <View>
            <ShareDropDownContainer>
              <SelectWishListDropdown
                selectedValue={selectedShareOption}
                data={this.getSharingOptions()}
                onValueChange={itemValue => {
                  setTimeout(() => {
                    this.handleShareClick(itemValue);
                  }, 160);
                }}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedItemFontWeight="extrabold"
                dropDownItemFontWeight="regular"
                width="100px"
                labels={labels}
                isShareOptions
                showListSeperator
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
              labelsFavorite={labels}
              onQuickViewOpenClick={onQuickViewOpenClick}
              selectedColorProductId={selectedColorProductId}
              setLastDeletedItemId={setLastDeletedItemId}
              sortLabels={getSortsList(labels)}
              onFilterSelection={onFilterSelection}
              onSortSelection={onSortSelection}
              filteredId={filteredId}
              renderBrandFilter={this.renderBrandFilter}
              labelsPlpTiles={labelsPlpTiles}
              isKeepAliveEnabled={isKeepAliveEnabled}
              outOfStockLabels={outOfStockLabels}
              isBothTcpAndGymProductAreAvailable={isBothTcpAndGymProductAreAvailable}
              renderMoveToList={this.renderMoveToList}
              isLoggedIn={isLoggedIn}
              onSeeSuggestedItems={this.onSeeSuggestedItems}
              onCloseSuggestedModal={this.onCloseSuggestedModal}
              seeSuggestedDictionary={seeSuggestedDictionary}
              updateAppTypeHandler={updateAppTypeHandler}
            />
          </View>
        )}
      </PageContainer>
    );
  }
}

FavoritesView.propTypes = {
  wishlistsSummaries: PropTypes.arrayOf({}).isRequired,
  activeWishList: PropTypes.shape({}).isRequired,
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
  defaultWishList: PropTypes.shape([]).isRequired,
  createNewWishList: PropTypes.func.isRequired,
  deleteWishList: PropTypes.func.isRequired,
  updateWishList: PropTypes.func.isRequired,
  isBothTcpAndGymProductAreAvailable: PropTypes.bool.isRequired,
  isKeepAliveEnabled: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}),
  userEmail: PropTypes.string.isRequired,
  sendWishListEmail: PropTypes.func.isRequired,
  resetBrandFilters: PropTypes.func.isRequired,
  createNewWishListMoveItem: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
  onLoadRecommendations: PropTypes.func.isRequired,
  onReplaceWishlistItem: PropTypes.func.isRequired,
};

FavoritesView.defaultProps = {
  filters: {},
  currencySymbol: '$',
  labels: {},
  selectedColorProductId: '',
  filteredId: 'ALL',
  outOfStockLabels: {},
};

export default FavoritesView;

export { FavoritesView as FavoritesViewVanilla };
