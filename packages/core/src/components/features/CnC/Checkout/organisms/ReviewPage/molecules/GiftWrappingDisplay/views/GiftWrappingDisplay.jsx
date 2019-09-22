import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/GiftWrappingDisplay.style';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';

class GiftWrappingDisplay extends React.PureComponent {
  render() {
    const { displayName, className, labels } = this.props;
    const { lbl_review_sectionShippingGiftServiceTitle: GiftServiceTitle } = labels;
    return (
      <div className={className}>
        <div className="gift-wrapping-container">
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            color="gray.900"
            fontWeight="extrabold"
            dataLocator="gift-wrapping-title"
          >
            {GiftServiceTitle}
          </BodyCopy>
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
            dataLocator="gift-wrapping-name"
          >
            {displayName}
          </BodyCopy>
        </div>
      </div>
    );
  }
}

GiftWrappingDisplay.propTypes = {
  displayName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    lbl_review_sectionShippingGiftServiceTitle: PropTypes.string,
  }),
};

GiftWrappingDisplay.defaultProps = {
  labels: {
    lbl_review_sectionShippingGiftServiceTitle: 'Gift Services',
  },
};

export default withStyles(GiftWrappingDisplay, styles);
export { GiftWrappingDisplay as GiftWrappingDisplayanilla };
