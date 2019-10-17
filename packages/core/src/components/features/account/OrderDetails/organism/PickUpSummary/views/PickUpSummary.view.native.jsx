import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, formatPhoneNumber } from '@tcp/core/src/utils/utils';
import { mapHandler } from '@tcp/core/src/utils';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import toTimeString from '@tcp/core/src/utils/formatTime';
import { parseDate } from '@tcp/core/src/utils/parseDate';
import { BodyCopyWithTextTransform } from '@tcp/core/src/components/common/atoms/styledWrapper/styledWrapper.native';
import AnchorWrapper from '../styles/PickUpSummary.style.native';
/**
 * This function component use for return the PickUpSummary
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */
export const PickUpSummary = ({ pickUpStore, ordersLabels }) => {
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
  const openLocationMap = () => {
    const store = {
      basicInfo: { address, coordinates: { lat: '', long: '' } },
    };
    mapHandler(store);
  };
  return (
    <>
      {pickUpStore && (
        <>
          <ViewWithSpacing spacingStyles="margin-top-XS">
            <BodyCopyWithTextTransform
              textTransform="uppercase"
              fontSize="fs14"
              text={basicInfo.storeName}
              fontWeight="extrabold"
              fontFamily="secondary"
            />
            <BodyCopyWithTextTransform
              textTransform="uppercase"
              fontSize="fs14"
              text={address.addressLine1}
              fontWeight="extrabold"
              fontFamily="secondary"
            />
            <BodyCopyWithTextTransform
              textTransform="uppercase"
              fontSize="fs14"
              text={`${address.city}, ${address.state}, ${address.zipCode}`}
              fontWeight="extrabold"
              fontFamily="secondary"
            />
          </ViewWithSpacing>
          {today && (
            <ViewWithSpacing spacingStyles="margin-top-SM">
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontWeight="regular"
                fontSize="fs14"
                spacingStyles="margin-top-XXS"
                text={`${getLabelValue(ordersLabels, 'lbl_orders_openToday')}: ${toTimeString(
                  parseDate(today.openIntervals[0].fromHour)
                )} - ${toTimeString(parseDate(today.openIntervals[0].toHour))}`}
              />
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontWeight="regular"
                fontSize="fs14"
                spacingStyles="margin-top-XXS margin-bottom-XXS"
                text={`${getLabelValue(ordersLabels, 'lbl_orders_phone')}: ${formatPhoneNumber(
                  phone
                )}`}
              />
            </ViewWithSpacing>
          )}
          <AnchorWrapper>
            <Anchor
              fontSizeVariation="large"
              underline
              noLink
              textAlign="left"
              onPress={() => openLocationMap()}
              anchorVariation="primary"
              text={getLabelValue(ordersLabels, 'lbl_orders_getDirections')}
            />
          </AnchorWrapper>
          <ViewWithSpacing spacingStyles="margin-top-MED">
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs14"
              fontWeight="semibold"
              spacingStyles="margin-top-XS margin-bottom-XS"
              text={getLabelValue(ordersLabels, 'lbl_orders_pickupPerson')}
            />
            <BodyCopyWithSpacing
              ontFamily="primary"
              fontWeight="regular"
              fontSize="fs14"
              spacingStyles="margin-top-XXS margin-bottom-XXS"
              text={`${pickUpPrimary.firstName} ${pickUpPrimary.lastName}`}
            />
            {pickUpAlternative && (
              <BodyCopyWithSpacing
                ontFamily="primary"
                fontWeight="regular"
                fontSize="fs14"
                spacingStyles="margin-top-XXS margin-bottom-XXS"
                text={`${pickUpAlternative.firstName} ${pickUpAlternative.lastName}`}
              />
            )}
          </ViewWithSpacing>
        </>
      )}
    </>
  );
};

PickUpSummary.propTypes = {
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_billing: PropTypes.string,
  }),
  pickUpStore: PropTypes.shape({}),
};

PickUpSummary.defaultProps = {
  ordersLabels: {
    lbl_orderDetails_billing: '',
  },
  pickUpStore: {},
};

export default PickUpSummary;
