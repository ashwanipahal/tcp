import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import Image from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { View } from 'react-native';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { getLabelValue } from '../../../../../../../utils';
import {
  TileWrapper,
  TileContentWrapper,
  Notification,
  TileContent,
  TileTopContent,
  TileDesc,
  ButtonWrapper,
  SpaceWrapper,
  Overlay,
  OverlayContent,
  OverlapElement,
  OverlayContentText,
  TitleWrapper,
  BarWrapper,
} from '../styles/DetailedCouponTile.native.style';
import {
  COUPON_REDEMPTION_TYPE,
  COUPON_STATUS,
} from '../../../../../../../services/abstractors/CnC/CartItemTile';
import CouponIcon from '../../CouponIcon';

const bagIcon = require('../../../../../../../assets/white-bag.png');

export class DetailedCouponTile extends React.Component {
  static propTypes = {
    coupon: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({
      lbl_coupon_expiringSoon: PropTypes.string,
      lbl_coupon_couponValid: PropTypes.string,
      lbl_coupon_couponUseBy: PropTypes.string,
      lbl_coupon_detailsLink: PropTypes.string,
      lbl_coupon_viewPrint: PropTypes.string,
      lbl_coupon_removeFromBag: PropTypes.string,
      lbl_coupon_applyToBag: PropTypes.string,
      lbl_common_couponTypePlacecash: PropTypes.string,
      lbl_common_couponTypeReward: PropTypes.string,
      lbl_common_couponTypeSaving: PropTypes.string,
    }),
    onApplyCouponToBagFromList: PropTypes.func,
    onRemove: PropTypes.func,
    onViewCouponDetails: PropTypes.func,
    toastMessage: PropTypes.func,
  };

  static defaultProps = {
    onApplyCouponToBagFromList: () => {},
    onRemove: () => {},
    onViewCouponDetails: () => {},
    toastMessage: () => {},
    labels: {
      lbl_coupon_expiringSoon: '',
      lbl_coupon_couponValid: '',
      lbl_coupon_couponUseBy: '',
      lbl_coupon_detailsLink: '',
      lbl_coupon_viewPrint: '',
      lbl_coupon_removeFromBag: '',
      lbl_coupon_applyToBag: '',
      lbl_common_couponTypePlacecash: '',
      lbl_common_couponTypeReward: '',
      lbl_common_couponTypeSaving: '',
    },
  };

  componentDidUpdate() {
    const { coupon, toastMessage } = this.props;
    if (coupon.error) {
      toastMessage(coupon);
    }
  }

  /**
   * This function is used for apply to bag coupon
   * can be passed in the component.
   */
  handleApplyToBag = () => {
    const { onApplyCouponToBagFromList, coupon } = this.props;
    onApplyCouponToBagFromList({
      couponCode: coupon.id,
      id: coupon.id,
      coupon: coupon.id,
    });
  };

  /**
   * This function is used for remove coupon
   * can be passed in the component.
   */
  handleRemove = () => {
    const { onRemove, coupon } = this.props;
    onRemove({ id: coupon.id });
  };

  /**
   * This function is used for view coupon deatils
   * can be passed in the component.
   */
  handleViewCouponDetails = () => {
    const { onViewCouponDetails, coupon } = this.props;
    onViewCouponDetails(coupon);
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
      ? getLabelValue(labels, 'lbl_coupon_seeRedeemDates')
      : getLabelValue(labels, 'lbl_coupon_applyToBag');
  };

  /**
   * This function is used for create overlay element
   * can be passed in the component.
   */
  showOverlay = () => {
    const { coupon, labels } = this.props;

    if (coupon.status === COUPON_STATUS.APPLIED) {
      return (
        <Fragment>
          <Overlay />
          <OverlayContent>
            <OverlayContentText>
              <Image height="25px" width="25px" source={bagIcon} alt="Bag Icon" />
            </OverlayContentText>
            <OverlayContentText>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="extrabold"
                textAlign="center"
                color="white"
                text={getLabelValue(labels, 'lbl_common_applied_to_bag')}
              />
            </OverlayContentText>
          </OverlayContent>
        </Fragment>
      );
    }
    return null;
  };

