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
  setSelectedGiftCard: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  setDefaultPaymentMethod: Function,
  venmoCardList: Array<object>,
  showNotificationCaptcha: boolean,
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
    return (
      <DeleteCardModal
        openState={deleteModalMountedState}
        data={{
          heading:
            selectedCard.ccType === 'VENMO'
              ? labels.ACC_LBL_MODAL_VENMO_DELETE
              : labels.ACC_LBL_MODAL_GC_HEADING,
          subHeading:
            selectedCard.ccType === 'VENMO' ? labels.ACC_LBL_MODAL_VENMO_DELETE_HEADING : '',
          description: selectedCard,
          buttons: {
            cancel: labels.ACC_LBL_MODAL_GC_CANCEL,
            confirm: labels.ACC_LBL_MODAL_GC_CONFIRM,
          },
          cardText: {
            cardEnd: selectedCard.ccType === 'VENMO' ? '' : labels.ACC_LBL_MODAL_GC_CARDEND,
            expire: selectedCard.ccType === 'VENMO' ? '' : labels.ACC_LBL_MODAL_GC_EXPIRE,
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
      setSelectedGiftCard,
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
