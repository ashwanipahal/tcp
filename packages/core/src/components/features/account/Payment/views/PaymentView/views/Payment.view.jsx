import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../../../styles/Payment.style';
import Notification from '../../../../../../common/molecules/Notification';
import CreditCardList from '../../CreditCardList.view';
import GiftCardList from '../../GiftCardList.view';
import VenmoCardList from '../../VenmoCardList.view';
import Offers from '../../../../common/molecule/Offers/views/Offers.view';
import DeleteCardModal from '../../DeleteCardModal';

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
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  setDefaultPaymentMethod: Function,
  venmoCardList: Array<object>,
  showNotificationCaptcha: boolean,
  addCreditCard: () => {},
};

export class PaymentView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: {},
    };
  }

  setSelectedCard = card => {
    this.setState({
      selectedCard: card,
    });
  };

  renderDeleteModal = () => {
    const { selectedCard } = this.state;
    const {
      labels,
      deleteModalMountedState,
      onDeleteCard,
      setDeleteModalMountState,
      showUpdatedNotificationOnModal,
    } = this.props;

    const isCreditCard = selectedCard.ccType !== 'GiftCard' && selectedCard.ccType !== 'VENMO';
    const isVenmo = selectedCard.ccType === 'VENMO';
    let cardHeading = '';
    if (isCreditCard) {
      cardHeading = labels.paymentGC.lbl_payment_modalDeleteCard;
    } else {
      cardHeading = isVenmo
        ? labels.paymentGC.lbl_payment_modalVenmoDelete
        : labels.paymentGC.lbl_payment_modalGCHeading;
    }
    return (
      <DeleteCardModal
        openState={deleteModalMountedState}
        data={{
          heading: cardHeading,
          subHeading:
            selectedCard.ccType === 'VENMO'
              ? labels.paymentGC.lbl_payment_modalVenmoDeleteHeading
              : '',
          description: selectedCard,
          buttons: {
            cancel: labels.paymentGC.lbl_payment_modalGCCancel,
            confirm: labels.paymentGC.lbl_payment_modalGCConfirm,
          },
          cardText: {
            cardEnd:
              selectedCard.ccType === 'VENMO' ? '' : labels.paymentGC.lbl_payment_modalGCCardEnd,
            expire: selectedCard.ccType === 'VENMO' ? '' : labels.paymentGC.lbl_payment_gcExpire,
          },
        }}
        labels={labels}
        onDeleteCard={onDeleteCard}
        setDeleteModalMountState={setDeleteModalMountState}
        showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
      />
    );
  };

  render() {
    const {
      labels,
      className,
      showNotification,
      setDeleteModalMountState,
      creditCardList,
      giftCardList,
      cardList,
      onGetBalanceCard,
      checkbalanceValueInfo,
      setDefaultPaymentMethod,
      venmoCardList,
      showNotificationCaptcha,
      onDeleteCard,
      showUpdatedNotificationOnModal,
      addCreditCard,
    } = this.props;
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
                    ? labels.paymentGC.lbl_payment_successMsg
                    : labels.paymentGC.lbl_payment_errorMsg
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
              data-locator="payment-payment&gcheader"
            >
              {labels.paymentGC.lbl_payment_heading}
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
            setDeleteModalMountState={setDeleteModalMountState}
            onDeleteCard={onDeleteCard}
            showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
            showNotification={showNotification}
            setDefaultPaymentMethod={setDefaultPaymentMethod}
            setSelectedCard={this.setSelectedCard}
            addCreditCard={addCreditCard}
          />
        )}
        {venmoCardList && venmoCardList.size > 0 && (
          <VenmoCardList
            labels={labels}
            venmoCardList={venmoCardList}
            className="payment__venmoCard"
            setDeleteModalMountState={setDeleteModalMountState}
            onDeleteCard={onDeleteCard}
            showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
            showNotification={showNotification}
            onGetBalanceCard={onGetBalanceCard}
            checkbalanceValueInfo={checkbalanceValueInfo}
            showNotificationCaptcha={showNotificationCaptcha}
            setSelectedCard={this.setSelectedCard}
          />
        )}
        {giftCardList && (
          <GiftCardList
            labels={labels}
            giftCardList={giftCardList}
            className="payment__giftCard"
            setDeleteModalMountState={setDeleteModalMountState}
            onDeleteCard={onDeleteCard}
            showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
            showNotification={showNotification}
            onGetBalanceCard={onGetBalanceCard}
            checkbalanceValueInfo={checkbalanceValueInfo}
            showNotificationCaptcha={showNotificationCaptcha}
            setSelectedCard={this.setSelectedCard}
          />
        )}
        {this.renderDeleteModal()}
      </div>
    );
  }
}

export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
