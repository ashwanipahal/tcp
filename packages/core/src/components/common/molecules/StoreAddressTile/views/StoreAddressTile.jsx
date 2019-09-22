import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Anchor, BodyCopy, Image, Button } from '@tcp/core/src/components/common/atoms';
import { toTimeString, getIconPath } from '@tcp/core/src/utils';
import { parseDate } from '@tcp/core/src/utils/parseDate';
import style, {
  TileHeader,
  TileFooter,
  TileBody,
  FavStore,
} from '../styles/StoreAddressTile.style';

const listingHeader = 'listing-header';
const listingType = 'listing';
const detailsType = 'detail';

class StoreAddressTile extends PureComponent {
  static getIsFavStoreIcon(props) {
    const { labels } = props;
    return (
      <FavStore>
        <Image
          src={getIconPath('star-icon')}
          alt={labels.lbl_storelocators_landingpage_favStore}
          title={labels.lbl_storelocators_landingpage_favStore}
          className="favorite-store-icon"
        />
        <BodyCopy component="span" fontSize="fs12">
          {labels.lbl_storelocators_landingpage_favStore}
        </BodyCopy>
      </FavStore>
    );
  }

  static getDetailsTileFooter({ labels }) {
    return (
      <div>
        <Button
          buttonVariation="fixed-width"
          fill="BLUE"
          type="button"
          data-locator="get-store-directions"
        >
          {labels.lbl_storelocators_landingpage_getdirections_link}
        </Button>
      </div>
    );
  }

  static getListingTileFooter(props) {
    const { labels, openStoreDetail, isFavorite } = props;
    return (
      <Fragment>
        <div>
          <Anchor
            fontSizeVariation="medium"
            underline
            handleLinkClick={openStoreDetail}
            anchorVariation="primary"
            target="_blank"
            className="store-details-link"
            title={labels.lbl_storelocators_landingpage_storedetails_link}
          >
            {labels.lbl_storelocators_landingpage_storedetails_link}
          </Anchor>
        </div>
        <div>
          {isFavorite && this.getIsFavStoreIcon(props)}
          {!isFavorite && (
            <Button buttonVariation="fixed-width" type="button" data-locator="set-favorite-store">
              {labels.lbl_storelocators_landingpage_setfavStore}
            </Button>
          )}
        </div>
      </Fragment>
    );
  }

  static getDetailsTileHeader(props) {
    const {
      store: { basicInfo },
    } = props;
    const { storeName } = basicInfo;
    return (
      <div className="store-details-header">
        <h4 className="store-name store-name--details">{storeName}</h4>
      </div>
    );
  }

