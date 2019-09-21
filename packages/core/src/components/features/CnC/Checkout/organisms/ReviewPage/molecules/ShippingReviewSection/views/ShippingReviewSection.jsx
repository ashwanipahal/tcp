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
    } = this.props;
    return (
      <div className={className} dataLocator="review-shipping-section">
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <TitlePlusEditButton
              title="Shipping"
              editTitle="Edit"
              onEdit={this.handleEnterEditModeClick}
              dataLocator="pickup-section"
            />
          </Col>
        </Row>

        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 6 }}>
            <div className="shippingAddressTitle">
              <BodyCopy
                fontSize="fs16"
                dataLocator=""
                fontFamily="secondary"
                color="gray.900"
                fontWeight="extrabold"
              >
                Shipping Address
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
          <Col colSize={{ small: 6, medium: 8, large: 6 }}>
            {shippingMethod && <ShippingMethodDisplay displayName={shippingMethod.displayName} />}

            {isGiftOptionsEnabled && <GiftWrappingDisplay displayName={giftWrappingDisplayName} />}
          </Col>
        </Row>
      </div>
    );
  }
}

ShippingReviewSection.propTypes = {
  className: PropTypes.string.isRequired,
  pickUpLabels: PropTypes.shape({}),
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
  pickUpLabels: {},
  shippingAddress: {},
  isGiftOptionsEnabled: true,
  giftWrappingDisplayName: 'N/A',
};

export default withStyles(ShippingReviewSection, styles);
