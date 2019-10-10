import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { getIconPath, getLabelValue } from '@tcp/core/src/utils/utils';
import { routerPush } from '@tcp/core/src/utils';
import internalEndpoints from '../../../internalEndpoints';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Col from '../../../../../../common/atoms/Col';
import Row from '../../../../../../common/atoms/Row';
import CouponCard from '../../../../../../common/molecules/CouponCard';
import CouponDetailModal from '../../../../../CnC/common/organism/CouponAndPromos/views/CouponDetailModal.view';
import CouponHelpModal from '../../../../../CnC/common/organism/CouponAndPromos/views/CouponHelpModal.view';
import { EmptyOffersList } from './EmptyOffersList.view';
import styles from '../styles/MyOffersCoupons.view.style';

class MyOffersCouponView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailStatus: false,
      helpStatus: false,
      selectedCoupon: {},
    };
  }

  /**
   * This function will handle click to open coupon detail modal
   * @param {} -
   */
  couponDetailClick = coupon => {
    this.setState({
      detailStatus: true,
      selectedCoupon: coupon,
    });
  };

  /**
   * This function will handle click to open help detail modal
   * @param {} -
   */
  toggleNeedHelpModal = e => {
    e.preventDefault();
    const { helpStatus } = this.state;
    this.setState({
      helpStatus: !helpStatus,
    });
  };

  /**
   * This function will handle click to go to wallet Page
   * @param {} -
   */
  goToWalletPage = () => {
    const { closedOverlay } = this.props;
    routerPush(internalEndpoints.myWalletPage.link, internalEndpoints.myWalletPage.path);
    closedOverlay();
  };

  /**
   * This function will render carousel view
   * @param {} -
   */
  renderCarouselView = () => {
    const {
      isFetching,
      labels,
      commonLabels,
      handleApplyCouponFromList,
      allCouponList,
      handleRemoveCoupon,
      handleErrorCoupon,
      isCarouselView,
      closedOverlay,
      sliceCount,
    } = this.props;

    const CAROUSEL_OPTIONS = {
      autoplay: false,
      arrows: true,
      autoplaySpeed: 4000,
      infinite: true,
      initialSlide: 0,
      fade: false,
      speed: 1000,
      dots: true,
      dotsClass: 'slick-dots',
      focusOnSelect: true,
      swipe: true,
      responsive: [
        {
          settings: {
            arrows: true,
          },
        },
      ],
    };
    return allCouponList ? (
      <BodyCopy component="div" className="coupon_carousel">
        {allCouponList.size > 0 && (
          <Carousel
            options={CAROUSEL_OPTIONS}
            carouselConfig={{
              customArrowLeft: getIconPath('smallright'),
              customArrowRight: getIconPath('smallright'),
              arrow: 'small',
              type: 'light',
            }}
            carouselTheme="dark"
          >
            {allCouponList.slice(0, sliceCount).map(coupon => {
              return (
                <CouponCard
                  key={coupon.id}
                  labels={labels}
                  commonLabels={commonLabels}
                  isFetching={isFetching}
                  coupon={coupon}
                  handleErrorCoupon={handleErrorCoupon}
                  couponDetailClick={this.couponDetailClick}
                  helpAnchorClick={this.toggleNeedHelpModal}
                  onApply={handleApplyCouponFromList}
                  onRemove={handleRemoveCoupon}
                  isCarouselView={isCarouselView}
                  className="coupon-slider"
                />
              );
            })}
            <BodyCopy component="div" className="coupon_viewall_tile">
              <BodyCopy className="elem-mt-XXXL" component="div" textAlign="center">
                <Button
                  className="coupon_button_black"
                  buttonVariation="variable-width"
                  type="submit"
                  data-locator="coupon_viewall_Cta"
                  onClick={this.goToWalletPage}
                >
                  {getLabelValue(commonLabels, 'lbl_my_rewards_viewAll', 'placeRewards')}
                </Button>
              </BodyCopy>
            </BodyCopy>
          </Carousel>
        )}

        {allCouponList.size === 0 && (
          <Row>
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            >
              <EmptyOffersList commonLabels={commonLabels} closedOverlay={closedOverlay} />
            </Col>
          </Row>
        )}
      </BodyCopy>
    ) : null;
  };

  render() {
    const {
      labels,
      commonLabels,
      handleApplyCouponFromList,
      allCouponList,
      className,
    } = this.props;
    const { detailStatus, helpStatus, selectedCoupon } = this.state;
    const couponListSize = allCouponList && allCouponList.size;
    return (
      <>
        <Row className={className}>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <BodyCopy component="div" className="couponList_title">
              <Row fullBleed>
                <Col
                  colSize={{
                    small: 4,
                    medium: 4,
                    large: 8,
                  }}
                >
                  <BodyCopy
                    className="couponList_heading"
                    fontWeight="semibold"
                    component="p"
                    fontSize="fs16"
                    data-locator="sdf"
                    fontFamily="secondary"
                  >
                    {`${getLabelValue(
                      commonLabels,
                      'lbl_my_rewards_drawerHeading',
                      'placeRewards'
                    )} (${couponListSize})`}
                  </BodyCopy>
                </Col>
                <Col
                  colSize={{
                    small: 2,
                    medium: 4,
                    large: 4,
                  }}
                >
                  {couponListSize > 0 && (
                    <BodyCopy className="view_all" component="div" textAlign="right">
                      <Anchor
                        fontSizeVariation="medium"
                        underline
                        anchorVariation="primary"
                        fontSize="fs13"
                        fontFamily="secondary"
                        dataLocator="couponcard-view_all"
                        textAlign="right"
                        onClick={this.goToWalletPage}
                        to={internalEndpoints.myWalletPage.link}
                        asPath={internalEndpoints.myWalletPage.path}
                      >
                        {getLabelValue(commonLabels, 'lbl_my_rewards_viewAll', 'placeRewards')}
                      </Anchor>
                    </BodyCopy>
                  )}
                </Col>
              </Row>

              {couponListSize > 0 && (
                <BodyCopy component="div" className="couponList_iconContainer">
                  <BodyCopy component="div" className="couponList_helpIcon">
                    ?
                  </BodyCopy>
                  <Anchor
                    fontSizeVariation="small"
                    underline
                    anchorVariation="primary"
                    fontSize="fs10"
                    fontFamily="secondary"
                    dataLocator="couponcard-helpApplyingPlaceCashlink"
                    onClick={this.toggleNeedHelpModal}
                  >
                    {getLabelValue(commonLabels, 'lbl_my_rewards_helpLink', 'placeRewards')}
                  </Anchor>
                </BodyCopy>
              )}
            </BodyCopy>
            {this.renderCarouselView()}
          </Col>
        </Row>
        <CouponDetailModal
          labels={labels}
          openState={detailStatus}
          coupon={selectedCoupon}
          onRequestClose={() => {
            this.setState({
              detailStatus: false,
            });
          }}
          onApplyCouponToBagFromList={handleApplyCouponFromList}
        />
        <CouponHelpModal
          labels={labels}
          openState={helpStatus}
          coupon={selectedCoupon}
          onRequestClose={() => {
            this.setState({
              helpStatus: false,
            });
          }}
          heading="Help Modal"
        />
      </>
    );
  }
}

MyOffersCouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  closedOverlay: PropTypes.func,
  handleErrorCoupon: PropTypes.func.isRequired,
  allCouponList: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
  isCarouselView: PropTypes.bool,
  sliceCount: PropTypes.number,
  commonLabels: PropTypes.shape({}).isRequired,
  handleApplyCouponFromList: PropTypes.func.isRequired,
};

MyOffersCouponView.defaultProps = {
  closedOverlay: () => {},
  className: '',
  isCarouselView: false,
  sliceCount: 10,
};

export default withStyles(MyOffersCouponView, styles);
export { MyOffersCouponView as MyOffersCouponViewVanilla };