  static getListingHeader(props) {
    const {
      storeIndex,
      openStoreDetail,
      store: { isGym, basicInfo, distance },
      labels,
      openStoreDirections,
    } = props;
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
                {storeIndex && `${storeIndex}.`}
                {storeName}
              </BodyCopy>
              <BodyCopy
                fontSize="fs12"
                component="span"
                color="text.primary"
                fontFamily="secondary"
              >
                {`(${labels.lbl_storelocators_landingpage_openInterval} ${this.getStoreHours(
                  props
                )})`}
              </BodyCopy>
            </div>
            <div className="title__two">
              <BodyCopy
                fontSize="fs12"
                component="span"
                color="text.primary"
                fontFamily="secondary"
              >
                {`${distance} ${labels.lbl_storelocators_landingpage_milesAway}`}
              </BodyCopy>
              <Anchor
                fontSizeVariation="medium"
                underline
                handleLinkClick={openStoreDirections}
                anchorVariation="primary"
                target="_blank"
                className="store-directions-link"
                title={labels.lbl_storelocators_landingpage_getdirections_link}
              >
                {labels.lbl_storelocators_landingpage_getdirections_link}
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
            {isGym && this.getBrandStoreIcon(props, 'brand-store--listing-header')}
          </div>
        </div>
        <div className="heading-right">
          {isGym && this.getBrandStoreIcon(props)}
          <Anchor
            fontSizeVariation="medium"
            underline
            handleLinkClick={openStoreDetail}
            anchorVariation="primary"
            target="_blank"
            className="store-details-link"
            title={labels.lbl_storelocators_landingpage_storedetails_link}
          >
            {labels.lbl_storelocators_landingpage_storedetails_link}
          </Anchor>
        </div>
      </div>
    );
  }

  static getListingTileHeader(props) {
    const {
      storeIndex,
      store: { basicInfo, distance },
      labels,
      openStoreDirections,
    } = props;
    const { storeName } = basicInfo;

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
            {storeIndex && `${storeIndex}. `}
            {storeName}
          </BodyCopy>
          <BodyCopy fontSize="fs12" component="span" color="text.primary" fontFamily="secondary">
            {`(${labels.lbl_storelocators_landingpage_openInterval} ${this.getStoreHours(props)})`}
          </BodyCopy>
        </div>
        <div className="title-two">
          <BodyCopy fontSize="fs12" component="span" color="text.primary" fontFamily="secondary">
            {`${distance} ${labels.lbl_storelocators_landingpage_milesAway}`}
          </BodyCopy>
          <Anchor
            fontSizeVariation="medium"
            underline
            handleLinkClick={openStoreDirections}
            anchorVariation="primary"
            target="_blank"
            className="store-directions-link"
            title={labels.lbl_storelocators_landingpage_getdirections_link}
          >
            {labels.lbl_storelocators_landingpage_getdirections_link}
          </Anchor>
        </div>
      </div>
    );
  }

  static getStoreType(props) {
    const { features } = props;
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

  static getBrandStoreIcon(props) {
    const { labels } = props;
    return (
      <BodyCopy
        fontSize="fs12"
        component="div"
        color="text.primary"
        fontFamily="secondary"
        className="brand-store"
      >
        <Image
          src={getIconPath('gymboree-icon')}
          alt="Gymboree"
          title="Gymboree Store"
          className="brand-store__image"
        />
        <BodyCopy className="brand-store__text" component="span">
          {labels.lbl_storelocators_common_atThisPlace}
        </BodyCopy>
      </BodyCopy>
    );
  }

  static getStoreAddress(props) {
    const { store, variation, isFavorite } = props;
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
            {variation === detailsType && this.getStoreType(store)}
            {store.isGym ? this.getBrandStoreIcon(props) : <div className="brand-store" />}
          </div>
          <div className="address-meta__right">
            {variation === detailsType && isFavorite && this.getIsFavStoreIcon(props)}
          </div>
        </div>
      </div>
    );
  }

  static getStoreHours(props) {
    const {
      store: { hours },
    } = props;
    const todaysDate = new Date();
    const { regularHours, holidayHours, regularAndHolidayHours } = hours;
    const selectedInterval = [...regularHours, ...holidayHours, ...regularAndHolidayHours].filter(
      hour => {
        const toInterval = hour.openIntervals[0] && hour.openIntervals[0].toHour;
        return (
          parseDate(toInterval).getDate() === todaysDate.getDate() &&
          parseDate(toInterval).getMonth() === todaysDate.getMonth() &&
          parseDate(toInterval).getFullYear() === todaysDate.getFullYear()
        );
      }
    );
    return toTimeString(parseDate(selectedInterval[0].openIntervals[0].toHour), true);
  }

  render() {
    const { className, children, variation } = this.props;
    return (
      <div className={className}>
        {variation === listingHeader && this.constructor.getListingHeader(this.props)}
        {variation !== listingHeader && (
          <Fragment>
            <TileHeader {...this.props} className="tile-header">
              {variation === detailsType && this.constructor.getDetailsTileHeader(this.props)}
              {variation === listingType && this.constructor.getListingTileHeader(this.props)}
            </TileHeader>
            <TileBody {...this.props} className="tile-body">
              {this.constructor.getStoreAddress(this.props)}
              {children}
            </TileBody>
            <TileFooter {...this.props} className="tile-footer">
              {variation === detailsType && this.constructor.getDetailsTileFooter(this.props)}
              {variation === listingType && this.constructor.getListingTileFooter(this.props)}
            </TileFooter>
          </Fragment>
        )}
      </div>
    );
  }
}

StoreAddressTile.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  variation: PropTypes.oneOf([listingType, detailsType, listingHeader]),
  labels: PropTypes.shape({
    lbl_storelocators_landingpage_storedetails_link: PropTypes.string,
    lbl_storelocators_landingpage_getdirections_link: PropTypes.string,
    lbl_storelocators_landingpage_setfavStore: PropTypes.string,
    lbl_storelocators_landingpage_favStore: PropTypes.string,
    lbl_storelocators_common_atThisPlace: PropTypes.string,
    lbl_storelocators_landingpage_openInterval: PropTypes.string,
    lbl_storelocators_landingpage_milesAway: PropTypes.string,
  }).isRequired,
  store: PropTypes.shape({
    basicInfo: PropTypes.shape({
      address: PropTypes.shape({
        addressLine1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zipCode: PropTypes.string,
      }),
      phone: PropTypes.string,
      storeName: PropTypes.string,
      coordinates: PropTypes.shape({
        lat: PropTypes.number,
        long: PropTypes.number,
      }),
    }),
    hours: PropTypes.shape({}),
    distance: PropTypes.string,
    features: PropTypes.shape({
      storeType: PropTypes.string,
    }),
    isGym: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool,
  index: PropTypes.number,
  isListingHeader: PropTypes.bool,
};

StoreAddressTile.defaultProps = {
  children: null,
  variation: detailsType,
  isFavorite: false,
  index: null,
  isListingHeader: false,
};

export default withStyles(StoreAddressTile, style);
