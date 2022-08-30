import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from '@tcp/core/src/components/common/atoms';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary/errorBoundary';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { setSessionStorage, getSessionStorage } from '@tcp/core/src/utils/utils.web';
import { isTCP, getAPIConfig } from '@tcp/core/src/utils/utils';
import CountrySelector from '../../Header/molecules/CountrySelector';
import {
  FooterMiddleMobile,
  FooterMiddleDesktop,
  LegalLinks,
  Copyright,
  FooterTopCandidateA,
  FooterTopCandidateB,
} from '../molecules';
import { EmailSignupModal, SmsSignupModal } from '../../../../common/molecules';
import style from '../Footer.style';
import FOOTER_CONSTANTS from '../Footer.constants';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFooterTopCandidateB: false,
      isAppWebView: getAPIConfig().isAppChannel,
    };
  }

  componentDidMount() {
    const { isLoggedIn, isLocationEnabledForGuest, isLocationEnabledForLoggedInUser } = this.props;
    if (
      (isLocationEnabledForGuest === 'TRUE' && navigator && navigator.geolocation) ||
      (isLocationEnabledForLoggedInUser === 'TRUE' &&
        isLoggedIn &&
        navigator &&
        navigator.geolocation)
    ) {
      this.getPosition();
    }
    const { pageName } = this.props;
    // TODO: Need to change this when proper solution for A/B test come
    if (window.location.search.match('cand-b')) {
      this.setState({ showFooterTopCandidateB: true });
    } else {
      this.setState({ showFooterTopCandidateB: false });
    }
    if (pageName === 'homepage') {
      this.subscriptionPopUpOnPageLoad();
    }
  }

  getPosition = () => {
    const isSafariBrowser =
      navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    const Latitude = 'Latitude';
    const Longitude = 'Longitude';
    if (isSafariBrowser) {
      const latitude = getSessionStorage(Latitude);
      const longitude = getSessionStorage(Longitude);
      if (!latitude && !longitude) {
        navigator.geolocation.getCurrentPosition(pos => {
          setSessionStorage({ key: Latitude, value: pos.coords.latitude });
          setSessionStorage({ key: Longitude, value: pos.coords.longitude });
        });
      }
    } else {
      navigator.geolocation.getCurrentPosition(() => {});
    }
  };

  /**
   * @function subscriptionPopUpOnPageLoad function to show
   * the email sign up modal on first time visit of the user
   * and SMS sign up modal on second visit of the user
   * using cookies for email(@cookie COOKIE_EMAIL_PERSISTENT and @cookie COOKIE_EMAIL_SESSION)
   * and sms(@cookie COOKIE_SMS_PERSISTENT) sign up modals
   */
  subscriptionPopUpOnPageLoad = () => {
    const { openEmailSignUpModal, openSmsSignUpModal } = this.props;
    const {
      COOKIE_EMAIL_PERSISTENT,
      COOKIE_EMAIL_SESSION,
      COOKIE_SMS_PERSISTENT,
      COOKIE_MAX_AGE,
      TCP_SUB_DOMAIN,
      GYMBOREE_SUB_DOMAIN,
    } = FOOTER_CONSTANTS;
    /**
     * @function domain check for the domain setting in cookie
     * using @function isTcp from utils
     */
    const domain = isTCP() ? TCP_SUB_DOMAIN : GYMBOREE_SUB_DOMAIN;

    /**
     * @function checkCookieExist function to check the existence
     * of cookie in the browser by returning @BOOLEAN
     */
    const checkCookieExist = name => document.cookie.indexOf(name) > -1;

    /**
     * condition checks for the existence of @cookie COOKIE_EMAIL_PERSISTENT
     * if false, then creates new cookie @cookie COOKIE_EMAIL_PERSISTENT and
     * COOKIE_EMAIL_SESSION and invoke @function openEmailSignUpModal
     * else checks for existence of @cookie COOKIE_EMAIL_PERSISTENT and non-existence
     * of @cookie COOKIE_SMS_PERSISTENT
     * if the above condition evaluates true then invoke
     * @function openSmsSignUpModal and set @cookie COOKIE_SMS_PERSISTENT
     */
    if (!checkCookieExist(COOKIE_EMAIL_PERSISTENT)) {
      document.cookie = `${COOKIE_EMAIL_PERSISTENT}=true; domain=${domain}; max-age=${COOKIE_MAX_AGE}`;
      document.cookie = `${COOKIE_EMAIL_SESSION}=true; domain=${domain};`;
      openEmailSignUpModal();
    } else if (
      checkCookieExist(COOKIE_EMAIL_PERSISTENT) &&
      !checkCookieExist(COOKIE_SMS_PERSISTENT)
    ) {
      document.cookie = `${COOKIE_SMS_PERSISTENT}=true; domain=${domain}; max-age=${COOKIE_MAX_AGE}`;
      openSmsSignUpModal();
    }
  };

  render() {
    const { props } = this;
    const {
      className,
      copyrightText,
      legalLinks,
      navLinks,
      referenceID,
      getUserInfoAction,
      getOrderDetailAction,
      emailSignup,
      smsSignup,
      loginModalMountedState,
      setLoginModalMountState,
      isLoggedIn,
      linkConfig,
      footerActionCreator,
      isNavigationFooter,
    } = props;
    const { showFooterTopCandidateB, isAppWebView } = this.state;

    return !isAppWebView ? (
      <footer className={`${className} footer-global`}>
        <Row className="footer-candidate-wrapper" fullBleed={!isNavigationFooter}>
          {isNavigationFooter && (
            <Col
              colSize={{
                large: 12,
                medium: 8,
                small: 6,
              }}
            >
              <div className="divider hide-in-large-up" />
            </Col>
          )}
          {showFooterTopCandidateB ? (
            <FooterTopCandidateB isNavigationFooter={isNavigationFooter} {...props} />
          ) : (
            <FooterTopCandidateA isNavigationFooter={isNavigationFooter} {...props} />
          )}
          <EmailSignupModal buttonConfig={emailSignup} />
          <SmsSignupModal buttonConfig={smsSignup} />
        </Row>
        <Row className="footer-middle mobile" fullBleed>
          <FooterMiddleMobile
            className={className}
            navLinkItems={navLinks}
            isLoggedIn={isLoggedIn}
            linkConfig={linkConfig}
            footerActionCreator={footerActionCreator}
          />
        </Row>
        <Row className="content-wrapper" fullBleed>
          <Row className="footer-middle desktop">
            <FooterMiddleDesktop
              className={className}
              navLinks={navLinks}
              loginModalMountedState={loginModalMountedState}
              setLoginModalMountState={setLoginModalMountState}
              isLoggedIn={isLoggedIn}
              linkConfig={linkConfig}
              footerActionCreator={footerActionCreator}
            />
          </Row>
        </Row>
        <div className="footer-bottom">
          <Row className="content-wrapper">
            <Row className="fullbleed-mobile">
              <Col
                className="footer-bottom__slot--1 default-offset"
                colSize={{
                  large: 3,
                  medium: 8,
                  small: 6,
                }}
              >
                <Copyright>{copyrightText}</Copyright>
                <div className="poc-hide">
                  <Button onClick={getUserInfoAction}>Get Registered User Info</Button>
                  <Button onClick={getOrderDetailAction}>Get Order detail</Button>
                </div>
              </Col>
              <Col
                className="footer-bottom__slot--2 default-offset"
                colSize={{
                  large: 7,
                  medium: 8,
                  small: 6,
                }}
              >
                <LegalLinks links={legalLinks} />
              </Col>
              <Col
                className="footer-bottom__slot--3 default-offset"
                colSize={{
                  large: 2,
                  medium: 8,
                  small: 6,
                }}
              >
                <CountrySelector showInFooter />
              </Col>
            </Row>
            <Row fullBleed>
              <Col
                colSize={{
                  large: 12,
                  medium: 8,
                  small: 6,
                }}
              >
                <BodyCopy className="reference-id" fontSize="fs32">
                  {referenceID}
                </BodyCopy>
              </Col>
            </Row>
          </Row>
        </div>
      </footer>
    ) : null;
  }
}

