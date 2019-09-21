import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/ShippingReviewSection.style';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import TitlePlusEditButton from '../../TitlePlusEditButton';
import Address from '../../../../../../../../common/molecules/Address';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import ShippingMethodDisplay from '../../ShippingMethodDisplay';
import GiftWrappingDisplay from '../../GiftWrappingDisplay';

export class ShippingReviewSection extends React.PureComponent {
  render() {
    const {
      className,
      shippingAddress,
      shippingMethod,
      isGiftOptionsEnabled,
      giftWrappingDisplayName,
      labels,
    } = this.props;
    return (
      <div className={className} dataLocator="review-shipping-section">
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <TitlePlusEditButton
              title={labels.lbl_review_shippingSectionTitle}
              editTitle={labels.lbl_review_sectionAnchor}
              onEdit={this.handleEnterEditModeClick}
              dataLocator="pickup-section"
            />
          </Col>
        </Row>

        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 4, large: 5 }}>
            <div className="shippingAddressTitle">
              <BodyCopy
                fontSize="fs16"
                dataLocator=""
                fontFamily="secondary"
                color="gray.900"
                fontWeight="extrabold"
              >
                {labels.lbl_review_sectionShippingAddressTitle}
              </BodyCopy>
            </div>
            <Address className="addressStyle" address={shippingAddress.address} />
            <BodyCopy
              fontSize="fs16"
              dataLocator=""
              fontFamily="secondary"
              color="gray.900"
              fontWeight="regular"
            >
              {shippingAddress.emailAddress}
            </BodyCopy>
            <BodyCopy
              fontSize="fs16"
              dataLocator=""
              fontFamily="secondary"
              color="gray.900"
              fontWeight="regular"
            >
              {shippingAddress.phoneNumber}
            </BodyCopy>
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 5 }}>
            {shippingMethod && (
              <ShippingMethodDisplay labels={labels} displayName={shippingMethod.displayName} />
            )}
            {isGiftOptionsEnabled && (
              <GiftWrappingDisplay labels={labels} displayName={giftWrappingDisplayName} />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

ShippingReviewSection.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  isGiftOptionsEnabled: PropTypes.bool,
  giftWrappingDisplayName: PropTypes.string,
  shippingAddress: PropTypes.shape({}),
  shippingMethod: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shippingSpeed: PropTypes.string.isRequired,
    isDefault: PropTypes.bool,
  }).isRequired,
};

ShippingReviewSection.defaultProps = {
  labels: {},
  shippingAddress: {},
  isGiftOptionsEnabled: true,
  giftWrappingDisplayName: 'N/A',
};

export default withStyles(ShippingReviewSection, styles);
