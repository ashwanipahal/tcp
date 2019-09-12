import React from 'react';
import { View, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import { getLabelValue } from '@tcp/core/src/utils';
import endpoints from '../../../../../account/common/externalEndpoints';
import {
  StyledModalWrapper,
  Horizontal,
  PrivacyContent,
  FullHeaderStyle,
} from '../styles/CouponDetailModal.style.native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

class CouponDetailModal extends React.PureComponent<Props> {
  componentDidUpdate() {
    const { coupon, handleErrorCoupon } = this.props;
    if (coupon.error) {
      handleErrorCoupon(coupon);
    }
  }

  /**
   * This function is used for apply to bag coupon
   * can be passed in the component.
   */
  handleApplyToBag = () => {
    const {
      onApplyCouponToBagFromList,
      coupon: { id },
      onRequestClose,
    } = this.props;
    onApplyCouponToBagFromList({ id });
    onRequestClose();
  };

  /**
   * This function is used to return coupon validity message
   * can be passed in the component.
   */
  showValidity = () => {
    const { coupon, labels } = this.props;
    const isPlaceCash = coupon.redemptionType === COUPON_REDEMPTION_TYPE.PLACECASH;
    const validityLbl = isPlaceCash
      ? getLabelValue(labels, 'COUPON_VALIDITY')
      : getLabelValue(labels, 'USE_BY_TEXT');
    const validityStr = isPlaceCash
      ? `${coupon.effectiveDate} - ${coupon.expirationDate}`
      : `${coupon.expirationDate}`;
    return `${validityLbl} ${validityStr}`;
  };

  /**
   * This function is to get cta label
   * can be passed in the component.
   * @param {obj} - labels
   * @param {boolean} - isStarted
   * @param {boolean} - isPlaceCash
   * @return {String} - cta label
   */
  getAddToBagCtaLabel = (labels, isStarted, isPlaceCash) => {
    return !isStarted && isPlaceCash
      ? getLabelValue(labels, 'SEE_REDEEM_DATES')
      : getLabelValue(labels, 'APPLY_TO_BAG');
  };

  render() {
    const { openState, onRequestClose, coupon, isDisabled, labels } = this.props;
    const isApplyButtonDisabled = isDisabled || !coupon.isStarted;
    const isPlaceCash = coupon.redemptionType === COUPON_REDEMPTION_TYPE.PLACECASH;
    const addToBagCTALabel = this.getAddToBagCtaLabel(labels, coupon.isStarted, isPlaceCash);

    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        closeIconDataLocator="added-to-bg-close"
        closeIconLeftAligned={false}
        horizontalBar={false}
        headerStyle={FullHeaderStyle}
      >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <StyledModalWrapper>
            <BodyCopy
              data-locator={`couponDetailModal_${coupon.status}_NameLbl`}
              fontSize="fs42"
              fontFamily="primary"
              fontWeight="black"
              text={coupon.title}
            />
            <ViewWithSpacing spacingStyles="margin-top-SM">
              <BodyCopy
                data-locator={`couponDetailModal_${coupon.status}_ValidityDateLbl`}
                fontSize="fs24"
                fontFamily="secondary"
                fontWeight="semibold"
                text={this.showValidity()}
              />
            </ViewWithSpacing>
            <Horizontal />
            <View data-locator={`couponDetailModal_${coupon.status}_BarCode`}>
              <Barcode value={coupon.id} height="50" />
            </View>
            <Horizontal />
            <ViewWithSpacing spacingStyles="margin-bottom-LRG">
              <CustomButton
                text={addToBagCTALabel}
                buttonVariation="fixed-width"
                disabled={isApplyButtonDisabled}
                data-locator={`couponDetailModal_${coupon.status}_AddToBagBtn`}
                fill="BLUE"
                onPress={() => {
                  this.handleApplyToBag();
                }}
              />
            </ViewWithSpacing>
            <Anchor
              fontSizeVariation="large"
              underlineBlue
              anchorVariation="secondary"
              dataLocator={`couponDetailModal_${coupon.status}_printAch`}
              text={getLabelValue(labels, 'PRINT_ANCHOR_TEXT')}
              class="clickhere"
            />
            <PrivacyContent data-locator={`couponDetailModal_${coupon.status}_LongDesc`}>
              <HTML html={coupon.legalText} />
            </PrivacyContent>
            <PrivacyContent>
              <BodyCopy
                data-locator={`couponDetailModal_${coupon.status}_ShortDesc`}
                fontSize="fs12"
                fontFamily="primary"
                fontWeight="regular"
                text={getLabelValue(labels, 'MODAL_SHORT_DESCRIPTION')}
              />
              <Anchor
                fontSizeVariation="medium"
                fontFamily="secondary"
                anchorVariation="primary"
                underline
                noLink
                onPress={() => {
                  UrlHandler(endpoints.termsAndConditionsPage);
                }}
                dataLocator={`couponDetailModal_${coupon.status}_tAndC`}
                text={getLabelValue(labels, 'TERMS_AND_CONDITIONS')}
              />
              <BodyCopy
                data-locator={`couponDetailModal_${coupon.status}_and`}
                fontSize="fs12"
                fontFamily="primary"
                fontWeight="regular"
                text=" and "
              />
              <Anchor
                fontSizeVariation="medium"
                underline
                noLink
                onPress={() => {
                  UrlHandler(endpoints.privacyPolicyPage);
                }}
                anchorVariation="primary"
                dataLocator={`couponDetailModal_${coupon.status}_pp`}
                text={getLabelValue(labels, 'PRIVACY_POLICY')}
              />
            </PrivacyContent>
          </StyledModalWrapper>
        </ScrollView>
      </Modal>
    );
  }
}

export default CouponDetailModal;
export { CouponDetailModal as CouponDetailModalVanilla };
