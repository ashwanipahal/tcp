import React, { PureComponent, Fragment } from 'react';
import { getLabelValue, capitalize } from '@tcp/core/src/utils';
import { getStoreHours } from '@tcp/core/src/utils/utils';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Image, View } from 'react-native';
import gymboreeLogo from '../../../../../assets/gymboree-logo.png';
import starIcon from '../../../../../assets/star.png';
import marker from '../../../../../assets/icon-marker.png';
import StoreAddressTileRoot, {
  TileHeader,
  TileBody,
  TileFooter,
  DetailsHeader,
  ListingTileWrapper,
  ListingTitleStoreName,
  ListingTitleText,
  AddressText,
  StoryType,
  FavStore,
  FavStoreText,
  ButtonPlaceHolder,
  FooterBtnWrapper,
  FooterBtnRight,
  FooterBtnLeft,
  StoreMeta,
  StoreMetaLeft,
  StoreMetaRight,
  headerLinkStyle,
  brandImageStyles,
  markerImageStyles,
  favStoreIconStyles,
  BtnFullWidth,
} from '../styles/StoreAddressTile.style.native';
import { listingHeader, listingType, detailsType, propTypes, defaultProps } from './prop-types';

const ListingTitleLink = withStyles(Anchor, headerLinkStyle);
const BrandImage = withStyles(Image, brandImageStyles);
const MarkerImage = withStyles(Image, markerImageStyles);
const FavStoreIcon = withStyles(Image, favStoreIconStyles);
const BtnWrapper = withStyles(Button, BtnFullWidth);

class StoreAddressTile extends PureComponent {
  getDetailsHeader() {
    const {
      store: {
        basicInfo: { storeName },
      },
    } = this.props;
    return <DetailsHeader textAlign="left">{storeName}</DetailsHeader>;
  }

