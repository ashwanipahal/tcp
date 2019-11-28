import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '../../../../../../../../common/atoms';
import style from '../styles/GiftWrappingDisplay.style.native';

const { EditHandleClickWrapper, GiftWrappingName, GiftTitleWrapper } = style;

class GiftWrappingDisplay extends React.PureComponent {
  handleClick = event => {
    event.preventDefault();
    const { onEdit } = this.props;
    onEdit();
  };

  render() {
    const { displayName, labels, editTitle, isExpressCheckout } = this.props;
    const { lbl_review_sectionShippingGiftServiceTitle: GiftServiceTitle } = labels;
    return (
      <View>
        <GiftTitleWrapper>
          <View>
            <BodyCopy
              fontSize="fs16"
              mobileFontFamily="secondary"
              color="gray.900"
              fontWeight="extrabold"
              dataLocator="gift-wrapping-title"
              text={GiftServiceTitle}
            />
          </View>
          <EditHandleClickWrapper>
            {isExpressCheckout && (
              <Anchor
                underline
                anchorVariation="primary"
                fontSize="fs12"
                mobileFontFamily="secondary"
                onPress={this.handleClick}
                color="gray.900"
                text={editTitle}
              />
            )}
          </EditHandleClickWrapper>
        </GiftTitleWrapper>
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
  editTitle: PropTypes.string.isRequired,
  isExpressCheckout: PropTypes.string.isRequired,
  onEdit: PropTypes.string.isRequired,
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