Footer.propTypes = {
  className: PropTypes.string.isRequired,
  copyrightText: PropTypes.string,
  navLinks: PropTypes.shape({}),
  legalLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.text,
    })
  ),
  referenceID: PropTypes.string,
  getUserInfoAction: PropTypes.func.isRequired,
  openEmailSignUpModal: PropTypes.func,
  openSmsSignUpModal: PropTypes.func,
  getOrderDetailAction: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  linkConfig: PropTypes.shape({
    'track-order': PropTypes.func,
    favorites: PropTypes.func,
    'log-out': PropTypes.func,
    'login-account': PropTypes.func,
    'create-account': PropTypes.func,
  }).isRequired,
  footerActionCreator: PropTypes.func.isRequired,
  pageName: PropTypes.string,
  isNavigationFooter: PropTypes.bool,
  isLocationEnabledForGuest: PropTypes.bool,
  isLocationEnabledForLoggedInUser: PropTypes.bool,
};

Footer.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  navLinks: [],
  referenceID: '',
  isLoggedIn: false,
  pageName: '',
  openEmailSignUpModal: () => {},
  openSmsSignUpModal: () => {},
  isNavigationFooter: false,
  isLocationEnabledForGuest: true,
  isLocationEnabledForLoggedInUser: true,
};

export default withStyles(errorBoundary(Footer), style);
export { Footer as FooterVanilla };
