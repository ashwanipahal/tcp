import React from 'react';
import { View } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
} from '../GiftCards.style.native';
import CardTile from '../../../../common/molecule/CardTile/views/CardTile.view.native';

// @flow
type Props = {
  labels: string,
  giftCardList: object,
};

const GiftCards = (props: Props) => {
  const { labels, giftCardList } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{labels.paymentGC.ACC_LBL_GC_HEADING}</HeadingTextStyle>
      {giftCardList.size === 0 && (
        <React.Fragment>
          <WrapperStyle>
            <ImgWrapper>
              <ImageStyle
                // eslint-disable-next-line global-require
                source={require('../../../../../../../../../mobileapp/src/assets/images/gift-card.png')}
              />
            </ImgWrapper>
            <EmptyCCLabelStyle>{labels.paymentGC.ACC_LBL_GC_EMPTY_HEADING}</EmptyCCLabelStyle>
          </WrapperStyle>
          <DescriptionEmptyCCStyle>
            {labels.paymentGC.ACC_LBL_GC_EMPTY_DESC}
          </DescriptionEmptyCCStyle>
        </React.Fragment>
      )}
      <ButtonWrapperStyle>
        <CustomButton
          text={
            giftCardList.size === 0
              ? labels.paymentGC.ACC_LBL_GC_EMPTY_ADD_BTN
              : labels.paymentGC.ACC_LBL_ADD_BTN
          }
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
        />
      </ButtonWrapperStyle>
      {giftCardList.size > 0 &&
        giftCardList.map(cardItem => <CardTile card={cardItem} labels={labels} />)}
    </View>
  );
};

export default withStyles(GiftCards, ParentContainerStyle);
export { GiftCards as GiftCardsVanilla };
