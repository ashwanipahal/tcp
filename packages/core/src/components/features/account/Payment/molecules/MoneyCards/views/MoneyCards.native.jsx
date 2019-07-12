// @flow
import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
} from '../MoneyCards.style.native';
import { View, Text, Image } from 'react-native'; //eslint-disable-line
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
        <ImageStyle
          // eslint-disable-next-line global-require
          source={require('../../../../../../../../../mobileapp/src/assets/images/credit-card.png')}
        />
        <EmptyCCLabelStyle>{labels.ACC_LBL_CC_EMPTY_HEADING}</EmptyCCLabelStyle>
      </WrapperStyle>
      <DescriptionEmptyCCStyle>{labels.ACC_LBL_CC_EMPTY_DESC}</DescriptionEmptyCCStyle>
      <ButtonWrapperStyle>
        <CustomButton title={labels.ACC_LBL_CC_EMPTY_ADD_BTN} buttonVariation="variable-width" />
      </ButtonWrapperStyle>
    </View>
  );
};

export default withStyles(MoneyCards, ParentContainerStyle);
export { MoneyCards as MoneyCardsVanilla };
