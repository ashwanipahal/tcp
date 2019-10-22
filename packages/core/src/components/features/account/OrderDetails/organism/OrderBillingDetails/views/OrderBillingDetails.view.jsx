import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image, Row, Col } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, getIconPath } from '@tcp/core/src/utils/utils';
import Address from '@tcp/core/src/components/common/molecules/Address';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OrderBillingDetails.style';
import cardIconMapping from '../OrderBillingDetails.constants';

/**
 * This function component use for return the OrderBillingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const OrderBillingDetails = ({ className, orderDetailsData, ordersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { checkout, appliedGiftCards } = orderDetailsData;
  const { billing } = checkout;
  const { card } = billing;

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        {getLabelValue(ordersLabels, 'lbl_orderDetails_billing')}
      </BodyCopy>
      {card.cardType && (
        <BodyCopy component="div">
          <Row fullBleed className="elem-mb-XS">
            <Col className="card-details" colSize={{ large: 12, medium: 4, small: 3 }}>
              <Image
                src={getIconPath(cardIconMapping[card.cardType.toUpperCase()])}
                className="elem-mr-XS card-border"
              />
              <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="extrabold">
                {card.cardType.toUpperCase() !== cardIconMapping.VENMO
                  ? `${getLabelValue(ordersLabels, 'lbl_orders_ending')} ${card.endingNumbers.slice(
                      -4
                    )}`
                  : card.endingNumbers}
              </BodyCopy>
            </Col>

            {appliedGiftCards &&
              appliedGiftCards.length > 0 &&
              appliedGiftCards.map(giftCard => {
                return (
                  <Col className="card-details" colSize={{ large: 12, medium: 4, small: 3 }}>
                    <Image
                      src={getIconPath(cardIconMapping[giftCard.cardType.toUpperCase()])}
                      className="elem-mr-XS"
                    />
                    <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="extrabold">
                      {`${getLabelValue(
                        ordersLabels,
                        'lbl_orders_ending'
                      )} ${giftCard.endingNumbers.slice(-4)}`}
                    </BodyCopy>
                  </Col>
                );
              })}
          </Row>
        </BodyCopy>
      )}
      <BodyCopy component="div" fontSize="fs14" fontFamily="secondary">
        <Address address={billing.billingAddress} showCountry={false} showPhone={false} />
      </BodyCopy>
    </BodyCopy>
  );
};
OrderBillingDetails.propTypes = {
  className: PropTypes.string,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_billing: PropTypes.string,
  }),
  orderDetailsData: PropTypes.shape({}),
};

OrderBillingDetails.defaultProps = {
  className: '',
  ordersLabels: {
    lbl_orderDetails_billing: '',
  },
  orderDetailsData: {},
};

export default withStyles(OrderBillingDetails, styles);
export { OrderBillingDetails as OrderBillingDetailsVanilla };
