import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainerStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  RichTextStyle,
} from '../OffersSection.style.native';
import RichText from '../../../../../../common/atoms/RichText';

// @flow
// type Props = {
//   labels: Object,
// };

const OffersSection = (props: Props) => {
  const { labels } = props;
  return (
    <View {...props}>
      <WrapperStyle>
        <ImgWrapper>
          <ImageStyle
            // eslint-disable-next-line global-require
            source={require('../../../../../../../../../mobileapp/src/assets/images/card-smile.png')}
          />
        </ImgWrapper>
        <RichTextStyle>
          <RichText
            source={{ html: getLabelValue(labels, 'lbl_payment_offersMessageMobile', 'paymentGC') }}
          />
        </RichTextStyle>
      </WrapperStyle>
    </View>
  );
};

OffersSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(OffersSection, ParentContainerStyle);
export { OffersSection as OffersSectionVanilla };
