import React from 'react';
import PropTypes from 'prop-types';
import ThankYouTitleDisplay from '../../../molecules/ThankYouTitleDisplay';
import ConfirmationFulfillmentCenterItemDisplay from '../../ConfirmationFulfillmentCenterItemDisplay';
import styles from '../styles/ThankYouComponent.styles';
import withStyles from '../../../../../../common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import RichText from '../../../../../../common/atoms/RichText';

/**
 * @function ThankYouComponent
 * @description wrapper for thank you component.
 */
const ThankYouComponent = ({
  isBossInList,
  orderNumbersByFullfillmentCenter,
  updateOrderDetailsData,
  fullfillmentCenterData,
  isGuest,
  emailAddress,
  isOrderPending,
  isShowShippingMessage,
  isShowBopisMessage,
  isShowMixedMessage,
  labels,
  className,
}) => {
  return (
    <div className={className}>
      <ThankYouTitleDisplay
        emailAddress={emailAddress}
        isOrderPending={isOrderPending}
        isShowShippingMessage={isShowShippingMessage}
        isShowBopisMessage={isShowBopisMessage}
        isShowMixedMessage={isShowMixedMessage}
        labels={labels}
      />
      {/* Shipping only and mixed orders are handled from one component */}
      <Row className="confirmation-fullfillment-center variable-width " fullBleed>
        {fullfillmentCenterData &&
          fullfillmentCenterData.map((center, index) => (
            <Col
              colSize={{ large: 6, medium: 8, small: 6 }}
              className="confirmation-fullfillment-center-item"
            >
              <ConfirmationFulfillmentCenterItemDisplay
                key={center.orderNumber}
                center={center}
                index={index}
                isGuest={isGuest}
                labels={labels}
              />
            </Col>
          ))}
      </Row>
      <Row fullBleed className="variable-width">
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
          className="place-cash-banner"
        >
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="extrabold"
            textAlign="center"
            className="place-cash-banner-text"
          >
            Place Cash Banner
          </BodyCopy>
        </Col>
      </Row>
      {orderNumbersByFullfillmentCenter && (
        <Row fullBleed className="variable-width ">
          <Col
            colSize={{
              large: 12,
              medium: 8,
              small: 6,
            }}
          >
            <BodyCopy
              fontSize={['fs16', 'fs16', 'fs20']}
              fontFamily="primary"
              className="confirmation-next-update-heading"
            >
              {labels.nextHeading}
            </BodyCopy>
            <BodyCopy fontSize={['fs14', 'fs14', 'fs16']} fontFamily="secondary">
              {isBossInList ? labels.nextDetailsBoss : labels.nextDetails}
            </BodyCopy>
          </Col>
        </Row>
      )}
      <Row fullBleed className="variable-width ">
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
          className="confirmation-update-details"
        >
          <BodyCopy
            fontSize={['fs16', 'fs16', 'fs20']}
            fontFamily="primary"
            className="confirmation-next-update-heading"
          >
            {labels.updateOrderHeading}
          </BodyCopy>
          <BodyCopy fontSize={['fs14', 'fs14', 'fs16']} fontFamily="secondary">
            <RichText richTextHtml={updateOrderDetailsData} dataLocator="update-order-details" />
          </BodyCopy>
        </Col>
      </Row>
    </div>
  );
};
ThankYouComponent.propTypes = {
  className: PropTypes.string,
  /** Flag indicates whether the user is a guest */
  isGuest: PropTypes.bool,

  /** indicates order payment is processing */
  isOrderPending: PropTypes.bool,

  /** email address of the user that placed the order */
  emailAddress: PropTypes.string.isRequired,

  /** shipped order only details */
  orderDetails: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    orderNumber: PropTypes.string.isRequired,
    trackingLink: PropTypes.string.isRequired,
  }).isRequired,

  /** Bopis order details */
  orderNumbersByFullfillmentCenter: PropTypes.shape({
    holdDate: PropTypes.instanceOf(Date).isRequired,
    fullfillmentCenterMap: PropTypes.shape([{}]),
  }).isRequired,
  updateOrderDetailsData: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  orderShippingDetails: PropTypes.shape({}),
  isBossInList: PropTypes.bool,
  fullfillmentCenterData: PropTypes.shape([{}]),
  isShowShippingMessage: PropTypes.bool,
  isShowBopisMessage: PropTypes.bool,
  isShowMixedMessage: PropTypes.bool,
};
ThankYouComponent.defaultProps = {
  className: '',
  isGuest: true,
  isOrderPending: false,
  updateOrderDetailsData: null,
  orderShippingDetails: null,
  isBossInList: false,
  fullfillmentCenterData: null,
  isShowShippingMessage: false,
  isShowBopisMessage: false,
  isShowMixedMessage: false,
};

export default withStyles(ThankYouComponent, styles);
export { ThankYouComponent as ThankYouComponentVanilla };
