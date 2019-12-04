import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils';
import {
  FreeShippingLabel,
  AnchorWrapper,
  FreeShippingIconWrapper,
} from '../styles/FreeShippingBannerSection.style.native';
import { BodyCopy, Anchor, Image } from '../../../../../../common/atoms';
import mobileHashValues from '../../../../LoyaltyBanner/util/utilityNative';
import fastShipping from '../../../../../../../assets/fast-shipping.png';

const FreeShippingBannerSection = props => {
  const { labels } = props;
  const utilArrShippingNew = [
    {
      key: '#tagOpen# ',
      value: 'ShippingNew',
    },
  ];
  const labelStr = getLabelValue(labels, 'lbl_freeShippingBanner_label');
  const freeShippingURL = getLabelValue(labels, 'lbl_freeShippingBanner_url_app');
  const freeShippingLabel = labelStr ? mobileHashValues(labelStr, utilArrShippingNew) : false;

  return (
    <>
      {freeShippingLabel && (
        <FreeShippingLabel>
          <FreeShippingIconWrapper>
            <Image
              source={fastShipping}
              alt={getLabelValue(labels, 'lbl_fast_shipping')}
              height={18}
              width={20}
            />
          </FreeShippingIconWrapper>
          <View>
            <BodyCopy
              mobilefontFamily={['secondary']}
              textAlign="center"
              fontWeight="extrabold"
              text={freeShippingLabel}
            />
          </View>
          <AnchorWrapper>
            <Anchor
              className="details"
              anchorVariation="primary"
              text={getLabelValue(labels, 'lbl_freeShippingBanner_details')}
              underline
              url={freeShippingURL}
            />
          </AnchorWrapper>
        </FreeShippingLabel>
      )}
    </>
  );
};

FreeShippingBannerSection.propTypes = {
  labels: PropTypes.shape.isRequired,
};

export default FreeShippingBannerSection;
