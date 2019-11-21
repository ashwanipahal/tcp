import React from 'react';
import PropTypes from 'prop-types';
import CONFIRMATION_CONSTANTS from '../../../Confirmation.constants';
import { getDateInformation } from '../../../../../../../utils';
import ConfirmationItemDisplay from '../../ConfirmationItemDisplay';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import internalEndpoints from '../../../../../account/common/internalEndpoints';
import {
  OrderWrapper,
  ConfirmationItemCount,
  ConfirmationType,
  ConfirmationOrderDetailsWrapper,
} from '../styles/ConfirmationOrderNumberDisplay.styles.native';
import { UrlHandler } from '../../../../../../../utils/utils.app';

const { orderPage } = internalEndpoints;

/**
 * @function ConfirmationOrderNumberDisplay
 * @description renders the order number component.
 */
const ConfirmationOrderNumberDisplay = ({ center, isGuest, labels }) => {
  const {
    orderDate,
    orderNumber,
    orderTotal,
    bossMaxDate,
    bossMinDate,
    orderType,
    productsCount,
    encryptedEmailAddress,
  } = center;
  const isBoss = orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOSS;
  const isBopis = orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOPIS;
  const today = getDateInformation('', false);
  const bossStartDate = bossMinDate ? getDateInformation(bossMinDate) : '';
  const bossEndDate = bossMaxDate ? getDateInformation(bossMaxDate) : '';
  const bossDate =
    !!(bossStartDate && bossEndDate) &&
    `${bossStartDate.day}. ${bossStartDate.month} ${bossStartDate.date} - ${bossEndDate.day}. ${
      bossEndDate.month
    } ${bossEndDate.date}`;
  const bopisDate = `${labels.bopisDate} ${today.month} ${today.date}`;
  return (
    <OrderWrapper>
      <ConfirmationItemCount>
        <BodyCopy
          mobilefontFamily="secondary"
          fontSize="fs16"
          fontWeight="black"
          text={`${productsCount} ${productsCount > 1 ? labels.items : labels.item}`}
        />
      </ConfirmationItemCount>
      {isBoss && (
        <ConfirmationType>
          <BodyCopy
            fontSize="fs22"
            mobilefontFamily="secondary"
            fontWeight="extrabold"
            textAlign="center"
            text={bossDate}
          />
        </ConfirmationType>
      )}
      {isBopis && (
        <ConfirmationType>
          <BodyCopy
            fontSize="fs22"
            mobilefontFamily="secondary"
            fontWeight="extrabold"
            textAlign="center"
            text={bopisDate}
          />
        </ConfirmationType>
      )}
      <ConfirmationOrderDetailsWrapper>
        <ConfirmationItemDisplay title={labels.orderNumber} isLink>
          {isGuest ? (
            <Anchor
              underline
              onPress={() => {
                UrlHandler(`${orderNumber}/${encryptedEmailAddress}`);
              }}
              text={orderNumber}
            />
          ) : (
            <Anchor
              underline
              text={orderNumber}
              onPress={() => {
                UrlHandler(`${orderPage.path}/${encryptedEmailAddress}`);
              }}
            />
          )}
        </ConfirmationItemDisplay>

        <ConfirmationItemDisplay title={labels.orderDate}>
          {orderDate.toLocaleDateString(
            CONFIRMATION_CONSTANTS.CONFIRMATION_LOCAL_DATE_FORMATE,
            CONFIRMATION_CONSTANTS.DATE_OPTIONS
          )}
        </ConfirmationItemDisplay>
        {orderTotal && (
          <ConfirmationItemDisplay title={labels.orderTotal} boldFont>
            {`${labels.currencySign} ${orderTotal.toFixed(2)}`}
          </ConfirmationItemDisplay>
        )}
      </ConfirmationOrderDetailsWrapper>
    </OrderWrapper>
  );
};

ConfirmationOrderNumberDisplay.propTypes = {
  center: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
};
ConfirmationOrderNumberDisplay.defaultProps = {
  center: null,
  isGuest: true,
};

export default ConfirmationOrderNumberDisplay;
