import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils';
import { FreeShippingLabel, AnchorWrapper } from '../styles/FreeShippingBannerSection.style.native';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import mobileHashValues from '../../../../LoyaltyBanner/util/utilityNative';

const FreeShippingBannerSection = props => {
  const { labels } = props;
  const utilArrShippingNew = [
    {
      key: '#tagOpen#',
      value: 'ShippingNew',
    },
  ];
  const labelStr = getLabelValue(labels, 'lbl_freeShippingBanner_label');
  const freeShippingLabel = labelStr ? mobileHashValues(labelStr, utilArrShippingNew) : false;

  return (
    <>
      {freeShippingLabel && (
        <FreeShippingLabel>
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
              url="/content/free-shipping"
              target="_blank"
              underline
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
