/* eslint-disable max-lines */
import React, { PureComponent, Fragment } from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Anchor, BodyCopy, Image, Button } from '@tcp/core/src/components/common/atoms';
import {
  toTimeString,
  getIconPath,
  routeToStoreDetails,
  getSiteId,
  routerPush,
} from '@tcp/core/src/utils';
import { getLabelValue, getLocator } from '@tcp/core/src/utils/utils';
import { parseDate } from '@tcp/core/src/utils/parseDate';
import style, {
  TileHeader,
  TileFooter,
  TileBody,
  FavStore,
} from '../styles/StoreAddressTile.style';
import { listingHeader, listingType, detailsType, propTypes, defaultProps } from './prop-types';

class StoreAddressTile extends PureComponent {
  getIsFavStoreIcon() {
    const { labels } = this.props;
    return (
      <FavStore>
        <Image
          src={getIconPath('star-icon')}
          alt={getLabelValue(labels, 'lbl_storelanding_favStore')}
          title={getLabelValue(labels, 'lbl_storelanding_favStore')}
          className="favorite-store-icon"
        />
        <BodyCopy component="span" fontSize="fs12">
          {getLabelValue(labels, 'lbl_storelanding_favStore')}
        </BodyCopy>
      </FavStore>
    );
  }

  getDetailsTileFooter() {
    const {
      labels,
      locatorGetDirections,
      openStoreDirections,
      variation,
      isFavorite,
      showSetFavorite,
    } = this.props;
    return (
      <Fragment>
        <div>
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            type="button"
            data-locator={locatorGetDirections}
            onClick={openStoreDirections}
          >
            {getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
          </Button>
        </div>
        <div>
          {variation === detailsType && (!isFavorite && showSetFavorite)
            ? this.getFavLink()
            : this.changeFavStoreLink()}
        </div>
      </Fragment>
    );
  }

  getListingTileFooter() {
    const {
      labels,
      isFavorite,
      setFavoriteStore,
      locatorSetFavStore,
      store,
      openStoreDetails,
    } = this.props;
    return (
      <Fragment>
        <div>
          <Anchor
            fontSizeVariation="medium"
            underline
            to={`/${getSiteId()}${routeToStoreDetails(store).url}`}
            handleLinkClick={event => openStoreDetails(event, store)}
            anchorVariation="primary"
            target="_blank"
            className="store-details-link"
            title={getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
            noLink
          >
            {getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
          </Anchor>
        </div>
        <div>
          {isFavorite && this.getIsFavStoreIcon()}
          {!isFavorite && (
            <Button
              onClick={() => setFavoriteStore(store)}
              buttonVariation="fixed-width"
              type="button"
              data-locator={locatorSetFavStore}
            >
              {getLabelValue(labels, 'lbl_storelanding_setfavStore')}
            </Button>
          )}
        </div>
      </Fragment>
    );
  }

  getDetailsTileHeader() {
    const {
      store: {
        basicInfo: { storeName },
      },
      titleClickCb,
      dataLocatorKey,
    } = this.props;
    return (
      <div className="store-details-header">
        {!titleClickCb && <h4 className="store-name store-name--details">{storeName}</h4>}
        {titleClickCb && (
          <button
            className="store-name store-name--details-btn"
            onClick={titleClickCb}
            data-locator={getLocator(`store_${dataLocatorKey}addresslabel`)}
          >
            {storeName}
          </button>
        )}
      </div>
    );
  }

  getListingHeader() {
    const { openStoreDetails, store, labels, openStoreDirections } = this.props;
    const { isGym, basicInfo, distance } = store;
    const { storeName, address, phone } = basicInfo;
    const { addressLine1, city, state, zipCode } = address;
    return (
      <div className="listing-header">
        <div className="heading-left">
          <div className="title">
            <div className="title__one">
              <BodyCopy
                fontSize="fs14"
                component="span"
                color="text.primary"
                fontFamily="secondary"
                fontWeight="semibold"
              >
                {storeName}
              </BodyCopy>
            </div>
            <div className="title__two">
              <BodyCopy
                fontSize="fs12"
                component="span"
                color="text.primary"
                fontFamily="secondary"
              >
                {`(${getLabelValue(
                  labels,
                  'lbl_storelanding_openInterval'
                )} ${this.getStoreHours()})`}
              </BodyCopy>
              <BodyCopy
                fontSize="fs12"
                component="span"
                color="text.primary"
                fontFamily="secondary"
              >
                {`${
                  distance
                    ? `${distance} ${getLabelValue(labels, 'lbl_storelanding_milesAway')}`
                    : ''
                }`}
              </BodyCopy>
              <Anchor
                fontSizeVariation="medium"
                underline
                url={openStoreDirections(store)}
                anchorVariation="primary"
                target="_blank"
                className="store-directions-link"
                title={getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
              >
                {getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
              </Anchor>
            </div>
          </div>
          <div className="address-wrapper">
            <address className="address-details address-details--listing-header">
              <div className="address-inline">
                <BodyCopy fontSize="fs12" component="span" fontFamily="secondary">
                  {`${addressLine1} ${city}, ${state}, ${zipCode} | ${phone}`}
                </BodyCopy>
              </div>
              <div className="address-block">
                {[addressLine1, `${city}, ${state}, ${zipCode}`, phone].map((item, i) => (
                  <BodyCopy
                    key={`${item + i}`}
                    fontSize="fs12"
                    component="span"
                    fontFamily="secondary"
                  >
                    {item}
                    <br />
                  </BodyCopy>
                ))}
              </div>
            </address>
            {isGym && this.getBrandStoreIcon('brand-store--sm')}
          </div>
        </div>
        <div className="heading-right">
          {isGym && this.getBrandStoreIcon('brand-store--lg')}
          <Anchor
            fontSizeVariation="medium"
            underline
            to={`/${getSiteId()}${routeToStoreDetails(store).url}`}
            handleLinkClick={event => openStoreDetails(event, store)}
            anchorVariation="primary"
            target="_blank"
            className="store-details-link"
            title={getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
            noLink
          >
            {getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
          </Anchor>
        </div>
      </div>
    );
  }

  getListingTileHeader() {
    const { storeIndex, store, labels, openStoreDirections } = this.props;
    const { basicInfo, distance } = store;
    const { storeName } = basicInfo;
    const storeHours = this.getStoreHours();

    return (
      <div className="store-listing-header">
        <div className="title-one">
          <BodyCopy
            fontSize="fs14"
            component="span"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="semibold"
            className="store-name store-name--listing"
          >
            {!!storeIndex && `${storeIndex}. `}
            {storeName}
          </BodyCopy>
        </div>
        <div className="title-two">
          {storeHours && (
            <BodyCopy fontSize="fs12" component="span" color="text.primary" fontFamily="secondary">
              {`(${getLabelValue(labels, 'lbl_storelanding_openInterval')} ${storeHours})`}
            </BodyCopy>
          )}
          <BodyCopy fontSize="fs12" component="span" color="text.primary" fontFamily="secondary">
            {`${distance} ${getLabelValue(labels, 'lbl_storelanding_milesAway')}`}
          </BodyCopy>
          <Anchor
            fontSizeVariation="medium"
            underline
            url={openStoreDirections(store)}
            anchorVariation="primary"
            target="_blank"
            className="store-directions-link"
            title={getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
          >
            {getLabelValue(labels, 'lbl_storelanding_getdirections_link')}
          </Anchor>
        </div>
      </div>
    );
  }

  getStoreType() {
    const {
      store: { features },
    } = this.props;
    const { storeType } = features;
    return (
      <BodyCopy
        fontSize="fs12"
        component="div"
        color="text.primary"
        fontFamily="secondary"
        className="store-type"
      >
        <Image
          className="store-type__marker"
          src={getIconPath('marker-icon')}
          alt={storeType}
          title={storeType}
        />
        <BodyCopy className="store-type__text" component="span">
          {storeType}
        </BodyCopy>
      </BodyCopy>
    );
  }

  getBrandStoreIcon(cls = '') {
    const { labels, dataLocatorKey } = this.props;
    return (
      <BodyCopy
        fontSize="fs12"
        component="div"
        color="text.primary"
        fontFamily="secondary"
        className={`brand-store ${cls}`}
        dataLocator={getLocator(`store_${dataLocatorKey}gymboreetstorelabel`)}
      >
        <Image
          src={getIconPath('gymboree-icon')}
          alt="Gymboree"
          title="Gymboree Store"
          className="brand-store__image"
        />
        <BodyCopy className="brand-store__text" component="span">
          {getLabelValue(labels, 'lbl_storelanding_atThisPlace')}
        </BodyCopy>
      </BodyCopy>
    );
  }

  getFavLink() {
    const { labels, setFavoriteStore, store, locatorSetFavStore } = this.props;
    return (
      <Button
        buttonVariation="fixed-width"
        type="button"
        data-locator={locatorSetFavStore}
        onClick={() => {
          setFavoriteStore(store);
        }}
        title={getLabelValue(labels, 'lbl_storelanding_storedetails_link')}
      >
        {getLabelValue(labels, 'lbl_storelanding_setfavStore')}
      </Button>
    );
  }

  getStoreAddress() {
    const { store, variation, isFavorite } = this.props;
    const { address, phone } = store.basicInfo;
    const { addressLine1, city, state, zipCode } = address;

    return (
      <div className="address-wrapper">
        <BodyCopy
          fontSize="fs12"
          component="address"
          color="text.primary"
          fontFamily="secondary"
          className="address-details"
        >
          {[addressLine1, `${city}, ${state}, ${zipCode}`, phone].map((item, i) => (
            <BodyCopy key={`${item + i}`} fontSize="fs12" component="span" fontFamily="secondary">
              {item}
              <br />
            </BodyCopy>
          ))}
        </BodyCopy>
        <div className="address-meta">
          <div className="address-meta__left">
            {variation === detailsType && store.features && this.getStoreType()}
            {store.isGym ? this.getBrandStoreIcon() : <div className="brand-store" />}
          </div>
          <div className="address-meta__right">
            {variation === detailsType && isFavorite && this.getIsFavStoreIcon()}
          </div>
        </div>
      </div>
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

  changeFavStoreLink() {
    const { labels } = this.props;
    const btnLabel = getLabelValue(labels, 'lbl_storedetails_changestore_btn');

    return (
      <Button
        buttonVariation="fixed-width"
        type="button"
        onClick={() => {
          routerPush('/store-locator', '/store-locator');
        }}
        title={btnLabel && btnLabel.toUpperCase()}
      >
        {btnLabel && btnLabel.toUpperCase()}
      </Button>
    );
  }

  render() {
    const { className, children, variation, store, ...rest } = this.props;
    return (
      <div className={`address-tile ${className}`}>
        {variation === listingHeader && this.getListingHeader()}
        {variation !== listingHeader && (
          <Fragment>
            <TileHeader className="tile-header" variation={variation} {...rest}>
              {variation === detailsType && this.getDetailsTileHeader()}
              {variation === listingType && this.getListingTileHeader()}
            </TileHeader>
            <TileBody className="tile-body" variation={variation} {...rest}>
              {this.getStoreAddress()}
              {children}
            </TileBody>
            <TileFooter className="tile-footer" variation={variation} store={store} {...rest}>
              {variation === detailsType && this.getDetailsTileFooter()}
              {variation === listingType && this.getListingTileFooter(store)}
            </TileFooter>
          </Fragment>
        )}
      </div>
    );
  }
}

StoreAddressTile.propTypes = propTypes;

StoreAddressTile.defaultProps = defaultProps;

export default withStyles(StoreAddressTile, style);
