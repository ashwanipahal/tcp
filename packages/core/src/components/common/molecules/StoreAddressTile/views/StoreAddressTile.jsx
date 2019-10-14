/* eslint-disable max-lines */
import React, { PureComponent, Fragment } from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Anchor, BodyCopy, Image, Button } from '@tcp/core/src/components/common/atoms';
import { getIconPath, routeToStoreDetails, getSiteId } from '@tcp/core/src/utils';
import { getLabelValue, getLocator, getStoreHours } from '@tcp/core/src/utils/utils';
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
        <div className="tile-footer__fullwidth">
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
        <div className="tile-footer__fullwidth">
          {variation === detailsType && (!isFavorite && showSetFavorite) && this.getFavLink()}
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
    const {
      openStoreDetails,
      store,
      labels,
      openStoreDirections,
      geoLocationDisabled,
    } = this.props;
    const { isGym, basicInfo, distance, hours } = store;
    const { storeName, address, phone } = basicInfo;
    const { addressLine1, city, state, zipCode } = address;
    const currentDate = new Date();
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
                {getStoreHours(hours, labels, currentDate)}
              </BodyCopy>
              {!geoLocationDisabled && (
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
              )}
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
    const {
      storeIndex,
      store,
      labels,
      openStoreDirections,
      titleClickCb,
      geoLocationDisabled,
    } = this.props;
    const { basicInfo, distance, hours } = store;
    const { storeName, id } = basicInfo;
    const currentDate = new Date();
    const storeHours = getStoreHours(hours, labels, currentDate);

    return (
      <div className="store-listing-header">
        <div className="title-one">
          <BodyCopy
            fontSize="fs14"
            component={titleClickCb ? Anchor : 'span'}
            color="text.primary"
            fontFamily="secondary"
            fontWeight="semibold"
            className="store-name store-name--listing"
            handleLinkClick={e => titleClickCb(e, id)}
            noLink
          >
            {!!storeIndex && `${storeIndex}. `}
            {storeName}
          </BodyCopy>
        </div>
        <div className="title-two">
          {storeHours && (
            <BodyCopy fontSize="fs12" component="span" color="text.primary" fontFamily="secondary">
              {storeHours}
            </BodyCopy>
          )}
          {!geoLocationDisabled && (
            <BodyCopy fontSize="fs12" component="span" color="text.primary" fontFamily="secondary">
              {`${
                distance ? `${distance} ${getLabelValue(labels, 'lbl_storelanding_milesAway')}` : ''
              }`}
            </BodyCopy>
          )}
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
    const addressMetaClassName = variation === listingType && !store.isGym ? '__nodisplay' : '';

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
        <div className={`address-meta${addressMetaClassName}`}>
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