  getListingHeader() {
    const {
      storeIndex,
      store: { basicInfo, distance, hours },
      labels,
      openStoreDirections,
      titleClickCb,
    } = this.props;
    const { storeName, id } = basicInfo;
    const currentDate = new Date();
    return (
      <Fragment>
        <ListingTileWrapper>
          {titleClickCb ? (
            <Anchor onPress={e => titleClickCb(e, id)}>
              <ListingTitleStoreName>
                {!!storeIndex && `${storeIndex}. `}
                {storeName}
              </ListingTitleStoreName>
            </Anchor>
          ) : (
            <ListingTitleStoreName>
              {!!storeIndex && `${storeIndex}. `}
              {storeName}
            </ListingTitleStoreName>
          )}
        </ListingTileWrapper>
        <ListingTileWrapper>
          <ListingTitleText>{getStoreHours(hours, labels, currentDate)}</ListingTitleText>
          <ListingTitleText>
            {`${distance} ${getLabelValue(labels, 'lbl_storelanding_milesAway')}`}
          </ListingTitleText>
          <ListingTitleLink
            onPress={openStoreDirections}
            accessibilityRole="link"
            accessibilityLabel={getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
            text={getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
          />
        </ListingTileWrapper>
      </Fragment>
    );
  }

  getDetailsFooter() {
    const {
      setFavoriteStore,
      openStoreDirections,
      openCallStore,
      labels,
      isFavorite,
      store,
      changeFavoriteStore,
    } = this.props;
    return (
      <View>
        <FooterBtnWrapper>
          <BtnWrapper
            fill="BLUE"
            type="submit"
            color="white"
            onPress={() => (isFavorite ? changeFavoriteStore() : setFavoriteStore(store))}
            text={getLabelValue(
              labels,
              `lbl_storedetails_${isFavorite ? 'changestore' : 'setfav'}_btn`
            )}
          />
        </FooterBtnWrapper>
        <FooterBtnWrapper>
          <FooterBtnLeft>
            <BtnWrapper
              type="button"
              onPress={openStoreDirections}
              text={getLabelValue(labels, 'lbl_storedetails_getdirections_btn')}
            />
          </FooterBtnLeft>
          <FooterBtnRight>
            <BtnWrapper
              type="button"
              onPress={openCallStore}
              text={getLabelValue(labels, 'lbl_storedetails_callstore_btn')}
            />
          </FooterBtnRight>
        </FooterBtnWrapper>
      </View>
    );
  }

  getListingFooter() {
    const { openStoreDetails, setFavoriteStore, labels, isFavorite, variation, store } = this.props;

    return (
      <Fragment>
        <ListingTitleLink
          onPress={() => openStoreDetails(store)}
          accessibilityRole="link"
          accessibilityLabel={getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
          text={getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
        />

        {isFavorite && variation === listingType && this.getIsFavStoreIcon()}
        {!isFavorite && variation === listingType && (
          <Button
            type="button"
            onPress={() => setFavoriteStore(store)}
            buttonVariation="fixed-width"
            text={getLabelValue(labels, 'lbl_storelanding_setfavStore')}
          />
        )}
        {variation === listingHeader && <ButtonPlaceHolder />}
      </Fragment>
    );
  }

  getStoreAddress() {
    const { store } = this.props;
    const { address, phone } = store.basicInfo;
    const { addressLine1, city, state, zipCode } = address;
    return [addressLine1, `${city}, ${state}, ${zipCode}`, phone].map((item, i) => (
      <AddressText key={`${item + i}`}>{item && capitalize(item)}</AddressText>
    ));
  }

  getStoreBrand() {
    const {
      labels,
      store: { isGym },
    } = this.props;
    return isGym ? (
      <StoryType>
        <BrandImage source={gymboreeLogo} accessibilityLabel="Gymboree" accessibilityRole="image" />
        <ListingTitleText>{getLabelValue(labels, 'lbl_storelanding_atThisPlace')}</ListingTitleText>
      </StoryType>
    ) : (
      <StoryType />
    );
  }

  getStoreType() {
    const {
      labels,
      store: { features },
    } = this.props;
    const { storeType } = features;
    return (
      storeType && (
        <StoryType>
          <MarkerImage source={marker} accessibilityLabel="Icon Marker" accessibilityRole="image" />
          <ListingTitleText>
            {getLabelValue(labels, 'lbl_storelanding_atThisPlace')}
          </ListingTitleText>
        </StoryType>
      )
    );
  }

  getIsFavStoreIcon() {
    const { labels } = this.props;
    return (
      <FavStore>
        <FavStoreIcon
          source={starIcon}
          accessibilityLabel={getLabelValue(labels, 'lbl_storelanding_favStore')}
          accessibilityRole="image"
        />
        <FavStoreText>{getLabelValue(labels, 'lbl_storelanding_favStore')}</FavStoreText>
      </FavStore>
    );
  }

  getStoreListingMeta() {
    return this.getStoreBrand();
  }

  getStoreDetailsMeta() {
    const { isFavorite } = this.props;
    return (
      <StoreMeta>
        <StoreMetaLeft>
          {this.getStoreType()}
          {this.getStoreBrand()}
        </StoreMetaLeft>
        <StoreMetaRight>{isFavorite && this.getIsFavStoreIcon()}</StoreMetaRight>
      </StoreMeta>
    );
  }

  render() {
    const { children, variation } = this.props;
    return (
      <StoreAddressTileRoot variation={variation}>
        <TileHeader>
          {variation === detailsType && this.getDetailsHeader()}
          {variation !== detailsType && this.getListingHeader()}
        </TileHeader>
        <TileBody>
          {this.getStoreAddress()}
          {variation === detailsType && this.getStoreDetailsMeta()}
          {variation !== detailsType && this.getStoreListingMeta()}
          {children}
        </TileBody>
        <TileFooter>
          {variation === detailsType && this.getDetailsFooter()}
          {variation !== detailsType && this.getListingFooter()}
        </TileFooter>
      </StoreAddressTileRoot>
    );
  }
}

StoreAddressTile.propTypes = propTypes;

StoreAddressTile.defaultProps = defaultProps;
export default StoreAddressTile;
