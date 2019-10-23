/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  ModalViewWrapper,
} from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import Cards from '../../../molecules/Cards';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import VenmoCards from '../../../molecules/VenmoCards';
import DeleteModal from '../../../molecules/DeleteModal';
import AddEditPaymentModal from '../../../molecules/AddEditPaymentModal';
import { getIconCard } from '../../../../../../../utils/index.native';
import ModalNative from '../../../../../../common/molecules/Modal';
import AddGiftCardContainer from '../../../AddGiftCard/container/AddGiftCard.container';

class PaymentView extends React.Component<Props> {
  static propTypes = {
    labels: {
      paymentGC: PropTypes.shape({
        lbl_payment_modalGCHeading: PropTypes.string,
        lbl_payment_cardNum: PropTypes.string,
        lbl_payment_modalVenmoDeleteHeading: PropTypes.string,
        lbl_payment_modalCCHeading: PropTypes.string,
        lbl_payment_heading: PropTypes.string,
        lbl_payment_ccHeading: PropTypes.string,
        lbl_payment_CCEmptyHeading: PropTypes.string,
        lbl_payment_CCEmptyDesc: PropTypes.string,
        lbl_payment_ccEmptyAddBtn: PropTypes.string,
        lbl_payment_addBtn: PropTypes.string,
        lbl_payment_GCEmptyHeading: PropTypes.string,
        lbl_payment_GCEmptyDesc: PropTypes.string,
        lbl_payment_GCEmptyAddBtn: PropTypes.string,
        lbl_payment_addGiftCard: PropTypes.string,
      }),
    },
    creditCardList: PropTypes.shape({}),
    setDefaultPaymentMethod: PropTypes.func,
    giftCardList: PropTypes.shape({}),
    cardList: PropTypes.shape({}),
    venmoCardList: PropTypes.shape({}),
    onGetBalanceCard: PropTypes.func,
    checkbalanceValueInfo: PropTypes.shape({}),
    onDeleteCard: PropTypes.shape({}),
    setDeleteModalMountState: PropTypes.bool,
    setUpdateModalMountState: PropTypes.bool,
    setDeleteModalMountedState: PropTypes.bool,
    setUpdateModalMountedState: PropTypes.bool,
    deleteModalMountedState: PropTypes.bool,
    updateModalMountedState: PropTypes.bool,
  };

  static defaultProps = {
    labels: {
      paymentGC: {
        lbl_payment_modalGCHeading: '',
        lbl_payment_cardNum: '',
        lbl_payment_modalVenmoDeleteHeading: '',
        lbl_payment_modalCCHeading: '',
        lbl_payment_heading: '',
        lbl_payment_ccHeading: '',
        lbl_payment_CCEmptyHeading: '',
        lbl_payment_CCEmptyDesc: '',
        lbl_payment_ccEmptyAddBtn: '',
        lbl_payment_addBtn: '',
        lbl_payment_GCEmptyHeading: '',
        lbl_payment_GCEmptyDesc: '',
        lbl_payment_GCEmptyAddBtn: '',
        lbl_payment_addGiftCard: '',
      },
    },
    creditCardList: {},
    setDefaultPaymentMethod: () => {},
    giftCardList: {},
    cardList: {},
    venmoCardList: {},
    onGetBalanceCard: () => {},
    checkbalanceValueInfo: {},
    onDeleteCard: {},
    setDeleteModalMountState: false,
    setDeleteModalMountedState: false,
    setUpdateModalMountedState: false,
    deleteModalMountedState: false,
    updateModalMountedState: false,
    setUpdateModalMountState: false,
  };

  cardIconMapping = {
    DISC: 'disc-small',
    MC: 'mc-small',
    Amex: 'amex-small',
    Visa: 'visa-small',
    GC: 'gift-card-small',
    'PLACE CARD': 'place-card-small',
    VENMO: 'venmo-blue-acceptance-mark',
  };

