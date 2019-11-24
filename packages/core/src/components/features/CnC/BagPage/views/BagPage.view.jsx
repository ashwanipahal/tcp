import React from 'react';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import { PriceCurrency } from '@tcp/core/src/components/common/molecules';
import { getSflItemCount, getCartItemCount } from '@tcp/core/src/utils/cookie.util';
import { getSiteId } from '@tcp/core/src/utils/utils.web';

import withRefWrapper from '../../../../common/hoc/withRefWrapper';
import withHotfix from '../../../../common/hoc/withHotfix';

import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import withStyles from '../../../../common/hoc/withStyles';
import Row from '../../../../common/atoms/Row';
import Heading from '../../../../common/atoms/Heading';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import AddedToBagActions from '../../AddedToBagActions';
import CnCTemplate from '../../common/organism/CnCTemplate';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import styles, { addedToBagActionsStyles, recommendationStyles } from '../styles/BagPage.style';
import BagPageUtils from './Bagpage.utils';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import InformationHeader from '../../common/molecules/InformationHeader';
import { isClient } from '../../../../../utils';
import BagPageAnalytics from './BagPageAnalytics.view';

class BagPageView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = BagPageUtils.getDefaultStateValues();
    this.bagPageHeader = null;
    this.bagActionsContainer = null;
    this.bagCondensedHeader = null;
    this.timer = null;
    this.bagPageCondenseHeaderBind = false;
    this.getBagPageHeaderRef = this.getBagPageHeaderRef.bind(this);
    this.getBagActionsContainerRef = this.getBagActionsContainerRef.bind(this);
    this.getBagCondensedHeader = this.getBagCondensedHeader.bind(this);
  }

  componentDidMount() {
    if (isClient()) {
      window.addEventListener('beforeunload', BagPageUtils.onPageUnload);
    }
    const { setVenmoPaymentInProgress, totalCount, sflItems } = this.props;
    const { isShowSaveForLaterSwitch } = this.props;
    setVenmoPaymentInProgress(false);

    const siteId = getSiteId() && getSiteId().toUpperCase();
    const cartTotalCount = getCartItemCount();
    const sflTotalCount = getSflItemCount(siteId);
    this.setState({
      activeSection:
        !cartTotalCount && sflTotalCount && isShowSaveForLaterSwitch
          ? BAGPAGE_CONSTANTS.SFL_STATE
          : BAGPAGE_CONSTANTS.BAG_STATE,
    });
  }

  componentDidUpdate() {
    /* istanbul ignore else */
    const { isMobile } = this.props;
    if (!this.bagPageCondenseHeaderBind) {
      const checkoutCta = this.bagActionsContainer;
      const header = this.bagPageHeader;
      if (checkoutCta && !isMobile) {
        this.addScrollListener();
        this.bagPageCondenseHeaderBind = true;
      } else if (header && isMobile) {
        this.addScrollListenerMobileHeader();
        this.bagPageCondenseHeaderBind = true;
      }
    }
  }

  componentWillUnmount() {
    if (isClient()) {
      window.removeEventListener('scroll', this.scrollEventLister);
      window.removeEventListener('beforeunload', BagPageUtils.onPageUnload);
    }
  }

  setHeaderErrorState = (state, ...params) => {
    this.setState({ headerError: true, params });
  };

  getBagPageHeaderRef(ref) {
    this.bagPageHeader = ref;
  }

  getBagActionsContainerRef(ref) {
    this.bagActionsContainer = ref;
  }

  getBagCondensedHeader(ref) {
    this.bagCondensedHeader = ref;
  }

  addScrollListener = () => {
    const checkoutCtaStickyPos = BagPageUtils.getElementStickyPosition(this.bagActionsContainer);
    this.scrollEventLister = this.handleBagHeaderScroll.bind(this, checkoutCtaStickyPos);
    BagPageUtils.bindScrollEvent(this.scrollEventLister);
  };

  addScrollListenerMobileHeader = () => {
    const stickyPos = BagPageUtils.getElementStickyPosition(this.bagPageHeader);
    this.scrollEventLister = this.handleScroll.bind(this, stickyPos);
    BagPageUtils.bindScrollEvent(this.scrollEventLister);
  };

  handleScroll = sticky => {
    const { bagStickyHeaderInterval } = this.props;
    const condensedBagHeader = this.bagPageHeader;
    const condensedPageHeaderHeight = BagPageUtils.getPageLevelHeaderHeight();
    if (
      isClient() &&
      condensedBagHeader &&
      window.pageYOffset > sticky - condensedPageHeaderHeight
    ) {
      condensedBagHeader.style.top = `${condensedPageHeaderHeight.toString()}px`;
      this.setState({ showStickyHeaderMob: true });
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.setState({ showStickyHeaderMob: false });
      }, bagStickyHeaderInterval);
    } else {
      this.setState({ showStickyHeaderMob: false });
    }
  };

  handleBagHeaderScroll = sticky => {
    const condensedPageHeaderHeight = BagPageUtils.getPageLevelHeaderHeight();
    if (isClient() && window.pageYOffset > sticky + 30) {
      this.setState({ showCondensedHeader: true, loadPaypalStickyHeader: true }, () => {
        this.bagCondensedHeader.firstElementChild.style.top = `${condensedPageHeaderHeight.toString()}px`;
      });
    } else {
      this.setState({ showCondensedHeader: false });
    }
  };

  wrapSection = (Component, orderItemsCount) => {
    const isNoNEmptyBag = orderItemsCount > 0;
    const colSizes = { small: 6, medium: 5, large: 8 };
    if (!isNoNEmptyBag) {
      return <Col colSize={colSizes}>{Component}</Col>;
    }
    return Component;
  };

  renderRecommendations = () => {
    const { sflItems, orderItemsCount } = this.props;
    const hideRec = orderItemsCount === 0 && sflItems.size > 0;
    const isNoNEmptyBag = orderItemsCount > 0;
    let carouselOptions;
    if (isNoNEmptyBag) {
      carouselOptions = BagPageUtils.CarouselOptions;
    }
    return (
      <>
        {!hideRec ? (
          <Recommendations
            page={Constants.RECOMMENDATIONS_PAGES_MAPPING.BAG}
            variations="moduleO"
            inheritedStyles={recommendationStyles}
            carouselConfigProps={carouselOptions}
          />
        ) : null}
        {this.renderRecommendationsForRecent()}
      </>
    );
  };

  renderRecommendationsForRecent = () => {
    const { labels, orderItemsCount } = this.props;
    const isNoNEmptyBag = orderItemsCount > 0;
    let carouselOptions;
    if (isNoNEmptyBag) {
      carouselOptions = BagPageUtils.CarouselOptions;
    }
    return (
      <div className="recentlyViewed">
        <Recommendations
          page={Constants.RECOMMENDATIONS_PAGES_MAPPING.BAG}
          headerLabel={labels.recentlyViewed}
          variations="moduleO"
          portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
          inheritedStyles={recommendationStyles}
          carouselConfigProps={carouselOptions}
        />
      </div>
    );
  };

  renderLeftSection = () => {
    const { labels, sflItems, orderItemsCount } = this.props;
    const { isShowSaveForLaterSwitch, isSflItemRemoved } = this.props;
    const { activeSection } = this.state;
    const myBag = 'myBag';
    return (
      <React.Fragment>
        <div
          className={`bag-section ${
            activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? 'activeSection' : 'inActiveSection'
          }`}
        >
          <ProductTileWrapper
            bagLabels={labels}
            pageView={myBag}
            showPlccApplyNow
            setHeaderErrorState={this.setHeaderErrorState}
          />
        </div>
        {isShowSaveForLaterSwitch &&
          this.wrapSection(
            <div
              className={`save-for-later-section ${
                activeSection === BAGPAGE_CONSTANTS.SFL_STATE ? 'activeSection' : 'inActiveSection'
              } ${sflItems.size === 0 && !isSflItemRemoved ? 'hide-on-desktop' : ''}`}
            >
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight={['semibold']}
                className="elem-mt-XXL elem-mb-XL save-for-later-section-heading"
              >
                {`${labels.savedForLaterText} (${sflItems.size})`}
              </BodyCopy>
              <ProductTileWrapper
                bagLabels={labels}
                pageView={myBag}
                sflItems={sflItems}
                showPlccApplyNow={false}
                isBagPageSflSection
              />
            </div>,
            orderItemsCount
          )}
        {this.renderRecommendations()}
        <BagPageAnalytics {...this.props} />
      </React.Fragment>
    );
  };

  renderActions = () => {
    const {
      labels,
      showAddTobag,
      handleCartCheckout,
      isMobile,
      isBagPage,
      bagLoading,
    } = this.props;

    return (
      <div ref={this.getBagActionsContainerRef}>
        <AddedToBagActions
          labels={labels}
          showAddTobag={showAddTobag}
          inheritedStyles={addedToBagActionsStyles}
          handleCartCheckout={handleCartCheckout}
          paypalButtonHeight={isMobile ? 42 : 48}
          containerId="paypal-button-container-bag"
          isBagPage={isBagPage}
          bagLoading={bagLoading}
        />
      </div>
    );
  };

  stickyBagCondensedHeader = () => {
    const { labels, showAddTobag, handleCartCheckout, isBagPage, bagLoading } = this.props;
    const { orderBalanceTotal, totalCount, orderItemsCount } = this.props;
    const { showCondensedHeader } = this.state;
    // if (!showCondensedHeader) return null;
    return (
      <div
        ref={this.getBagCondensedHeader}
        className={`${
          orderItemsCount === 0 || orderItemsCount === false || !showCondensedHeader
            ? 'hidden-condensed-header'
            : ''
        }`}
      >
        <Row className="bag-condensed-header">
          <Row className="content-wrapper">
            <Col className="bagHeaderText" colSize={{ large: 8, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs16" fontWeight="semibold">
                {`${labels.bagHeading} (${totalCount})`}
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs13"
                  component="span"
                  className="elem-ml-SM"
                >
                  {`${labels.totalLabel}: `}
                  <PriceCurrency price={orderBalanceTotal} />
                </BodyCopy>
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 4, small: 3 }}>
              <AddedToBagActions
                labels={labels}
                showAddTobag={showAddTobag}
                inheritedStyles={addedToBagActionsStyles}
                handleCartCheckout={handleCartCheckout}
                isBagPageStickyHeader
                paypalButtonHeight={42}
                containerId="paypal-button-container-bag-header"
                isBagPage={isBagPage}
                bagLoading={bagLoading}
              />
            </Col>
          </Row>
        </Row>
      </div>
    );
  };

  getHeaderError = ({
    labels,
    orderItems,
    pageView,
    isUnavailable,
    isSoldOut,
    getUnavailableOOSItems,
    confirmRemoveCartItem,
    isBagPageSflSection,
    isCartItemSFL,
    isCartItemsUpdating,
    isSflItemRemoved,
  }) => {
    return (
      <InformationHeader
        labels={labels}
        orderItems={orderItems}
        pageView={pageView}
        isUnavailable={isUnavailable}
        isSoldOut={isSoldOut}
        getUnavailableOOSItems={getUnavailableOOSItems}
        confirmRemoveCartItem={confirmRemoveCartItem}
        isBagPageSflSection={isBagPageSflSection}
        isCartItemSFL={isCartItemSFL}
        isCartItemsUpdating={isCartItemsUpdating}
        isSflItemRemoved={isSflItemRemoved}
      />
    );
  };

  renderHeaderError = (headerError, params) => {
    return headerError && this.getHeaderError(params[0]);
  };

  render() {
    const { className, labels, totalCount, orderItemsCount, isUserLoggedIn, isGuest } = this.props;
    const { sflItems, isShowSaveForLaterSwitch, orderBalanceTotal } = this.props;
    const { activeSection, showStickyHeaderMob, loadPaypalStickyHeader, headerError } = this.state;
    const { params } = this.state;
    const isNoNEmptyBag = orderItemsCount > 0;
    const isNonEmptySFL = sflItems.size > 0;
    const isNotLoaded = orderItemsCount === false;
    return (
      <div className={className}>
        {loadPaypalStickyHeader && this.stickyBagCondensedHeader()}
        <div
          ref={this.getBagPageHeaderRef}
          className={`${showStickyHeaderMob ? 'stickyBagHeader' : ''}`}
        >
          <Row tagName="header" className="cartPageTitleHeader">
            <Col
              colSize={{ small: 3, medium: 4, large: 6 }}
              className="left-sec"
              onClick={() => {
                BagPageUtils.handleChangeActiveSection(BAGPAGE_CONSTANTS.BAG_STATE, this);
              }}
            >
              <Heading
                component="h2"
                variant="h6"
                fontSize="fs16"
                color="text.primary"
                className={`bag-header ${
                  activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? 'activeHeader' : ''
                }`}
              >
                {`${labels.bagHeading} (${totalCount})`}
              </Heading>
              {totalCount > 0 && (
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs10"
                  className={`estimatedHeaderText ${
                    activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? 'activeEstimatedHeader' : ''
                  }`}
                >
                  {`${labels.totalLabel}: `}
                  <PriceCurrency price={orderBalanceTotal} />
                </BodyCopy>
              )}
            </Col>
            {isShowSaveForLaterSwitch && (
              <Col
                colSize={{ small: 3, medium: 4, large: 6 }}
                className="left-sec"
                onClick={() => {
                  BagPageUtils.handleChangeActiveSection(BAGPAGE_CONSTANTS.SFL_STATE, this);
                }}
              >
                <Heading
                  variant="h6"
                  fontSize="fs16"
                  color="text.primary"
                  className={`bag-header bag-header-sfl ${
                    activeSection === BAGPAGE_CONSTANTS.SFL_STATE ? 'activeHeader' : ''
                  }`}
                >
                  {`${labels.savedLaterButton} (${sflItems.size})`}
                </Heading>
              </Col>
            )}
          </Row>

          {this.renderHeaderError(headerError, params)}
        </div>

        <CnCTemplate
          leftSection={this.renderLeftSection}
          showLeftSection={
            (isNoNEmptyBag && activeSection === BAGPAGE_CONSTANTS.BAG_STATE) || isNotLoaded
          }
          // isNotLoaded={!isNotLoaded}
          bagActions={this.renderActions}
          isUserLoggedIn={isUserLoggedIn}
          isGuest={isGuest}
          showAccordian={false}
          isNonEmptySFL={isNonEmptySFL}
          pageCategory={BAGPAGE_CONSTANTS.BAG_PAGE}
        />
        <QuickViewModal />
      </div>
    );
  }
}

BagPageView.propTypes = BagPageUtils.BagPagePropTypes;

/**
 * Hotfix-Aware Component. The use of `withRefWrapper` and `withHotfix`
 * below are just for making the page hotfix-aware. The "BagPage"
 * argument defines the displayName of the hotfix-aware component.
 */
const BagPageViewWithRefWrapper = withRefWrapper(BagPageView, 'div', 'BagPage');
const BagPageViewWithHotfix = withHotfix(BagPageViewWithRefWrapper);

export default withStyles(BagPageViewWithHotfix, styles);
export { BagPageView as BagPageViewVanilla };
