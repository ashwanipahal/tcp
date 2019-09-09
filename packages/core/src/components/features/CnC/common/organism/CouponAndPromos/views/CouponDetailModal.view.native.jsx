import React from 'react';
import { View, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import Modal from '../../../../../../common/molecules/Modal';
import { UrlHandler } from '../../../../../../../utils/utils.app';
import endpoints from '../../../../../account/common/externalEndpoints';
import { getLabelValue } from '../../../../../../../utils';
import {
  StyledModalWrapper,
  Horizontal,
  PrivacyContent,
} from '../styles/CouponDetailModal.style.native';
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
    const { onApplyCouponToBagFromList, coupon, onRequestClose } = this.props;
    onApplyCouponToBagFromList({
      couponCode: coupon.id,
      id: coupon.id,
      coupon: coupon.id,
    });
    onRequestClose();
  };

  render() {
    const { openState, onRequestClose, coupon, labels } = this.props;
    const styles = { width: '100%' };
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        closeIconDataLocator="added-to-bg-close"
        closeIconLeftAligned={false}
        horizontalBar={false}
        headerStyle={styles}
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
                text={`${getLabelValue(labels, 'USE_BY_TEXT')} ${coupon.expirationDate}`}
              />
            </ViewWithSpacing>
            <Horizontal />
            <View data-locator={`couponDetailModal_${coupon.status}_BarCode`}>
              <Barcode value={coupon.id} height="50" />
            </View>
            <Horizontal />
            <ViewWithSpacing spacingStyles="margin-bottom-LRG">
              <CustomButton
                text={getLabelValue(labels, 'APPLY_TO_BAG')}
                buttonVariation="fixed-width"
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