  constructor(props) {
    super(props);
    this.state = {
      setDeleteModalMountedState: false,
      setUpdateModalMountedState: false,
      selectedCard: {},
      showGiftCardModal: false,
      recaptchaToken: '',
    };
    this.isEdit = false;
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.deleteModalMountedState)
      this.setState({ setDeleteModalMountedState: nextProps.deleteModalMountedState });
  };

  getCardExpiryText = (labels, selectedCard) => {
    return selectedCard && selectedCard.expMonth
      ? `${getLabelValue(
          labels,
          'lbl_payment_expDate',
          'paymentGC'
        )}${selectedCard.expMonth.trim()}/${selectedCard.expYear}`
      : '';
  };

  setSelectedCard = card => {
    this.isEdit = true;
    this.setState({
      selectedCard: card,
    });
  };

  setDeleteModalMountState = () => {
    const { setDeleteModalMountedState } = this.state;
    this.setState({
      setDeleteModalMountedState: !setDeleteModalMountedState,
    });
  };

  setUpdateModalMountState = (isAdd = true) => {
    const { setUpdateModalMountedState } = this.state;
    this.isEdit = !isAdd;
    this.setState({
      setUpdateModalMountedState: !setUpdateModalMountedState,
    });
  };

  onConfirm = () => {
    const { onDeleteCard } = this.props;
    const { selectedCard } = this.state;
    onDeleteCard({ creditCardId: selectedCard.creditCardId });
  };

  onClose = () => {
    this.setDeleteModalMountState({
      setDeleteModalMountedState: false,
      setUpdateModalMountedState: false,
    });
  };

  toggleGiftCardModal = () => {
    const { showGiftCardModal } = this.state;
    this.setState({
      showGiftCardModal: !showGiftCardModal,
    });
  };

  getPaymentModal = (setUpdateModalMountedState, dto, labels, updateCardList, selectedCard) => {
    return (
      setUpdateModalMountedState && (
        <AddEditPaymentModal
          dto={this.isEdit ? dto : {}}
          labels={labels}
          setSelectedCard={this.setSelectedCard}
          toggleModal={this.setUpdateModalMountState}
          setUpdateModalMountedState={setUpdateModalMountedState}
          updateCardList={updateCardList}
          isEdit={this.isEdit}
          selectedCard={this.isEdit ? selectedCard : {}}
        />
      )
    );
  };

  render() {
    const {
      labels,
      creditCardList,
      giftCardList,
      cardList,
      setDefaultPaymentMethod,
      venmoCardList,
      onGetBalanceCard,
      checkbalanceValueInfo,
      updateCardList,
    } = this.props;
    const {
      setDeleteModalMountedState,
      setUpdateModalMountedState,
      selectedCard,
      recaptchaToken,
      showGiftCardModal,
    } = this.state;
    let dto = {};
    const cardImg = getIconCard(this.cardIconMapping[selectedCard.ccBrand]);

    if (selectedCard.ccType === 'GiftCard') {
      dto = {
        cardDescription: getLabelValue(labels, 'lbl_payment_modalGCHeading', 'paymentGC'),
        cardImage: cardImg,
        cardDetail: `${getLabelValue(labels, 'lbl_payment_cardNum', 'paymentGC')}`,
        accountNo: selectedCard.accountNo,
        cardExpiry: this.getCardExpiryText(labels, selectedCard),
      };
    } else if (selectedCard.ccType === 'VENMO') {
      dto = {
        cardDescription: getLabelValue(labels, 'lbl_payment_modalVenmoDeleteHeading', 'paymentGC'),
        cardImage: cardImg,
        cardDetail: selectedCard.properties.venmoUserId,
        cardExpiry: '',
      };
    } else {
      dto = {
        cardDescription: getLabelValue(labels, 'lbl_payment_modalCCHeading', 'paymentGC'),
        cardImage: cardImg,
        cardDetail: `${getLabelValue(labels, 'lbl_payment_cardNum', 'paymentGC')}`,
        accountNo: selectedCard.accountNo,
        cardExpiry: this.getCardExpiryText(labels, selectedCard),
      };
    }
    return (
      <View {...this.props}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <StyledHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="extrabold"
              text={getLabelValue(labels, 'lbl_payment_heading', 'paymentGC')}
            />
          </StyledHeading>
          <UnderlineStyle />
          {cardList && <OffersSection labels={labels} />}
          {creditCardList && (
            <Cards
              labels={labels}
              heading={getLabelValue(labels, 'lbl_payment_ccHeading', 'paymentGC')} // eslint-disable-next-line
              cardImage={require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png')}
              emptyLabel={getLabelValue(labels, 'lbl_payment_CCEmptyHeading', 'paymentGC')}
              description={getLabelValue(labels, 'lbl_payment_CCEmptyDesc', 'paymentGC')}
              emptyBtnLabel={getLabelValue(labels, 'lbl_payment_ccEmptyAddBtn', 'paymentGC')}
              addBtnLabel={getLabelValue(labels, 'lbl_payment_addBtn', 'paymentGC')}
              cardList={creditCardList}
              setDefaultPaymentMethod={setDefaultPaymentMethod}
              toggleModal={this.setDeleteModalMountState}
              openUpdateModal={this.setUpdateModalMountState} // Update handler to edit card with edit story
              setSelectedCard={this.setSelectedCard}
              setCardHandler={this.setUpdateModalMountState}
            />
          )}
          {venmoCardList && venmoCardList.size > 0 && (
            <VenmoCards
              labels={labels}
              venmoCardList={venmoCardList}
              toggleModal={this.setDeleteModalMountState}
              setSelectedCard={this.setSelectedCard}
            />
          )}
          {giftCardList && (
            <Cards
              labels={labels}
              heading={getLabelValue(labels, 'lbl_payment_heading', 'paymentGC')} // eslint-disable-next-line
              cardImage={require('../../../../../../../../../mobileapp/src/assets/images/gift-card.png')}
              emptyLabel={getLabelValue(labels, 'lbl_payment_GCEmptyHeading', 'paymentGC')}
              description={getLabelValue(labels, 'lbl_payment_GCEmptyDesc', 'paymentGC')}
              emptyBtnLabel={getLabelValue(labels, 'lbl_payment_GCEmptyAddBtn', 'paymentGC')}
              addBtnLabel={getLabelValue(labels, 'lbl_payment_addBtn', 'paymentGC')}
              cardList={giftCardList}
              checkbalanceValueInfo={checkbalanceValueInfo}
              onGetBalanceCard={onGetBalanceCard}
              toggleModal={this.setDeleteModalMountState}
              setSelectedCard={this.setSelectedCard}
              setCardHandler={this.toggleGiftCardModal}
              toggleRecaptchaModal={this.setRecaptchaModalMountState}
              recaptchaToken={recaptchaToken}
            />
          )}
          {setDeleteModalMountedState && (
            <DeleteModal
              dto={dto}
              labels={labels}
              setSelectedCard={this.setSelectedCard}
              setDeleteModalMountedState={setDeleteModalMountedState}
              toggleModal={this.setDeleteModalMountState}
              onConfirm={this.onConfirm}
              onClose={this.onClose}
              addressDetails={selectedCard.addressDetails}
            />
          )}
          {this.getPaymentModal(
            setUpdateModalMountedState,
            dto,
            labels,
            updateCardList,
            selectedCard
          )}
          {showGiftCardModal && (
            <ModalNative
              isOpen={showGiftCardModal}
              onRequestClose={this.toggleGiftCardModal}
              heading={getLabelValue(labels, 'lbl_payment_addGiftCard', 'paymentGC')}
            >
              <ModalViewWrapper>
                <AddGiftCardContainer toggleModal={this.toggleGiftCardModal} labels={labels} />
              </ModalViewWrapper>
            </ModalNative>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(PaymentView, ParentContainer);
export { PaymentView as PaymentViewVanilla };
