/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/FreeShippingBannerSection.style';
import { BodyCopy, Anchor, Image } from '../../../../../../common/atoms';
import { labelsHashValuesReplace, convertHtml } from '../../../../LoyaltyBanner/util/utility';
import CONSTANTS from '../../../../Checkout/Checkout.constants';
import { getIconPath } from '../../../../../../../utils';

const FreeShippingBannerSection = props => {
  const fastShippingPath = getIconPath('fast-shipping');
  const { className, labels } = props;

  const utilArrShippingNew = [
    {
      key: '#tagOpen#',
      value: `<span class="${className} shippingNew">`,
    },
    {
      key: '#tagClose#',
      value: `</span>`,
    },
  ];
  const labelStr = getLabelValue(labels, 'lbl_freeShippingBanner_label');
  const convertedStrValue = labelsHashValuesReplace(labelStr, utilArrShippingNew);
  const freeShippingLabel = convertHtml(convertedStrValue);
  const freeShippingLabelExist = freeShippingLabel !== 'lbl_freeShippingBanner_label';

  return (
    freeShippingLabelExist && (
      <div className={`${className}`}>
        <BodyCopy
          className="free-shipping-banner-section-wrapper"
          component="div"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          <Image src={fastShippingPath} className="fast-shipping" />
          {freeShippingLabel}
          <span className="free-shipping-details">
            <Anchor
              className="details"
              anchorVariation="primary"
              text={getLabelValue(labels, 'lbl_freeShippingBanner_details')}
              url={CONSTANTS.FREE_SHIPPING_URL}
              target="_blank"
              underline
            />
          </span>
        </BodyCopy>
      </div>
    )
  );
};

FreeShippingBannerSection.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
};

FreeShippingBannerSection.defaultProps = {
  className: '',
};

export default withStyles(FreeShippingBannerSection, Styles);
export { FreeShippingBannerSection as FreeShippingBannerSectionVanilla };
