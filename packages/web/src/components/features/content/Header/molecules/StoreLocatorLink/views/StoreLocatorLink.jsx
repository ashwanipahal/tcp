import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLabelValue, getLocator, getStoreHours } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/StoreLocatorLink.style';
import ClickTracker from '../../../../../../common/atoms/ClickTracker';

const StoreLocatorLink = ({ className, labels, store }) => {
  const basicInfo = store && store.basicInfo;
  const currentDate = new Date();
  const hours = store && store.hours;
  const storeTime = hours && getStoreHours(hours, labels, currentDate);
  const isInfoPresent = basicInfo && basicInfo.storeName && storeTime;

  return (
    <React.Fragment>
      <ClickTracker
        as={Anchor}
        dataLocator={getLocator('store_drawerlink')}
        fontSizeVariation="small"
        anchorVariation="primary"
        to="/store-locator"
        className={className}
        clickData={{ customEvents: ['event80'] }}
      >
        <div className={`storelocatorlink__container${!isInfoPresent ? '--fav' : ''}`}>
          <div className="storelocatorlink__img">
            <Image
              src={getIconPath('map-marker-icon')}
              alt="Store Locator"
              className="storelocator--image"
              data-locator={getLocator('store_markericon')}
            />
          </div>
          {isInfoPresent ? (
            <div className="storelocatorlink__detail">
              <BodyCopy
                component="div"
                data-locator={getLocator('store_namelabel')}
                fontFamily="secondary"
                fontSize="fs13"
                className="storelocatorlink__detail__storename"
              >
                {basicInfo.storeName}
              </BodyCopy>
              <BodyCopy
                component="div"
                data-locator={getLocator('store_storetime')}
                fontFamily="secondary"
                fontSize="fs10"
                className="storelocatorlink__detail__storetime"
              >
                {storeTime}
              </BodyCopy>
            </div>
          ) : (
            <BodyCopy
              component="div"
              data-locator={getLocator('store_findastore')}
              fontFamily="secondary"
              fontSize="fs13"
              className="storelocatorlink__detail"
            >
              <div className="store-welcome-txt">
                {getLabelValue(labels, 'lbl_storelocator_welcomeTxt')}
              </div>
              {getLabelValue(labels, 'lbl_storelocator_findAStoreLink')}
            </BodyCopy>
          )}
        </div>
      </ClickTracker>
    </React.Fragment>
  );
};

StoreLocatorLink.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({
    basicInfo: PropTypes.shape({}),
    hours: PropTypes.shape({
      regularHours: PropTypes.shape([]),
      regularAndHolidayHours: PropTypes.shape([]),
      holidayHours: PropTypes.shape([]),
    }),
    features: PropTypes.shape({}),
  }),
};

StoreLocatorLink.defaultProps = {
  store: {
    basicInfo: {
      id: '',
      storeName: '',
      phone: '',
      coordinates: {},
      address: {},
    },
    hours: {
      regularHours: [],
      regularAndHolidayHours: [],
      holidayHours: [],
    },
  },
};

export default withStyles(StoreLocatorLink, style);

export { StoreLocatorLink as StoreLocatorLinkVanilla };
