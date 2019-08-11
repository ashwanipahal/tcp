/* eslint-disable complexity */
/* eslint-disable global-require */
import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
  CardDescription,
  CardDetailWrapper,
  CardDetail,
  ImgWrapper,
  ImageStyle,
  ConfirmButtonWrapper,
  CloseButtonWrapper,
} from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import Cards from '../../../molecules/Cards';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import VenmoCards from '../../../molecules/VenmoCards';
import ModalNative from '../../../../../../common/molecules/Modal';
import LineComp from '../../../../../../common/atoms/Line';
import CustomButton from '../../../../../../common/atoms/Button';

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
};

class PaymentView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedCard: {},
    };
  }

  setSelectedCard = card => {
    this.setState({
      selectedCard: card,
    });
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  onConfirm = () => {
    const { onDeleteCard } = this.props;
    const { selectedCard } = this.state;
    onDeleteCard({ creditCardId: selectedCard.creditCardId });
  };

  onClose = () => {
    // const { toggleModal } = this.props;
    this.toggleModal({ state: false });
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
    const { showModal, selectedCard } = this.state;
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
              toggleModal={this.toggleModal}
              setSelectedCard={this.setSelectedCard}
            />
          )}
          {venmoCardList && venmoCardList.size > 0 && (
            <VenmoCards
              labels={labels}
              venmoCardList={venmoCardList}
              toggleModal={this.toggleModal}
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
              toggleModal={this.toggleModal}
              setSelectedCard={this.setSelectedCard}
            />
          )}
          {showModal && (
            <ModalNative isOpen={showModal} onRequestClose={this.toggleModal}>
              <ModalHeading>
                <BodyCopy
                  mobileFontFamily={['secondary']}
                  fontWeight="extrabold"
                  fontSize="fs16"
                  text={labels.paymentGC.lbl_payment_modalDeleteCard}
                />
              </ModalHeading>
              <LineWrapper>
                <LineComp marginTop={5} borderWidth={2} borderColor="black" />
              </LineWrapper>
              <SafeAreaView>
                <ModalViewWrapper>
                  <CardDescription>{dto.cardDescription}</CardDescription>
                  <CardDetailWrapper>
                    <ImgWrapper>
                      <ImageStyle source={dto.cardImage1} />
                    </ImgWrapper>
                    <CardDetail>{dto.cardDetail}</CardDetail>
                  </CardDetailWrapper>
                  <ConfirmButtonWrapper>
                    <CustomButton
                      text={labels.paymentGC.lbl_payment_modalGCConfirm}
                      buttonVariation="variable-width"
                      fill="BLUE"
                      color="white"
                      onPress={this.onConfirm}
                    />
                  </ConfirmButtonWrapper>
                  <CloseButtonWrapper>
                    <CustomButton
                      text={labels.paymentGC.lbl_payment_modalGCCancel}
                      buttonVariation="variable-width"
                      fill="RED"
                      color="red"
                      onPress={this.onClose}
                    />
                  </CloseButtonWrapper>
                </ModalViewWrapper>
              </SafeAreaView>
            </ModalNative>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(PaymentView, ParentContainer);
export { PaymentView as PaymentViewVanilla };
