// @flow
import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainerStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  RichTextStyle,
} from '../OffersSection.style.native';
// import { getIconPath } from '../../../../../../../utils';
import { View, Text, Image } from 'react-native'; //eslint-disable-line
import RichText from '../../../../../../common/atoms/RichText';

// @flow
type Props = {
  labels: Object,
};

const OffersSection = (props: Props) => {
  const { labels } = props;
  // const OffersSection = () => {
  // const cardIcon = getIconPath('icon-card-smile');
  return (
    <View {...props}>
      {/* <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: cardIcon }}
      /> */}
      <WrapperStyle>
        <ImgWrapper>
          <ImageStyle
            // eslint-disable-next-line global-require
            source={require('../../../../../../../../../mobileapp/src/assets/images/card-smile.png')}
          />
        </ImgWrapper>

        <RichTextStyle>
          <RichText source={{ html: labels.ACC_LBL_OFFERS_MESSAGE }} />
        </RichTextStyle>
      </WrapperStyle>
    </View>
  );
};

export default withStyles(OffersSection, ParentContainerStyle);
export { OffersSection as OffersSectionVanilla };
