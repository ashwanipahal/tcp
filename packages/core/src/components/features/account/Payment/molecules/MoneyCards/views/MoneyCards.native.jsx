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

// @flow
type Props = {
  labels: string,
};

const MoneyCards = (props: Props) => {
  const { labels } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{labels.ACC_LBL_CC_HEADING}</HeadingTextStyle>
      <WrapperStyle>
        <ImgWrapper>
          <ImageStyle
            // eslint-disable-next-line global-require
            source={require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png')}
          />
        </ImgWrapper>

        <EmptyCCLabelStyle>{labels.ACC_LBL_CC_EMPTY_HEADING}</EmptyCCLabelStyle>
      </WrapperStyle>
      <DescriptionEmptyCCStyle>{labels.ACC_LBL_CC_EMPTY_DESC}</DescriptionEmptyCCStyle>
      <ButtonWrapperStyle>
        <CustomButton title={labels.ACC_LBL_CC_EMPTY_ADD_BTN} buttonVariation="variable-width" />
      </ButtonWrapperStyle>
    </View>
  );
};

export default withStyles(MoneyCards);
export { MoneyCards as MoneyCardsVanilla };
