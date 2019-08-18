/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainer, StyledHeading, UnderlineStyle } from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import Cards from '../../../molecules/Cards';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import VenmoCards from '../../../molecules/VenmoCards';
import DeleteModal from '../../../molecules/DeleteModal';
import AddEditPaymentModal from '../../../molecules/AddEditPaymentModal';
import { getIconCard } from '../../../../../../../utils/index.native';

class PaymentView extends React.Component<Props> {
  static propTypes = {
    labels: PropTypes.shape({}),
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
    labels: {},
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
    };
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.deleteModalMountedState)
      this.setState({ setDeleteModalMountedState: nextProps.deleteModalMountedState });
  };

  setSelectedCard = card => {
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

  setUpdateModalMountState = () => {
    const { setUpdateModalMountedState } = this.state;
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
    } = this.props;
    const { setDeleteModalMountedState, setUpdateModalMountedState, selectedCard } = this.state;
    let dto = {};
    const cardImg = getIconCard(this.cardIconMapping[selectedCard.ccBrand]);
    if (selectedCard.ccType === 'GiftCard') {
      dto = {
        cardDescription: labels.paymentGC.lbl_payment_modalGCHeading,
        cardImage: cardImg,
        cardDetail: `${labels.paymentGC.lbl_payment_cardNum}${selectedCard.accountNo.slice(-4)}`,
      };
    } else if (selectedCard.ccType === 'VENMO') {
      dto = {
        cardDescription: labels.paymentGC.lbl_payment_modalVenmoDeleteHeading,
        cardImage: cardImg,
        cardDetail: selectedCard.properties.venmoUserId,
      };
    } else {
      dto = {
        cardDescription: labels.paymentGC.lbl_payment_modalCCHeading,
        cardImage: cardImg,
        cardDetail: `${labels.paymentGC.lbl_payment_cardNum} ${selectedCard.accountNo}`,
      };
    }
    return (
      <View {...this.props}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StyledHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="extrabold"
              text={labels.paymentGC.lbl_payment_heading}
            />
          </StyledHeading>
          <UnderlineStyle />
          {cardList && <OffersSection labels={labels} />}
          {creditCardList && (
            <Cards
              labels={labels}
              heading={labels.paymentGC.lbl_payment_ccHeading} // eslint-disable-next-line
              cardImage={require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png')}
              emptyLabel={labels.paymentGC.lbl_payment_CCEmptyHeading}
              description={labels.paymentGC.lbl_payment_CCEmptyDesc}
              emptyBtnLabel={labels.paymentGC.lbl_payment_ccEmptyAddBtn}
              addBtnLabel={labels.paymentGC.lbl_payment_addBtn}
              cardList={creditCardList}
              setDefaultPaymentMethod={setDefaultPaymentMethod}
              toggleModal={this.setDeleteModalMountState}
              openUpdateModal={this.setUpdateModalMountState}
              setSelectedCard={this.setSelectedCard}
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
              heading={labels.paymentGC.lbl_payment_heading} // eslint-disable-next-line
              cardImage={require('../../../../../../../../../mobileapp/src/assets/images/gift-card.png')}
              emptyLabel={labels.paymentGC.lbl_payment_GCEmptyHeading}
              description={labels.paymentGC.lbl_payment_GCEmptyDesc}
              emptyBtnLabel={labels.paymentGC.lbl_payment_GCEmptyAddBtn}
              addBtnLabel={labels.paymentGC.lbl_payment_addBtn}
              cardList={giftCardList}
              checkbalanceValueInfo={checkbalanceValueInfo}
              onGetBalanceCard={onGetBalanceCard}
              toggleModal={this.setDeleteModalMountState}
              setSelectedCard={this.setSelectedCard}
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
            />
          )}
          {setUpdateModalMountedState && (
            <AddEditPaymentModal
              dto={dto}
              labels={labels}
              setSelectedCard={this.setSelectedCard}
              toggleModal={this.setUpdateModalMountState}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(PaymentView, ParentContainer);
export { PaymentView as PaymentViewVanilla };
