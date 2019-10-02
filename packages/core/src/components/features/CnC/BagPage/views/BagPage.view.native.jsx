import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
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
} from '../styles/BagPage.style.native';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BagPageUtils from './Bagpage.utils';
import { isClient } from '../../../../../utils';

class BagPage extends React.Component {
  bagPageHeader = React.createRef();

  itemStyle = {
    position: 'relative',
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      showCondensedHeader: false,
    };
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
      toastMessage,
      isCartItemSFL,
      labels,
      isSflItemRemoved,
      isCartItemsUpdating: { isDeleting },
    } = this.props;
    const { sflSuccess, sflDeleteSuccess, itemDeleted } = labels;
    if (isCartItemSFL) {
      toastMessage(sflSuccess);
    } else if (isSflItemRemoved) {
      toastMessage(sflDeleteSuccess);
    } else if (isDeleting) {
      toastMessage(itemDeleted);
    }
    const header = this.bagPageHeader;
    if (header) {
      this.addScrollListener();
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  handleChangeActiveSection = sectionName => {
    const { isShowSaveForLaterSwitch } = this.props;
    if (isShowSaveForLaterSwitch) {
      this.setState({
        activeSection: sectionName,
      });
    }
  };

  addScrollListener = () => {
    const stickyPos = BagPageUtils.getElementStickyPosition(this.bagPageHeader);
    BagPageUtils.bindScrollEvent(this.handleScroll.bind(this, stickyPos));
  };

  removeScrollListener = () => {
    const stickyPos = BagPageUtils.getElementStickyPosition(this.bagPageHeader);
    window.removeEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
  };

  handleScroll = sticky => {
    const { bagStickyHeaderInterval } = this.props;
    const condensedBagHeader = this.bagPageHeader;
    const condensedPageHeaderHeight = BagPageUtils.getPageLevelHeaderHeight();
    if (isClient() && window.pageYOffset > sticky - condensedPageHeaderHeight) {
      condensedBagHeader.style.top = `${condensedPageHeaderHeight.toString()}px`;
      this.setState({ showCondensedHeader: true });
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.setState({ showCondensedHeader: false });
      }, bagStickyHeaderInterval);
    } else {
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
    const { activeSection, showCondensedHeader } = this.state;
    if (!labels.tagLine) {
      return <View />;
    }
    const isBagStage = activeSection === BAGPAGE_CONSTANTS.BAG_STATE;
    const isSFLStage = activeSection === BAGPAGE_CONSTANTS.SFL_STATE;
    return (
      <>
        <ScrollViewWrapper showAddTobag={showAddTobag}>
          <BagHeaderRow ref={this.bagPageHeader} style={showCondensedHeader ? this.itemStyle : ''}>
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
};

export default InitialPropsHOC(BagPage);
