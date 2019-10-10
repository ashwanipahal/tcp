import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
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

export class PaymentView extends React.Component {
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
      cardHeading = getLabelValue(labels, 'lbl_payment_modalDeleteCard', 'paymentGC');
    } else {
      cardHeading = getLabelValue(
        labels,
        isVenmo ? 'lbl_payment_modalVenmoDelete' : 'lbl_payment_modalGCHeading',
        'paymentGC'
      );
    }
    return (
      <DeleteCardModal
        openState={deleteModalMountedState}
        data={{
          heading: cardHeading,
          subHeading:
            selectedCard.ccType === 'VENMO'
              ? getLabelValue(labels, 'lbl_payment_modalVenmoDeleteHeading', 'paymentGC')
              : '',
          description: selectedCard,
          buttons: {
            cancel: getLabelValue(labels, 'lbl_payment_modalGCCancel', 'paymentGC'),
            confirm: getLabelValue(labels, 'lbl_payment_modalGCConfirm', 'paymentGC'),
          },
          cardText: {
            cardEnd:
              selectedCard.ccType === 'VENMO'
                ? ''
                : getLabelValue(labels, 'lbl_payment_modalGCCardEnd', 'paymentGC'),
            expire:
              selectedCard.ccType === 'VENMO'
                ? ''
                : getLabelValue(labels, 'lbl_payment_gcExpire', 'paymentGC'),
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
                message={getLabelValue(
                  labels,
                  showNotification === 'success'
                    ? 'lbl_payment_successMsg'
                    : 'lbl_payment_errorMsg',
                  'paymentGC'
                )}
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
              {getLabelValue(labels, 'lbl_payment_heading', 'paymentGC')}
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
PaymentView.defaultProps = {
  deleteModalMountedState: false,
};

PaymentView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  deleteModalMountedState: PropTypes.bool,
  onDeleteCard: PropTypes.func.isRequired,
  showUpdatedNotificationOnModal: PropTypes.string.isRequired,
  creditCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  giftCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onGetBalanceCard: PropTypes.func.isRequired,
  checkbalanceValueInfo: PropTypes.string.isRequired,
  setDefaultPaymentMethod: PropTypes.func.isRequired,
  venmoCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showNotificationCaptcha: PropTypes.bool.isRequired,
  addCreditCard: PropTypes.func.isRequired,
};
export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
