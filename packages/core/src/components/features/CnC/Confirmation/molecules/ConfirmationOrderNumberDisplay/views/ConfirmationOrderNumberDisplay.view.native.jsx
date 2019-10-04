import React from 'react';
import PropTypes from 'prop-types';
import CONFIRMATION_CONSTANTS from '../../../Confirmation.constants';
import { getDateInformation } from '../../../../../../../utils';
import ConfirmationItemDisplay from '../../ConfirmationItemDisplay';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { ROUTE_PATH } from '../../../../../../../config/route.config';
import internalEndpoints from '../../../../../account/common/internalEndpoints';

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
    `${bossStartDate.day}. ${bossStartDate.month}
   ${bossStartDate.date} - ${bossEndDate.day}. ${bossEndDate.month} ${bossEndDate.date}`;
  const bopisDate = `${labels.bopisDate} ${today.month} ${today.date}`;
  return (
    <>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="black"
        className="confirmation-item-count"
        text={`${productsCount} ${productsCount > 1 ? labels.items : labels.item}`}
      />

      {isBoss && (
        <BodyCopy
          fontSize="fs22"
          fontFamily="secondary"
          fontWeight="extrabold"
          className="confirmation-fullfillment-type"
          textAlign="center"
          text={bossDate}
        />
      )}
      {isBopis && (
        <BodyCopy
          fontSize="fs22"
          fontFamily="secondary"
          fontWeight="extrabold"
          className="confirmation-fullfillment-type"
          textAlign="center"
          text={bopisDate}
        />
      )}
      <>
        <ConfirmationItemDisplay title={labels.orderNumber}>
          {isGuest ? (
            <Anchor
              underline
              url={ROUTE_PATH.guestOrderDetails({
                pathSuffix: `${orderNumber}/${encryptedEmailAddress}`,
              })}
            >
              {orderNumber}
            </Anchor>
          ) : (
            <Anchor underline to={orderPage.link} asPath={`${orderPage.path}/${orderNumber}`}>
              {orderNumber}
            </Anchor>
          )}
        </ConfirmationItemDisplay>
        <ConfirmationItemDisplay title={labels.orderDate}>
          {orderDate.toLocaleDateString('en-US', CONFIRMATION_CONSTANTS.DATE_OPTIONS)}
        </ConfirmationItemDisplay>
        {orderTotal && (
          <ConfirmationItemDisplay title={labels.orderTotal} boldFont>
            {`${labels.currencySign} ${orderTotal.toFixed(2)}`}
          </ConfirmationItemDisplay>
        )}
      </>
    </>
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
