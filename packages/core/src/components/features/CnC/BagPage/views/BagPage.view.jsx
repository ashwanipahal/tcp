import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import withStyles from '../../../../common/hoc/withStyles';
import Heading from '../../../../common/atoms/Heading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import AddedToBagActions from '../../AddedToBagActions';
import CnCTemplate from '../../common/organism/CnCTemplate';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import styles, { addedToBagActionsStyles } from '../styles/BagPage.style';
import { isClient } from '../../../../../utils';
import BagPageUtils from './Bagpage.utils';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';

class BagPageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      showCondensedHeader: false,
      showStickyHeaderMob: false,
    };
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
    const {
      setVenmoPaymentInProgress,
      totalCount,
      sflItems,
      isShowSaveForLaterSwitch,
    } = this.props;
    setVenmoPaymentInProgress(false);

    this.setState({
      activeSection:
        !totalCount && sflItems.size && isShowSaveForLaterSwitch
          ? BAGPAGE_CONSTANTS.SFL_STATE
          : BAGPAGE_CONSTANTS.BAG_STATE,
    });
  }

  componentDidUpdate() {
    if (!this.bagPageCondenseHeaderBind) {
      const checkoutCta = this.bagActionsContainer;
      const header = this.bagPageHeader;
      if (checkoutCta) {
        this.addScrollListener();
        this.bagPageCondenseHeaderBind = true;
      } else if (header) {
        this.addScrollListenerMobileHeader();
      }
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

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
    BagPageUtils.bindScrollEvent(this.handleBagHeaderScroll.bind(this, checkoutCtaStickyPos));
  };

  addScrollListenerMobileHeader = () => {
    const stickyPos = BagPageUtils.getElementStickyPosition(this.bagPageHeader);
    BagPageUtils.bindScrollEvent(this.handleScroll.bind(this, stickyPos));
  };

  removeScrollListener = () => {
    const stickyPos = BagPageUtils.getElementStickyPosition(this.bagPageHeader);
    const checkoutCtaStickyPos = BagPageUtils.getElementStickyPosition(this.bagActionsContainer);
    window.removeEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
    window.removeEventListener(
      'scroll',
      throttle(this.handleBagHeaderScroll.bind(this, checkoutCtaStickyPos), 100)
    );
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
      this.setState({ showCondensedHeader: true }, () => {
        this.bagCondensedHeader.firstElementChild.style.top = `${condensedPageHeaderHeight.toString()}px`;
      });
    } else {
      this.setState({ showCondensedHeader: false });
    }
  };

  renderLeftSection = () => {
    const { labels, sflItems, isShowSaveForLaterSwitch, isSflItemRemoved } = this.props;
    const { activeSection } = this.state;
    const myBag = 'myBag';
    return (
      <React.Fragment>
        <div
          className={`bag-section ${
            activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? 'activeSection' : 'inActiveSection'
          }`}
        >
          <ProductTileWrapper bagLabels={labels} pageView={myBag} showPlccApplyNow />
        </div>
        {isShowSaveForLaterSwitch && (
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
          </div>
        )}
      </React.Fragment>
    );
  };

  renderActions = () => {
    const { labels, showAddTobag, handleCartCheckout } = this.props;

    return (
      <div ref={this.getBagActionsContainerRef}>
        <AddedToBagActions
          labels={labels}
          showAddTobag={showAddTobag}
          inheritedStyles={addedToBagActionsStyles}
          handleCartCheckout={handleCartCheckout}
        />
      </div>
    );
  };

  handleChangeActiveSection = sectionName => {
    this.setState({
      activeSection: sectionName,
    });
  };

  stickyBagCondensedHeader = () => {
    const {
      labels,
      orderBalanceTotal,
      totalCount,
      showAddTobag,
      handleCartCheckout,
      orderItemsCount,
      currencySymbol,
    } = this.props;
    const { showCondensedHeader } = this.state;
    if (!showCondensedHeader) return null;
    return (
      <div
        ref={this.getBagCondensedHeader}
        className={`${orderItemsCount === 0 ? 'hidden-condensed-header' : ''}`}
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
                  {`${labels.totalLabel}: ${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
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
              />
            </Col>
          </Row>
        </Row>
      </div>
    );
  };

  render() {
    const {
      className,
      labels,
      totalCount,
      orderItemsCount,
      isUserLoggedIn,
      isGuest,
      sflItems,
      isShowSaveForLaterSwitch,
      orderBalanceTotal,
      currencySymbol,
    } = this.props;
    const { activeSection, showStickyHeaderMob } = this.state;
    const isNoNEmptyBag = orderItemsCount > 0;
    const isNonEmptySFL = sflItems.size > 0;
    return (
      <div className={className}>
        {this.stickyBagCondensedHeader()}
        <div
          ref={this.getBagPageHeaderRef}
          className={`${showStickyHeaderMob ? 'stickyBagHeader' : ''}`}
        >
          <Row tagName="header">
            <Col
              colSize={{ small: 3, medium: 4, large: 6 }}
              className="left-sec"
              onClick={() => {
                this.handleChangeActiveSection(BAGPAGE_CONSTANTS.BAG_STATE);
              }}
            >
              <Heading
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
                  {`${labels.totalLabel}: ${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
                </BodyCopy>
              )}
            </Col>
            {isShowSaveForLaterSwitch && (
              <Col
                colSize={{ small: 3, medium: 4, large: 6 }}
                className="left-sec"
                onClick={() => {
                  this.handleChangeActiveSection(BAGPAGE_CONSTANTS.SFL_STATE);
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
        </div>
        <CnCTemplate
          leftSection={this.renderLeftSection}
          showLeftSection={isNoNEmptyBag && activeSection === BAGPAGE_CONSTANTS.BAG_STATE}
          bagActions={this.renderActions}
          isUserLoggedIn={isUserLoggedIn}
          isGuest={isGuest}
          showAccordian={false}
          isNonEmptySFL={isNonEmptySFL}
        />
        <QuickViewModal fromBagPage />
      </div>
    );
  }
}

BagPageView.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  orderItemsCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAddTobag: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isGuest: PropTypes.bool.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  sflItems: PropTypes.shape([]).isRequired,
  setVenmoPaymentInProgress: PropTypes.func.isRequired,
  isShowSaveForLaterSwitch: PropTypes.bool.isRequired,
  orderBalanceTotal: PropTypes.number.isRequired,
  bagStickyHeaderInterval: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isSflItemRemoved: PropTypes.bool.isRequired,
};

export default withStyles(BagPageView, styles);
export { BagPageView as BagPageViewVanilla };
