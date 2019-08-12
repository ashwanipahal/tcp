/* eslint-disable global-require */
import React from 'react';
import { View, ScrollView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainer, StyledHeading, UnderlineStyle } from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import Cards from '../../../molecules/Cards';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import VenmoCards from '../../../molecules/VenmoCards';
import DeleteModal from '../../../molecules/DeleteModal';

// @flow
type Props = {
  labels: Object,
  creditCardList: object,
  setDefaultPaymentMethod: Function,
  giftCardList: object,
  cardList: object,
  venmoCardList: object,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  onDeleteCard: any,
  setDeleteModalMountState: any,
  setDeleteModalMountedState: any,
  deleteModalMountedState: any,
};

class PaymentView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      setDeleteModalMountedState: false,
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

  onConfirm = () => {
    const { onDeleteCard } = this.props;
    const { selectedCard } = this.state;
    onDeleteCard({ creditCardId: selectedCard.creditCardId });
  };

  onClose = () => {
    this.setDeleteModalMountState({ setDeleteModalMountedState: false });
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
    const { setDeleteModalMountedState, selectedCard } = this.state;
    let dto = {};
    if (selectedCard.ccType === 'GiftCard') {
      dto = {
        cardDescription: labels.paymentGC.lbl_payment_modalGCHeading,
        cardImage1: require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png'),
        cardDetail: `${labels.paymentGC.lbl_payment_cardNum} ${selectedCard.accountNo}`,
      };
    } else if (selectedCard.ccType === 'VENMO') {
      dto = {
        cardDescription: labels.paymentGC.lbl_payment_modalVenmoDeleteHeading,
        cardImage1: require('../../../../../../../../../mobileapp/src/assets/images/venmo.png'),
        cardDetail: selectedCard.properties.venmoUserId,
      };
    } else {
      dto = {
        cardDescription: labels.paymentGC.lbl_payment_modalCCHeading,
        cardImage1: require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png'),
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
              setDeleteModalMountedState={this.setDeleteModalMountedState}
              toggleModal={this.setDeleteModalMountState}
              onConfirm={this.onConfirm}
              onClose={this.onClose}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(PaymentView, ParentContainer);
export { PaymentView as PaymentViewVanilla };
