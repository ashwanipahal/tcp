import React from 'react';
import PropTypes from 'prop-types';
import GenericSkeleton from '@tcp/core/src/components/common/molecules/GenericSkeleton/GenericSkeleton.view';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { FULLY_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import { formatPhoneNumber } from '../../../../../../../../../utils/formValidation/phoneNumber';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/ShippingReviewSection.style';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import TitlePlusEditButton from '../../TitlePlusEditButton';
import Address from '../../../../../../../../common/molecules/Address';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import ShippingMethodDisplay from '../../ShippingMethodDisplay';
import GiftWrappingDisplay from '../../GiftWrappingDisplay';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';

export class ShippingReviewSection extends React.PureComponent {
  shouldRenderAddressTile = () => {
    const { bagLoading, checkoutRoutingDone } = this.props;
    return !bagLoading && checkoutRoutingDone;
  };

  render() {
    const {
      className,
      shippingAddress,
      shippingMethod,
      isGiftOptionsEnabled,
      giftWrappingDisplayName,
      labels,
      onEdit,
      isExpressCheckout,
      shipmentMethods,
      formName,
      formSection,
      bagLoading,
      checkoutRoutingDone,
    } = this.props;
    const {
      lbl_review_shippingSectionTitle: title,
      lbl_review_sectionAnchor: edit,
      lbl_review_sectionShippingAddressTitle: addressTitle,
      lbl_review_sectionShippingMethodTitle: shippingMethodTitle,
    } = labels;
    return (
      <div className={className} dataLocator="review-shipping-section">
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <TitlePlusEditButton
              title={title}
              editTitle={edit}
              onEdit={onEdit}
              dataLocator="pickup-section"
              bagLoading={bagLoading}
            />
          </Col>
        </Row>

        {this.shouldRenderAddressTile() ? (
          <>
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
                    {addressTitle}
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
                {shippingAddress.phoneNumber && (
                  <BodyCopy
                    fontSize="fs16"
                    dataLocator=""
                    fontFamily="secondary"
                    color="gray.900"
                    fontWeight="regular"
                  >
                    {formatPhoneNumber(shippingAddress.phoneNumber)}
                  </BodyCopy>
                )}
              </Col>
              <Col colSize={{ small: 6, medium: 4, large: 5 }}>
                {!isExpressCheckout && shippingMethod && (
                  <ShippingMethodDisplay labels={labels} displayName={shippingMethod.displayName} />
                )}
                {isExpressCheckout && shippingMethod && (
                  <ShipmentMethods
                    shipmentMethods={shipmentMethods}
                    formName={formName}
                    formSection={formSection}
                    selectedShipmentId={shippingMethod.id}
                    shipmentHeader={shippingMethodTitle}
                    checkoutRoutingDone={checkoutRoutingDone}
                  />
                )}
                {isGiftOptionsEnabled && !isExpressCheckout && (
                  <GiftWrappingDisplay labels={labels} displayName={giftWrappingDisplayName} />
                )}
              </Col>
              {/* UX timer */}
              {/* Note: FULLY_VISIBLE applies to checkout page only. If this component needs to
              be reused on another page, we'll need some way to make the UX timer prop-based. */}
              <RenderPerf.Measure name={FULLY_VISIBLE} />
            </Row>

            <Row fullBleed>
              <Col colSize={{ small: 6, medium: 4, large: 5 }}>
                {isExpressCheckout && (
                  <GiftWrappingDisplay
                    labels={labels}
                    displayName={giftWrappingDisplayName}
                    onEdit={onEdit}
                    isExpressCheckout={isExpressCheckout}
                  />
                )}
              </Col>
            </Row>
          </>
        ) : (
          <GenericSkeleton />
        )}
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
  onEdit: PropTypes.func.isRequired,
  isExpressCheckout: PropTypes.bool.isRequired,
  shipmentMethods: PropTypes.shape({}).isRequired,
  formName: PropTypes.string.isRequired,
  formSection: PropTypes.string.isRequired,
  expressReviewShippingSectionId: PropTypes.shape({}),
  bagLoading: PropTypes.bool,
  checkoutRoutingDone: PropTypes.bool,
};

ShippingReviewSection.defaultProps = {
  labels: {},
  shippingAddress: {},
  isGiftOptionsEnabled: false,
  giftWrappingDisplayName: 'N/A',
  expressReviewShippingSectionId: {},
  bagLoading: false,
  checkoutRoutingDone: false,
};

export default withStyles(ShippingReviewSection, styles);
export { ShippingReviewSection as ShippingReviewSectionvanilla };
