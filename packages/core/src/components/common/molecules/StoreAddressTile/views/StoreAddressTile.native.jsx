import React, { PureComponent, Fragment } from 'react';
import { toTimeString } from '@tcp/core/src/utils';
import { parseDate } from '@tcp/core/src/utils/parseDate';
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
} from '../styles/StoreAddressTile.style.native';
import { listingHeader, listingType, detailsType, propTypes, defaultProps } from './prop-types';

const ListingTitleLink = withStyles(Anchor, headerLinkStyle);
const BrandImage = withStyles(Image, brandImageStyles);
const MarkerImage = withStyles(Image, markerImageStyles);
const FavStoreIcon = withStyles(Image, favStoreIconStyles);

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
      store: { basicInfo, distance },
      labels,
      openStoreDirections,
    } = this.props;
    const { storeName } = basicInfo;
    return (
      <Fragment>
        <ListingTileWrapper>
          <ListingTitleStoreName>
            {!!storeIndex && `${storeIndex}. `}
            {storeName}
          </ListingTitleStoreName>
        </ListingTileWrapper>
        <ListingTileWrapper>
          <ListingTitleText>
            {`(${labels.lbl_storelanding_openInterval} ${this.getStoreHours()})`}
          </ListingTitleText>
          <ListingTitleText>{`${distance} ${labels.lbl_storelanding_milesAway}`}</ListingTitleText>
          <ListingTitleLink
            onPress={openStoreDirections}
            accessibilityRole="link"
            accessibilityLabel={labels.lbl_storelanding_getdirections_link}
            text={labels.lbl_storelanding_getdirections_link}
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
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            onPress={() => (isFavorite ? changeFavoriteStore() : setFavoriteStore(store))}
            buttonVariation="variable-width"
            text={labels[`lbl_storedetails_${isFavorite ? 'changestore' : 'setfav'}_btn`]}
          />
        </FooterBtnWrapper>
        <FooterBtnWrapper>
          <FooterBtnLeft>
            <Button
              type="button"
              onPress={openStoreDirections}
              buttonVariation="variable-width"
              text={labels.lbl_storedetails_getdirections_btn}
            />
          </FooterBtnLeft>
          <FooterBtnRight>
            <Button
              type="button"
              onPress={openCallStore}
              buttonVariation="variable-width"
              text={labels.lbl_storedetails_callstore_btn}
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
          accessibilityLabel={labels.lbl_storelanding_storedetails_link}
          text={labels.lbl_storelanding_storedetails_link}
        />

        {isFavorite && variation === listingType && this.getIsFavStoreIcon()}
        {!isFavorite && variation === listingType && (
          <Button
            type="button"
            onPress={() => setFavoriteStore(store)}
            buttonVariation="fixed-width"
            text={labels.lbl_storelanding_setfavStore}
          />
        )}
        {variation === listingHeader && <ButtonPlaceHolder />}
      </Fragment>
    );
  }

  getStoreHours() {
    const {
      store: { hours },
    } = this.props;
    const todaysDate = new Date();
    const { regularHours, holidayHours, regularAndHolidayHours } = hours;
    const intervals = [...regularHours, ...holidayHours, ...regularAndHolidayHours];
    let selectedInterval = intervals.filter(hour => {
      const toInterval = hour && hour.openIntervals[0] && hour.openIntervals[0].toHour;
      const parsedDate = new Date(toInterval);
      return (
        parsedDate.getDate() === todaysDate.getDate() &&
        parsedDate.getMonth() === todaysDate.getMonth() &&
        parsedDate.getFullYear() === todaysDate.getFullYear()
      );
    });
    // Fallback for Date and month not matching.
    // We check day and year instead.
    if (!selectedInterval.length) {
      selectedInterval = intervals.filter(hour => {
        const toInterval = hour && hour.openIntervals[0] && hour.openIntervals[0].toHour;
        const parsedDate = new Date(toInterval);
        return (
          parsedDate.getDay() === todaysDate.getDay() &&
          parsedDate.getFullYear() === todaysDate.getFullYear()
        );
      });
    }
    try {
      return toTimeString(parseDate(selectedInterval[0].openIntervals[0].toHour), true);
    } catch (err) {
      // Show empty incase no data found.
      return '';
    }
  }

  getStoreAddress() {
    const { store } = this.props;
    const { address, phone } = store.basicInfo;
    const { addressLine1, city, state, zipCode } = address;
    return [addressLine1, `${city}, ${state}, ${zipCode}`, phone].map((item, i) => (
      <AddressText key={`${item + i}`}>{item}</AddressText>
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
        <ListingTitleText>{labels.lbl_storelanding_atThisPlace}</ListingTitleText>
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
          <ListingTitleText>{labels.lbl_storelanding_atThisPlace}</ListingTitleText>
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
          accessibilityLabel={labels.lbl_storelanding_favStore}
          accessibilityRole="image"
        />
        <FavStoreText>{labels.lbl_storelanding_favStore}</FavStoreText>
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
