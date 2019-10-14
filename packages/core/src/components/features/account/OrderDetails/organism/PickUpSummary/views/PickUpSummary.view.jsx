import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, formatPhoneNumber } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import toTimeString from '@tcp/core/src/utils/formatTime';
import { parseDate } from '@tcp/core/src/utils/parseDate';
import googleMapConstants from '@tcp/core/src/constants/googleMap.constants';

import styles from '../styles/PickUpSummary.style';
/**
 * This function component use for return the PickUpSummary
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const PickUpSummary = ({ className, pickUpStore, ordersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { basicInfo, pickUpPrimary, pickUpAlternative, hours } = pickUpStore;
  const { address, phone } = basicInfo;
  let today;
  if (hours) {
    const now = new Date();
    today = hours.regularHours.find(day => {
      const openingHour = parseDate(day.openIntervals[0].fromHour);
      return now.getDay() === openingHour.getDay();
    });
  }

  const getDirections = () => {
    const { addressLine1, city, state, zipCode } = address;
    return window.open(
      `${googleMapConstants.OPEN_STORE_DIR_WEB}${addressLine1},%20${city},%20${state},%20${zipCode}`
    );
  };
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy
        className="capitalise"
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
      >
        {basicInfo.storeName}
      </BodyCopy>

      <BodyCopy
        className="capitalise"
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
      >
        {address.addressLine1}
      </BodyCopy>

      <BodyCopy
        className="capitalise"
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
      >
        {`${address.city}, ${address.state}, ${address.zipCode}`}
      </BodyCopy>
      <BodyCopy className="margin-wrapper" component="div">
        <BodyCopy fontSize="fs14" fontFamily="secondary">
          {`${getLabelValue(ordersLabels, 'lbl_orders_openToday')}: ${toTimeString(
            parseDate(today.openIntervals[0].fromHour)
          )} - ${toTimeString(parseDate(today.openIntervals[0].toHour))}`}
        </BodyCopy>
        <BodyCopy fontSize="fs14" fontFamily="secondary">
          {`${getLabelValue(ordersLabels, 'lbl_orders_phone')}: ${formatPhoneNumber(phone)}`}
        </BodyCopy>
      </BodyCopy>
      <Anchor
        fontSizeVariation="large"
        underline
        anchorVariation="primary"
        fontFamily="secondary"
        onClick={() => getDirections()}
        className="margin-wrapper"
      >
        {getLabelValue(ordersLabels, 'lbl_orders_getDirections')}
      </Anchor>

      <BodyCopy
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
        className="margin-wrapper"
      >
        {getLabelValue(ordersLabels, 'lbl_orders_pickupPerson')}
      </BodyCopy>
      <BodyCopy fontSize="fs14" fontFamily="secondary">
        {`${pickUpPrimary.firstName} ${pickUpPrimary.lastName}`}
      </BodyCopy>
      {pickUpAlternative && (
        <BodyCopy fontSize="fs14" fontFamily="secondary">
          {`${pickUpAlternative.firstName} ${pickUpAlternative.lastName}`}
        </BodyCopy>
      )}
    </BodyCopy>
  );
};
PickUpSummary.propTypes = {
  className: PropTypes.string,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_billing: PropTypes.string,
  }),
  pickUpStore: PropTypes.shape({}),
};

PickUpSummary.defaultProps = {
  className: '',
  ordersLabels: {
    lbl_orderDetails_billing: '',
  },
  pickUpStore: {},
};

export default withStyles(PickUpSummary, styles);
