// @flow
import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { View, Text, Image } from 'react-native'; //eslint-disable-line
import CustomButton from '../../../../../../common/atoms/Button';
import {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
} from '../GiftCards.style.native';

// @flow
type Props = {
  labels: string,
};

const GiftCards = (props: Props) => {
  const { labels } = props;
  return (
    <View {...props}>
      <HeadingTextStyle>{labels.ACC_LBL_GC_HEADING}</HeadingTextStyle>
      <WrapperStyle>
        <ImageStyle
          // source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
          // eslint-disable-next-line global-require
          source={require('../../../../../../../../../mobileapp/src/assets/images/gift-card.png')}
        />
        <EmptyCCLabelStyle>{labels.ACC_LBL_GC_EMPTY_HEADING}</EmptyCCLabelStyle>
      </WrapperStyle>
      <DescriptionEmptyCCStyle>{labels.ACC_LBL_GC_EMPTY_DESC}</DescriptionEmptyCCStyle>
      <ButtonWrapperStyle>
        <CustomButton title={labels.ACC_LBL_GC_EMPTY_ADD_BTN} buttonVariation="variable-width" />
      </ButtonWrapperStyle>
    </View>
  );
};

export default withStyles(GiftCards, ParentContainerStyle);
export { GiftCards as GiftCardsVanilla };
