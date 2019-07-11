import React from 'react';
// import { List } from 'immutable';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import styles from '../styles/Payment.style';
import Notification from '../../../../common/molecules/Notification';
import CreditCardList from './CreditCardList.view';
import GiftCardList from './GiftCardList.view';
import VenmoCardList from './VenmoCardList.view';
import Offers from '../../common/molecule/Offers/views/Offers.view';

// @flow
type Props = {
  // giftCard: List<{}>,
  labels: object,
  className: string,
  showNotification: boolean,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
  creditCardList: Array<object>,
  giftCardList: Array<object>,
  cardList: Array<object>,
  setSelectedGiftCard: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  setDefaultPaymentMethod: Function,
  venmoCardList: Array<object>,
};

export const PaymentView = ({
  labels,
  className,
  showNotification,
  setDeleteModalMountState,
  deleteModalMountedState,
  onDeleteCard,
  showUpdatedNotificationOnModal,
  setSelectedGiftCard,
  creditCardList,
  giftCardList,
  cardList,
  onGetBalanceCard,
  checkbalanceValueInfo,
  setDefaultPaymentMethod,
  venmoCardList,
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
            fontFamily="primary"
            fontSize="fs16"
            fontWeight="extrabold"
            component="h4"
            className="payment__heading"
            dataLocator="payment-payment&gcheader"
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
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          showNotification={showNotification}
          setSelectedGiftCard={setSelectedGiftCard}
          setDefaultPaymentMethod={setDefaultPaymentMethod}
        />
      )}
      {venmoCardList && venmoCardList.size > 0 && (
        <VenmoCardList
          labels={labels}
          venmoCardList={venmoCardList}
          className="payment__venmoCard"
        />
      )}
      {giftCardList && (
        <GiftCardList
          labels={labels}
          giftCardList={giftCardList}
          className="payment__giftCard"
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          showNotification={showNotification}
          setSelectedGiftCard={setSelectedGiftCard}
          onGetBalanceCard={onGetBalanceCard}
          checkbalanceValueInfo={checkbalanceValueInfo}
        />
      )}
    </div>
  );
};

export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
