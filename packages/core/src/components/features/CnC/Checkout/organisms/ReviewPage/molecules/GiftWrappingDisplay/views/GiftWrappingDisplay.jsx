import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/GiftWrappingDisplay.style';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../../../common/atoms/Anchor';

class GiftWrappingDisplay extends React.PureComponent {
  handleClick = event => {
    event.preventDefault();
    const { onEdit } = this.props;
    onEdit();
  };

  render() {
    const { displayName, className, labels, isExpressCheckout } = this.props;
    const {
      lbl_review_sectionShippingGiftServiceTitle: GiftServiceTitle,
      lbl_review_sectionAnchor: edit,
    } = labels;
    return (
      <div className={className}>
        <div className="gift-wrapping-container">
          <div className="header">
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              color="gray.900"
              fontWeight="extrabold"
              dataLocator="gift-wrapping-title"
              className="gift-wrapping-title"
            >
              {GiftServiceTitle}
            </BodyCopy>
            {isExpressCheckout && (
              <div className="editAnchor">
                <Anchor
                  underline
                  anchorVariation="secondary"
                  fontSize="fs12"
                  fontFamily="secondary"
                  dataLocator="review-giftservice-edit-anchor"
                  onClick={this.handleClick}
                  className="anchorStyle"
                  color="gray.900"
                >
                  {edit}
                </Anchor>
              </div>
            )}
          </div>
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
  isExpressCheckout: PropTypes.string.isRequired,
  onEdit: PropTypes.string.isRequired,
};

GiftWrappingDisplay.defaultProps = {
  labels: {
    lbl_review_sectionShippingGiftServiceTitle: 'Gift Services',
  },
};

export default withStyles(GiftWrappingDisplay, styles);
export { GiftWrappingDisplay as GiftWrappingDisplayanilla };
