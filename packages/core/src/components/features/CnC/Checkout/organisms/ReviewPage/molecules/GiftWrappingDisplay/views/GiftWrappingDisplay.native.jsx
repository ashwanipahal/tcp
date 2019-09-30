import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import style from '../styles/GiftWrappingDisplay.style.native';

const { GiftWrappingTitle, GiftWrappingName } = style;

class GiftWrappingDisplay extends React.PureComponent {
  render() {
    const { displayName, labels } = this.props;
    const { lbl_review_sectionShippingGiftServiceTitle: GiftServiceTitle } = labels;
    return (
      <View>
        <GiftWrappingTitle>
          <BodyCopy
            fontSize="fs16"
            mobileFontFamily="secondary"
            color="gray.900"
            fontWeight="extrabold"
            dataLocator="gift-wrapping-title"
            text={GiftServiceTitle}
          />
        </GiftWrappingTitle>
        <GiftWrappingName>
          <BodyCopy
            fontSize="fs16"
            mobileFontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
            dataLocator="gift-wrapping-name"
            text={displayName}
          />
        </GiftWrappingName>
      </View>
    );
  }
}

GiftWrappingDisplay.propTypes = {
  displayName: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    lbl_review_sectionShippingGiftServiceTitle: PropTypes.string,
  }),
};

GiftWrappingDisplay.defaultProps = {
  labels: {
    lbl_review_sectionShippingGiftServiceTitle: 'Gift Services',
  },
};

export default GiftWrappingDisplay;
export { GiftWrappingDisplay as GiftWrappingDisplayanilla };
