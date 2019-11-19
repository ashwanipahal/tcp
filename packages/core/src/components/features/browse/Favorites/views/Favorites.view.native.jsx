import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { getLoading, getLabelValue } from '@tcp/core/src/utils';
import {
  PageContainer,
  BrandFilterContainer,
  RowContainer,
  DropDownContainer,
  ShareDropDownContainer,
  ListHeaderContainer,
  ListFooterContainer,
} from '../styles/Favorites.style.native';
import ProductListing from '../../ProductListing/views';
import { getNonEmptyFiltersList, getSortsList, getVisibleWishlistItems } from '../Favorites.util';
import SelectWishListDropdown from '../molecules/SelectWishListDropdown/SelectWishListDropdown.native';
import { Button } from '../../../../common/atoms';

const shareOptions = [
  {
    id: 'share',
    displayName: 'Share',
    value: 'share',
  },
  {
    id: 'email',
    displayName: 'Email',
    value: 'email',
  },
  {
    id: 'copyLink',
    displayName: 'Copy Link',
    value: 'copyLink',
  },
];
class FavoritesView extends React.PureComponent {
  brandOptions;
  // eslint-disable-next-line
  constructor(props) {
    super(props);
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
      selectedShareOption: 'share',
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

  handleEditList = () => {};

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

    return (
      <PageContainer>
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
            fontSize="fs24"
            labels={labels}
            arrowImageStyle={arrowImageStyle}
            isWishlist
          />
        </DropDownContainer>
        <DropDownContainer>
          <Anchor
            locator="pdp_write_review_icon"
            accessibilityLabel="Edit List Settings"
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
            data={shareOptions}
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
