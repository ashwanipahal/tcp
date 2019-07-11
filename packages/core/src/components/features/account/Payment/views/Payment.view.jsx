import React from 'react';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import styles from '../styles/Payment.style';
import Notification from '../../../../common/molecules/Notification';
import CreditCardList from './CreditCardList.view';
import GiftCardList from './GiftCardList.view';
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
              message={
                showNotification === 'success'
                  ? labels.ACC_LBL_SUCCESS_MSG
                  : labels.ACC_LBL_ERROR_MSG
              }
            />
          </Col>
        </Row>
      )}
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
            {labels.ACC_LBL_PAYMENT_HEADING}
          </BodyCopy>
        </Col>
      </Row>
      {cardList && (
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
          >
            <Offers labels={labels} className="payment__offers" />
          </Col>
        </Row>
      )}
      {creditCardList && (
        <CreditCardList
          labels={labels}
          creditCardList={creditCardList}
          className="payment__creditCard"
        />
      )}
      {giftCardList && (
        <GiftCardList labels={labels} giftCardList={giftCardList} className="payment__giftCard" />
      )}
    </div>
  );
};

export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
