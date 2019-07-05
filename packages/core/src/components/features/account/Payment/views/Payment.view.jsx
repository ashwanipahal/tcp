import React from 'react';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import styles from '../styles/Payment.style';
import Notification from '../../../../common/molecules/Notification';
import CreditCardList from './CreditCardList';
import GiftCardList from './GiftCardList';
import Offers from '../../common/molecule/Offers/views/Offers.view';

// @flow
type Props = {
  labels: object,
  className: string,
  showNotification: boolean,
  creditCardList: Array<object>,
  giftCardList: Array<object>,
  cardList: Array<object>,
};

const PaymentView = ({
  labels,
  className,
  showNotification,
  creditCardList,
  giftCardList,
  cardList,
}: Props) => {
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
        >
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            component="h4"
            className="payment__heading"
          >
            {labels.paymentHeading}
          </BodyCopy>
        </Col>
      </Row>
      {showNotification && (
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
          >
            <Notification
              status={showNotification}
              colSize={{ large: 12, medium: 8, small: 6 }}
              message={showNotification === 'success' ? labels.successMessage : labels.errorMessage}
            />
          </Col>
        </Row>
      )}
      {cardList && (
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
          >
            <Offers labels={labels} className="payment_offers" />
          </Col>
        </Row>
      )}
      {creditCardList && (
        <CreditCardList
          labels={labels.creditCard}
          creditCardList={creditCardList}
          className="payment__creditCard"
        />
      )}
      {giftCardList && (
        <GiftCardList
          labels={labels.giftCard}
          giftCardList={giftCardList}
          className="payment__giftCard"
        />
      )}
    </div>
  );
};

export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