  /**
   * This function is used for create overlap element
   * can be passed in the component.
   */
  showOverlap = () => {
    const { coupon } = this.props;
    if (coupon.status === COUPON_STATUS.APPLIED) {
      return <OverlapElement />;
    }
    return null;
  };

  render() {
    const { coupon, labels } = this.props;
    const isPlaceCash = coupon.redemptionType === COUPON_REDEMPTION_TYPE.PLACECASH;
    const addToBagCTALabel = this.getAddToBagCtaLabel(labels, coupon.isStarted, isPlaceCash);
    const colorPallete = createThemeColorPalette();
    const overlapSiblings = this.showOverlap();
    return (
      <TileWrapper>
        <TileContentWrapper isError={coupon.error}>
          {this.showOverlay()}
          {coupon.isExpiring && (
            <Notification>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                textAlign="center"
                color="white"
                text={getLabelValue(labels, 'lbl_coupon_expiringSoon')}
              />
            </Notification>
          )}
          <TileContent>
            <TileTopContent>
              <SpaceWrapper>
                <CouponIcon coupon={coupon} labels={labels} />
              </SpaceWrapper>
              <TitleWrapper>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  textAlign="center"
                  color={coupon.status === COUPON_STATUS.APPLIED ? 'white' : 'gray.900'}
                  data-locator="accountoverview-myplacerewatdstile-rewardvalue"
                  text={coupon.title}
                />
              </TitleWrapper>
            </TileTopContent>
            <BarWrapper>
              <Barcode value={coupon.id} height="50" />
              {overlapSiblings}
            </BarWrapper>
            <TileDesc>
              <View>
                <BodyCopy
                  fontFamily="secondary"
                  data-locator="accountoverview-myplacerewatdstile-rewarduseby"
                  text={`${
                    isPlaceCash
                      ? getLabelValue(labels, 'lbl_coupon_couponValid')
                      : getLabelValue(labels, 'lbl_coupon_couponUseBy')
                  }`}
                />
                <BodyCopy
                  fontFamily="secondary"
                  text={
                    isPlaceCash
                      ? `${coupon.effectiveDate} - ${coupon.expirationDate}`
                      : `${coupon.expirationDate}`
                  }
                />
              </View>
              <Anchor
                fontSizeVariation="large"
                underline
                onPress={() => {
                  this.handleViewCouponDetails();
                }}
                anchorVariation="primary"
                data-locator="my-rewards-program-details"
                text={getLabelValue(labels, 'lbl_coupon_detailsLink')}
                color="gray.900"
              />
              {overlapSiblings}
            </TileDesc>
            <ButtonWrapper>
              <CustomButton
                text={getLabelValue(labels, 'lbl_coupon_viewPrint')}
                onPress={() => {
                  this.handleViewCouponDetails();
                }}
              />
              {overlapSiblings}
            </ButtonWrapper>
            {coupon.applyAlert && <BodyCopy text={coupon.applyAlert} />}
            {!coupon.applyAlert && coupon.status === COUPON_STATUS.APPLIED ? (
              <CustomButton
                text={getLabelValue(labels, 'lbl_coupon_removeFromBag')}
                onPress={() => {
                  this.handleRemove();
                }}
              />
            ) : (
              <CustomButton
                text={addToBagCTALabel}
                disableButton={!coupon.isStarted}
                fill="BLUE"
                color={colorPallete.white}
                onPress={() => {
                  this.handleApplyToBag();
                }}
              />
            )}
          </TileContent>
        </TileContentWrapper>
      </TileWrapper>
    );
  }
}

export default DetailedCouponTile;
