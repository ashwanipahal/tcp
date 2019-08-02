import React from 'react';
import { View } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
} from '../MoneyCards.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import CardTile from '../../../../common/molecule/CardTile/views/CardTile.view.native';

// @flow
type Props = {
  labels: string,
  creditCardList: object,
  setDefaultPaymentMethod: Function,
};

const MoneyCards = (props: Props) => {
  const { labels, creditCardList, setDefaultPaymentMethod } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{labels.paymentGC.lbl_payment_ccHeading}</HeadingTextStyle>
      {creditCardList.size === 0 && (
        <React.Fragment>
          <WrapperStyle>
            <ImgWrapper>
              <ImageStyle
                // eslint-disable-next-line global-require
                source={require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png')}
              />
            </ImgWrapper>
            <EmptyCCLabelStyle>{labels.paymentGC.lbl_payment_CCEmptyHeading}</EmptyCCLabelStyle>
          </WrapperStyle>
          <DescriptionEmptyCCStyle>
            {labels.paymentGC.lbl_payment_CCEmptyDesc}
          </DescriptionEmptyCCStyle>
        </React.Fragment>
      )}
      <ButtonWrapperStyle>
        <CustomButton
          text={
            creditCardList.size === 0
              ? labels.paymentGC.lbl_payment_ccEmptyAddBtn
              : labels.paymentGC.lbl_payment_addBtn
          }
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
        />
      </ButtonWrapperStyle>
      {creditCardList.size > 0 &&
        creditCardList.map(cardItem => (
          <CardTile
            card={cardItem}
            labels={labels}
            setDefaultPaymentMethod={setDefaultPaymentMethod}
          />
        ))}
    </View>
  );
};

export default withStyles(MoneyCards);
export { MoneyCards as MoneyCardsVanilla };
