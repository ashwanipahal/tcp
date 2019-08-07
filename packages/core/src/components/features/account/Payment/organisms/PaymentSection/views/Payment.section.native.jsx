import React from 'react';
import { View, ScrollView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainer, StyledHeading, UnderlineStyle } from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import Cards from '../../../molecules/Cards';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import VenmoCards from '../../../molecules/VenmoCards';

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
};

const PaymentView = (props: Props) => {
  const {
    labels,
    creditCardList,
    giftCardList,
    cardList,
    setDefaultPaymentMethod,
    venmoCardList,
    onGetBalanceCard,
    checkbalanceValueInfo,
  } = props;
  return (
    <View {...props}>
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
          />
        )}
        {venmoCardList && venmoCardList.size > 0 && (
          <VenmoCards labels={labels} venmoCardList={venmoCardList} />
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
          />
        )}
      </ScrollView>
    </View>
  );
};

export default withStyles(PaymentView, ParentContainer);
export { PaymentView as PaymentViewVanilla };
