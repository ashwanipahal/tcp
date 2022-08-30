import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import style from '../styles/ShippingMethodDisplay.style.native';

const { ShippingMethodHeading, ShippingMethodName } = style;

class ShippingMethodDisplay extends React.PureComponent {
  render() {
    const { displayName, labels } = this.props;
    const { lbl_review_sectionShippingMethodTitle: title } = labels;
    return (
      <View>
        <ShippingMethodHeading>
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            mobileFontFamily="secondary"
            color="gray.900"
            fontWeight="extrabold"
            className="heading"
            text={title}
          />
        </ShippingMethodHeading>
        <ShippingMethodName>
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            mobileFontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
            text={displayName}
          />
        </ShippingMethodName>
      </View>
    );
  }
}

ShippingMethodDisplay.propTypes = {
  displayName: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
};

ShippingMethodDisplay.defaultProps = {
  labels: {
    lbl_review_sectionShippingMethodTitle: 'Shipping Method',
  },
};

export default ShippingMethodDisplay;
export { ShippingMethodDisplay as ShippingMethodDisplayanilla };
