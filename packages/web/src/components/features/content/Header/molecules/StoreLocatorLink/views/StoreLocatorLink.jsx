import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath, toTimeString } from '@tcp/core/src/utils';
import { parseDate, compareDate } from '@tcp/core/src/utils/parseDate';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/StoreLocatorLink.style';

const getStoreHours = store => {
  const hours = store && store.hours;
  const storeHours = hours && [
    ...hours.regularAndHolidayHours,
    ...hours.regularHours,
    ...hours.holidayHours,
  ];
  const todaysDate = new Date();
  let storeTime = '';
  /* eslint-disable no-unused-expressions */
  storeHours &&
    storeHours.forEach(hour => {
      const openInterval =
        hour &&
        hour.openIntervals.length > 0 &&
        hour.openIntervals[hour.openIntervals.length - 1].toHour;
      if (compareDate(todaysDate, parseDate(openInterval))) {
        storeTime = toTimeString(parseDate(openInterval), true);
      }
    });
  return storeTime;
};

const StoreLocatorLink = ({ className, labels, store }) => {
  const basicInfo = store && store.basicInfo;
  const storeTime = getStoreHours(store);
  const isInfoPresent = basicInfo && basicInfo.storeName && storeTime;

  return (
    <React.Fragment>
      <Anchor
        dataLocator=""
        fontSizeVariation="small"
        anchorVariation="primary"
        to={labels.storelocatorlink}
        className={className}
      >
        <div className={`storelocatorlink__container${!isInfoPresent ? '--fav' : ''}`}>
          <div className="storelocatorlink__img">
            <Image
              src={getIconPath('map-marker-icon')}
              alt="Store Locator"
              className="storelocator--image"
            />
          </div>
          {isInfoPresent ? (
            <div className="storelocatorlink__detail">
              <BodyCopy
                component="div"
                data-locator=""
                fontFamily="secondary"
                fontSize="fs13"
                className="storelocatorlink__detail__storename"
              >
                {basicInfo.storeName}
              </BodyCopy>
              <BodyCopy
                component="div"
                data-locator=""
                fontFamily="secondary"
                fontSize="fs10"
                className="storelocatorlink__detail__storetime"
              >
                {storeTime ? `${labels.openUntilTxt} ${storeTime}` : ''}
              </BodyCopy>
            </div>
          ) : (
            <BodyCopy
              component="div"
              data-locator=""
              fontFamily="secondary"
              fontSize="fs13"
              className="storelocatorlink__detail"
            >
              {labels.findAStoreLink}
            </BodyCopy>
          )}
        </div>
      </Anchor>
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
