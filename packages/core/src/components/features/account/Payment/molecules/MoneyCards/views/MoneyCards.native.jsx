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
      <HeadingTextStyle>{labels.ACC_LBL_CC_HEADING}</HeadingTextStyle>
      {creditCardList.size === 0 && (
        <React.Fragment>
          <WrapperStyle>
            <ImgWrapper>
              <ImageStyle
                // eslint-disable-next-line global-require
                source={require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png')}
              />
              <EmptyCCLabelStyle>{labels.ACC_LBL_CC_EMPTY_HEADING}</EmptyCCLabelStyle>
            </ImgWrapper>
          </WrapperStyle>
          <DescriptionEmptyCCStyle>{labels.ACC_LBL_CC_EMPTY_DESC}</DescriptionEmptyCCStyle>
          <ButtonWrapperStyle>
            <CustomButton
              title={labels.ACC_LBL_CC_EMPTY_ADD_BTN}
              buttonVariation="variable-width"
            />
          </ButtonWrapperStyle>
        </React.Fragment>
      )}
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
