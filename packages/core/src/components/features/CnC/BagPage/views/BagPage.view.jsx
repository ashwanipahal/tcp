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

class BagPageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      showCondensedHeader: false,
    };
    this.timer = null;
    this.bagPageCondenseHeaderBind = false;
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
      const checkoutCta = document.getElementById('BagActionsContainer');
      const header = document.getElementById('bagPageHeader');
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

  getStickyPosition = () => {
    const header = document.getElementById('bagPageHeader');
    return header && header.offsetTop;
  };

  getStickyPositionCheckoutCta = () => {
    const checkoutCta = document.getElementById('BagActionsContainer');
    return checkoutCta && checkoutCta.offsetTop;
  };

  addScrollListener = () => {
    const checkoutCtaStickyPos = this.getStickyPositionCheckoutCta();
    window.addEventListener(
      'scroll',
      throttle(this.handleBagHeaderScroll.bind(this, checkoutCtaStickyPos), 100)
    );
  };

  addScrollListenerMobileHeader = () => {
    const stickyPos = this.getStickyPosition();
    window.addEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
  };

  removeScrollListener = () => {
    const stickyPos = this.getStickyPosition();
    const checkoutCtaStickyPos = this.getStickyPositionCheckoutCta();
    window.removeEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
    window.removeEventListener(
      'scroll',
      throttle(this.handleBagHeaderScroll.bind(this, checkoutCtaStickyPos), 100)
    );
  };

  getPageLevelHeaderHeight = () => {
    return document.getElementsByClassName('condensed-header')[0]
      ? document.getElementsByClassName('condensed-header')[0].offsetHeight
      : 0;
  };

  handleScroll = sticky => {
    const { bagStickyHeaderInterval } = this.props;
    const condensedBagHeader = document.getElementById('bagPageHeader');
    const condensedPageHeaderHeight = this.getPageLevelHeaderHeight();
    if (window.pageYOffset > sticky - condensedPageHeaderHeight) {
      document.getElementById(
        'bagPageHeader'
      ).style.top = `${condensedPageHeaderHeight.toString()}px`;
      condensedBagHeader.classList.add('stickyBagHeader');
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        condensedBagHeader.classList.remove('stickyBagHeader');
      }, bagStickyHeaderInterval);
    } else {
      condensedBagHeader.classList.remove('stickyBagHeader');
    }
  };

  handleBagHeaderScroll = sticky => {
    const condensedPageHeaderHeight = this.getPageLevelHeaderHeight();
    if (window.pageYOffset > sticky + 30) {
      this.setState({ showCondensedHeader: true }, () => {
        document.getElementById(
          'bag-condensed-header'
        ).style.top = `${condensedPageHeaderHeight.toString()}px`;
      });
    } else {
      this.setState({ showCondensedHeader: false });
    }
  };

  renderLeftSection = () => {
    const { labels, sflItems, isShowSaveForLaterSwitch } = this.props;
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
            } ${sflItems.size === 0 ? 'hide-on-desktop' : ''}`}
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
      <div id="BagActionsContainer">
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
    const { labels, orderBalanceTotal, totalCount, showAddTobag, handleCartCheckout } = this.props;
    const { showCondensedHeader } = this.state;
    if (!showCondensedHeader) return null;
    return (
      <Row className="bag-condensed-header" id="bag-condensed-header">
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
                {`${labels.totalLabel}: $${orderBalanceTotal.toFixed(2)}`}
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
    } = this.props;
    const { activeSection } = this.state;
    const isNoNEmptyBag = orderItemsCount > 0;
    const isNonEmptySFL = sflItems.size > 0;
    return (
      <div className={className}>
        {this.stickyBagCondensedHeader()}
        <Row tagName="header" id="bagPageHeader">
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
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs10"
              className={`estimatedHeaderText ${
                activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? 'activeEstimatedHeader' : ''
              }`}
            >
              {`${labels.totalLabel}: $${orderBalanceTotal.toFixed(2)}`}
            </BodyCopy>
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
        <CnCTemplate
          leftSection={this.renderLeftSection}
          showLeftSection={isNoNEmptyBag && activeSection === BAGPAGE_CONSTANTS.BAG_STATE}
          bagActions={this.renderActions}
          isUserLoggedIn={isUserLoggedIn}
          isGuest={isGuest}
          showAccordian={false}
          isNonEmptySFL={isNonEmptySFL}
        />
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
};

export default withStyles(BagPageView, styles);
export { BagPageView as BagPageViewVanilla };
