import React from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger';
import { isCanada } from '@tcp/core/src/utils';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import CouponAndPromos from '../../common/organism/CouponAndPromos';
import AirmilesBanner from '../../common/organism/AirmilesBanner';
import AddedToBagActions from '../../AddedToBagActions';
import {
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  ScrollViewWrapper,
  BonusPointsWrapper,
  BagHeaderRow,
  SflHeadingViewStyle,
  ActiveBagHeaderView,
  InActiveBagHeaderView,
  HeadingTextStyleView,
  EstimateTextStyle,
  ActiveBagHeaderTextNew,
  InActiveBagHeaderTextView,
  InActiveEstimateTextStyle,
  BagHeaderMain,
} from '../styles/BagPage.style.native';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import BAGPAGE_CONSTANTS from '../BagPage.constants';

const AnimatedBagHeaderMain = Animated.createAnimatedComponent(BagHeaderMain);

export class BagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      showCondensedHeader: false,
      height: new Animated.Value(70),
    };
    this.timer = null;
  }

  componentDidMount() {
    const { fetchLabels, totalCount, sflItems, isShowSaveForLaterSwitch } = this.props;
    fetchLabels();

    this.setState({
      activeSection:
        !totalCount && sflItems.size && isShowSaveForLaterSwitch
          ? BAGPAGE_CONSTANTS.SFL_STATE
          : BAGPAGE_CONSTANTS.BAG_STATE,
    });
  }

  componentDidUpdate() {
    const {
      isCartItemSFL,
      labels,
      isSflItemRemoved,
      isCartItemsUpdating: { isDeleting },
    } = this.props;
    const { sflSuccess, sflDeleteSuccess, itemDeleted } = labels;
    if (isCartItemSFL) {
      this.showToastMessage(sflSuccess);
    } else if (isSflItemRemoved) {
      this.showToastMessage(sflDeleteSuccess);
    } else if (isDeleting) {
      this.showToastMessage(itemDeleted);
    }
  }

  showToastMessage = message => {
    const { toastMessage, toastMessagePositionInfo } = this.props;
    toastMessage(message);
    toastMessagePositionInfo(122);
  };

  handleChangeActiveSection = sectionName => {
    const { isShowSaveForLaterSwitch } = this.props;
    if (isShowSaveForLaterSwitch) {
      this.setState({
        activeSection: sectionName,
      });
    }
  };

  setAnimation = enable => {
    const { height } = this.state;
    Animated.timing(height, {
      duration: 200,
      toValue: enable ? 70 : 0,
    }).start();
  };

  handleScroll = event => {
    const { bagStickyHeaderInterval } = this.props;
    const contentOffset = event.nativeEvent.contentOffset.y;
    if (contentOffset > 0) {
      this.setAnimation(true);
      this.setState({ showCondensedHeader: false });

      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.setAnimation(false);
        this.setState({ showCondensedHeader: true });
      }, bagStickyHeaderInterval);
    } else {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.setAnimation(true);
      this.setState({ showCondensedHeader: false });
    }
  };

  renderBagHeading() {
    const { activeSection } = this.state;
    const { labels, totalCount, orderBalanceTotal } = this.props;
    const { bagHeading } = labels;
    const bagHeadingTexts = `${bagHeading} (${totalCount})`;
    const estimateTotal = `${labels.totalLabel}: $${orderBalanceTotal.toFixed(2)}`;
    return (
      <HeadingTextStyleView>
        {activeSection === BAGPAGE_CONSTANTS.SFL_STATE ? (
          <>
            <InActiveBagHeaderTextView>{bagHeadingTexts}</InActiveBagHeaderTextView>
            <InActiveEstimateTextStyle>{estimateTotal}</InActiveEstimateTextStyle>
          </>
        ) : (
          <>
            <ActiveBagHeaderTextNew>{bagHeadingTexts}</ActiveBagHeaderTextNew>
            <EstimateTextStyle>{estimateTotal}</EstimateTextStyle>
          </>
        )}
      </HeadingTextStyleView>
    );
  }

  renderSflHeading() {
    const { activeSection } = this.state;
    const { labels, sflItems, isShowSaveForLaterSwitch } = this.props;
    if (!isShowSaveForLaterSwitch) return null;
    const { savedLaterButton } = labels;
    const headingTexts = `${savedLaterButton} (${sflItems.size})`;
    return (
      <HeadingTextStyleView>
        {activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? (
          <>
            <InActiveBagHeaderTextView>{headingTexts}</InActiveBagHeaderTextView>
            <EstimateTextStyle />
          </>
        ) : (
          <>
            <ActiveBagHeaderTextNew>{headingTexts}</ActiveBagHeaderTextNew>
            <EstimateTextStyle />
          </>
        )}
      </HeadingTextStyleView>
    );
  }

  renderOrderLedgerContainer = (isNoNEmptyBag, isBagStage) => {
    if (isNoNEmptyBag && isBagStage) {
      return (
        <RowSectionStyle>
          <OrderLedgerContainer />
        </RowSectionStyle>
      );
    }
    return <></>;
  };

  renderBonusPoints = (isUserLoggedIn, isNoNEmptyBag, isBagStage) => {
    if (isUserLoggedIn && isNoNEmptyBag && isBagStage) {
      return (
        <RowSectionStyle>
          <BonusPointsWrapper>
            <BonusPointsDays isBagPage showAccordian={false} />
          </BonusPointsWrapper>
        </RowSectionStyle>
      );
    }
    return <></>;
  };

  renderAirMiles = isBagStage => {
    if (isCanada() && isBagStage) {
      return (
        <RowSectionStyle>
          <AirmilesBanner />
        </RowSectionStyle>
      );
    }
    return <></>;
  };

  renderCouponPromos = (isNoNEmptyBag, isBagStage) => {
    if (isNoNEmptyBag && isBagStage) {
      return (
        <RowSectionStyle>
          <CouponAndPromos showAccordian={false} />
        </RowSectionStyle>
      );
    }
    return <></>;
  };

  render() {
    const { labels, showAddTobag, navigation, orderItemsCount } = this.props;
    const { handleCartCheckout, isUserLoggedIn, sflItems } = this.props;
    const isNoNEmptyBag = orderItemsCount > 0;
    const { activeSection, showCondensedHeader, height } = this.state;
    if (!labels.tagLine) {
      return <View />;
    }
    const isBagStage = activeSection === BAGPAGE_CONSTANTS.BAG_STATE;
    const isSFLStage = activeSection === BAGPAGE_CONSTANTS.SFL_STATE;
    const viewHeight = showCondensedHeader ? '74%' : '65%';
    return (
      <>
        <AnimatedBagHeaderMain style={{ height }}>
          <BagHeaderRow>
            <HeadingViewStyle
              onPress={() => {
                this.handleChangeActiveSection(BAGPAGE_CONSTANTS.BAG_STATE);
              }}
            >
              {isBagStage ? (
                <ActiveBagHeaderView>{this.renderBagHeading()}</ActiveBagHeaderView>
              ) : (
                <InActiveBagHeaderView>{this.renderBagHeading()}</InActiveBagHeaderView>
              )}
            </HeadingViewStyle>
            <SflHeadingViewStyle
              onPress={() => {
                this.handleChangeActiveSection(BAGPAGE_CONSTANTS.SFL_STATE);
              }}
            >
              {isSFLStage ? (
                <ActiveBagHeaderView>{this.renderSflHeading()}</ActiveBagHeaderView>
              ) : (
                <InActiveBagHeaderView>{this.renderSflHeading()}</InActiveBagHeaderView>
              )}
            </SflHeadingViewStyle>
          </BagHeaderRow>
        </AnimatedBagHeaderMain>
        <ScrollViewWrapper
          viewHeight={showAddTobag ? '60%' : viewHeight}
          onScroll={this.handleScroll}
        >
          <MainSection>
            {isBagStage && <ProductTileWrapper bagLabels={labels} />}
            {isSFLStage && (
              <ProductTileWrapper bagLabels={labels} sflItems={sflItems} isBagPageSflSection />
            )}
            {this.renderOrderLedgerContainer(isNoNEmptyBag, isBagStage)}
            {this.renderBonusPoints(isUserLoggedIn, isNoNEmptyBag, isBagStage)}
            {this.renderAirMiles(isBagStage)}
            {this.renderCouponPromos(isNoNEmptyBag, isBagStage)}
          </MainSection>
        </ScrollViewWrapper>

        {isBagStage && (
          <AddedToBagActions
            handleCartCheckout={handleCartCheckout}
            labels={labels}
            showAddTobag={showAddTobag}
            navigation={navigation}
            isNoNEmptyBag={isNoNEmptyBag}
          />
        )}
      </>
    );
  }
}

BagPage.propTypes = {
  labels: PropTypes.shape.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAddTobag: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  isCartItemsUpdating: PropTypes.shape({ isDeleting: PropTypes.bool.isRequired }).isRequired,
  fetchLabels: PropTypes.func.isRequired,
  orderItemsCount: PropTypes.number.isRequired,
  sflItems: PropTypes.shape([]).isRequired,
  toastMessage: PropTypes.func.isRequired,
  isCartItemSFL: PropTypes.bool.isRequired,
  isSflItemRemoved: PropTypes.bool.isRequired,
  isShowSaveForLaterSwitch: PropTypes.bool.isRequired,
  orderBalanceTotal: PropTypes.number.isRequired,
  bagStickyHeaderInterval: PropTypes.number.isRequired,
  toastMessagePositionInfo: PropTypes.func.isRequired,
};

export default InitialPropsHOC(BagPage);
