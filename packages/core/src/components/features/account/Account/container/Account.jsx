import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import MyAccountLayout from '../views/MyAccountLayout.view';
import AccountComponentMapping from '../AccountComponentMapping';
import accountPageNameMapping from '../AccountPageNameMapping';
import utils, { routerPush } from '../../../../../utils';
import { getAccountNavigationState, getLabels } from './Account.selectors';
import { getAccountNavigationList, initActions } from './Account.actions';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import { trackPageView, setClickAnalyticsData } from '../../../../../analytics/actions';

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for left nav, needs an entry in AccountComponentMapping file.
 * @param {router} router Router object to get the query key
 */

const excludeRouteMapping = ['/TrackOrder'];
const accountPagesMapping = [
  'account-overview',
  'place-rewards',
  'wallet',
  'extra-points',
  'orders',
  'profile',
  'address-book',
  'payment',
  'my-preference',
  'rewardsCreditCard',
  'favorites',
];

const DEFAULT_ACTIVE_COMPONENT = 'account-overview';
export class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    const activeComponent = utils.getObjectValue(
      props.router,
      DEFAULT_ACTIVE_COMPONENT,
      'query',
      'id'
    );
    this.state = {
      componentToLoad:
        utils.getObjectValue(props.router, undefined, 'query', 'subSection') || activeComponent,
      activeComponent,
    };
  }

  componentDidMount() {
    const { getAccountNavigationAction } = this.props;
    getAccountNavigationAction();
    this.triggerPageLoadEvent();
  }

  componentDidUpdate(prevProps, prevState) {
    const { componentToLoad } = this.state;
    const { isUserLoggedIn, router } = this.props;

    if (isUserLoggedIn === false && !excludeRouteMapping.includes(router.route)) {
      routerPush('/home?target=login', '/home/login');
    }

    if (this.activePageRef && prevState.componentToLoad !== componentToLoad) {
      const focusUpdate =
        (accountPagesMapping.includes(prevState.componentToLoad) &&
          accountPagesMapping.includes(componentToLoad)) ||
        (accountPagesMapping.includes(prevState.componentToLoad) &&
          !accountPagesMapping.includes(componentToLoad));
      if (focusUpdate) {
        this.activePageRef.blur();
        setTimeout(() => {
          this.activePageRef.focus({ preventScroll: true });
        }, 100);
      }
    }

    if (prevState.componentToLoad !== componentToLoad) {
      utils.scrollPage();
      this.triggerPageLoadEvent();
    }
  }

  /**
   * Set the wrapper ref
   */
  setPageRef = ref => {
    this.activePageRef = ref;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextActiveComponent = utils.getObjectValue(
      nextProps.router,
      DEFAULT_ACTIVE_COMPONENT,
      'query',
      'id'
    );
    const nextComponent =
      utils.getObjectValue(nextProps.router, undefined, 'query', 'subSection') ||
      nextActiveComponent;
    const prevComponent = prevState.componentToLoad;
    if (nextComponent !== prevComponent) {
      return { componentToLoad: nextComponent, activeComponent: nextActiveComponent };
    }
    return null;
  }

  triggerPageLoadEvent = () => {
    const { componentToLoad } = this.state;
    const { router, trackPageLoad } = this.props;

    trackPageLoad({
      path: router.asPath,
      props: {
        initialProps: {
          pageProps: {
            pageData: {
              pageName:
                (accountPageNameMapping[componentToLoad] &&
                  accountPageNameMapping[componentToLoad].pageName) ||
                '',
              pageSection: 'myplace',
              pageSubSection: 'myplace',
              pageType: 'myplace',
            },
          },
        },
      },
    });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { componentToLoad, activeComponent } = this.state;
    const { router, accountNavigation, labels, isUserLoggedIn } = this.props;
    let navData = [];
    if (accountNavigation) {
      navData = accountNavigation.accountNav;
    }

    // TODO: currently our views are breaking if account labels are not present
    // so rendering MyAccountLayout only when labels are present
    // later on we can either need to add loader or we can prevent rendering from
    // _app.jsx itself.
    if (typeof labels === 'object' && isUserLoggedIn !== null) {
      return (
        <>
          <MyAccountLayout
            mainContent={AccountComponentMapping[componentToLoad]}
            active={activeComponent}
            activeSubComponent={componentToLoad}
            navData={navData}
            router={router}
            labels={labels}
            pageContentRef={this.setPageRef}
            isUserLoggedIn={isUserLoggedIn}
          />
        </>
      );
    }

    return null;
  }
}

Account.getInitActions = () => initActions;

Account.getInitialProps = (reduxProps, pageProps) => {
  const componentToLoad = utils.getObjectValue(reduxProps, DEFAULT_ACTIVE_COMPONENT, 'query', 'id');
  return {
    ...pageProps,
    ...{
      pageData: {
        pageName: accountPageNameMapping[componentToLoad]
          ? accountPageNameMapping[componentToLoad].pageName
          : '',
        pageSection: 'myplace',
        pageSubSection: 'myplace',
        loadAnalyticsOnload: false,
      },
    },
  };
};

Account.pageInfo = {
  pageId: 'Account',
};

export const mapDispatchToProps = dispatch => {
  return {
    getAccountNavigationAction: () => {
      dispatch(getAccountNavigationList());
    },
    trackPageLoad: payload => {
      dispatch(
        setClickAnalyticsData({
          customEvents: ['event80'],
        })
      );
      dispatch(trackPageView(payload));
      setTimeout(() => {
        dispatch(setClickAnalyticsData({}));
      }, 50);
    },
  };
};

const mapStateToProps = state => {
  return {
    accountNavigation: getAccountNavigationState(state),
    labels: getLabels(state),
    isUserLoggedIn: getUserLoggedInState(state),
  };
};

Account.propTypes = {
  getAccountNavigationAction: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  accountNavigation: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}),
  isUserLoggedIn: PropTypes.bool.isRequired,
  trackPageLoad: PropTypes.func,
};

Account.defaultProps = {
  labels: PropTypes.shape({ addressBook: {}, labels: {}, paymentGC: {}, common: {} }),
  trackPageLoad: () => {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
