import React from 'react';
import PropTypes from 'prop-types';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import CONFIRMATION_CONSTANTS from '../../../Confirmation.constants';
import IconInfoLogo from '../../../../../../../assets/info-icon.png';
import { Image, BodyCopy } from '../../../../../../common/atoms';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../../common/atoms/Icon/Icon.constants';
import {
  CustomIconWrapper,
  LabelContainer,
  IconContainer,
  LocationContainer,
  AnchorWrapper,
  AddressHeaderWrapper,
  italicStyle,
  LocationContainerWrapper,
} from '../styles/ConfirmationItemTitleDisplay.styles.native';

import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';

/**
 * @function getAddress
 * @description returns the react tool tip data.
 */

const getAddressHeader = (label, text) => {
  return (
    <AddressHeaderWrapper>
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs14"
        textAlign="center"
        style={italicStyle}
        text={`${label}`}
      />
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs14"
        textAlign="center"
        text={`${text}\n`}
      />
    </AddressHeaderWrapper>
  );
};
const getAddress = (address, labels, todayOpenRange, tomorrowOpenRange, phoneNumber) => {
  return address ? (
    <>
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs14"
        textAlign="center"
        text={`${address.addressLine1}\n`}
      />
      {address.addressLine2 && (
        <BodyCopy
          mobilefontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          text={`${address.addressLine2}\n`}
        />
      )}
      <BodyCopy
        mobilefontFamily="secondary"
        fontSize="fs14"
        textAlign="center"
        text={`${address.city}, ${address.state} ${address.zipCode} \n\n`}
      />
      {getAddressHeader(labels.today, todayOpenRange)}
      {getAddressHeader(labels.tomorrow, tomorrowOpenRange)}
      {getAddressHeader(labels.phone, phoneNumber)}
    </>
  ) : null;
};

const popover = message => {
  return (
    <BodyCopy
      fontSize="fs13"
      mobilefontFamily="secondary"
      fontWeight="semibold"
      color="gray.900"
      text={message}
    />
  );
};

/**
 * @function ConfirmationItemTitleDisplay
 * @description renders the order tile component.
 */
const ConfirmationItemTitleDisplay = ({ center, labels }) => {
  if (center) {
    const {
      storeName,
      storeLink,
      address,
      shippingFullname,
      todayOpenRange,
      tomorrowOpenRange,
      phoneNumber,
      orderType,
    } = center;
    let locationStr = '';
    if (shippingFullname) {
      locationStr = (
        <>
          <BodyCopyWithSpacing
            fontSize="fs18"
            mobilefontFamily="secondary"
            textAlign="center"
            fontWeight="semibold"
            text={`${labels.shippingTo} `}
            spacingStyles="margin-right-MED"
          />

          <BodyCopyWithSpacing
            spacingStyles="margin-left-MED"
            fontSize="fs18"
            fontWeight="extrabold"
            text={shippingFullname}
          />
        </>
      );
    } else {
      locationStr = (
        <BodyCopy
          fontSize="fs18"
          mobilefontFamily="secondary"
          fontWeight="semibold"
          textAlign="center"
          text={labels.pickupAt}
        />
      );
    }
    const infoMsg = getAddress(address, labels, todayOpenRange, tomorrowOpenRange, phoneNumber);
    return (
      <ViewWithSpacing spacingStyles="margin-top-XXL margin-bottom-SM">
        {(orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOSS ||
          orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOPIS) && (
          <CustomIconWrapper>
            <CustomIcon
              iconFontName={ICON_FONT_CLASS.Icomoon}
              name={ICON_NAME.markerIcon}
              size="fs40"
              color="gray.900"
              dataLocator="pdp_fast_pickup_icon"
            />
          </CustomIconWrapper>
        )}
        {(orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.ECOM || shippingFullname) && (
          <CustomIconWrapper>
            <CustomIcon
              iconFontName={ICON_FONT_CLASS.Icomoon}
              name={ICON_NAME.fastShipping}
              size="fs40"
              color="gray.900"
              dataLocator="pdp_fast_shipping_icon"
            />
          </CustomIconWrapper>
        )}
        <LabelContainer>
          <LocationContainerWrapper>
            <LocationContainer>
              <BodyCopy
                fontSize="fs22"
                mobilefontFamily="secondary"
                fontWeight="semibold"
                textAlign="center"
                text={locationStr}
              />

              {storeName && storeLink && (
                <AnchorWrapper title={storeName} text={storeName} url={storeLink.asPath} />
              )}
            </LocationContainer>
          </LocationContainerWrapper>
          {storeName && (
            <IconContainer>
              <ReactTooltip withOverlay={false} popover={popover(infoMsg)} height={150}>
                <Image source={IconInfoLogo} height={20} width={20} />
              </ReactTooltip>
            </IconContainer>
          )}
        </LabelContainer>
      </ViewWithSpacing>
    );
  }
  return null;
};

ConfirmationItemTitleDisplay.propTypes = {
  center: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
};
ConfirmationItemTitleDisplay.defaultProps = {
  center: null,
};

export default ConfirmationItemTitleDisplay;
