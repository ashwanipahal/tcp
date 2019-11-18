import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
import { LABELS } from '@tcp/core/src/reduxStore/constants';
import MyAccountLayout from '../views/MyAccountLayout.view';
import AccountComponentNativeMapping from '../AccountComponentMapping';
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
} from '../styles/MyAccountContainer.style.native';
import { getLabels, getAccountNavigationState } from './Account.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import { isMobileApp, navigateToNestedRoute } from '../../../../../utils/utils.app';

import { getAccountNavigationList, getSubNavigationData } from './Account.actions';

const FOOTER_LINKS = 'account-footer-links';
const LEGAL_LINKS = 'account-legal-links';

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for drop down nav, needs an entry in AccountComponentMappingNative file.
 */

const navConfigMap = {
  payment: 'paymentGiftCardsPageMobile',
  'place-rewards': 'myPlaceRewardsMobile',
  'account-overview': 'accountOverviewMobile',
  profile: 'profileInformationMobile',
  wallet: 'myWalletPageMobile',
  'extra-points': 'earnExtraPointsPageMobile',
  'points-history': 'pointHistoryPageMobile',
  'my-preference': 'myPreferencePageMobile',
  'points-claim': 'PointsClaimPageMobile',
  orders: 'myOrdersPageMobile',
  'address-book': 'addressBookMobile',
  favorites: 'myFavoritePageMobile',
  'rewards-credit-card': 'myPlaceRewardsCCPageMobile',
};

export class Account extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    component: PropTypes.string,
    isUserLoggedIn: PropTypes.bool,
    closeOverlay: PropTypes.func,
    getAccountNavigationAction: PropTypes.func,
    navigation: PropTypes.shape({}),
    fetchLabels: PropTypes.func,
    fetchFooterLinks: PropTypes.func,
  };

  static defaultProps = {
    labels: {},
    component: '',
    isUserLoggedIn: false,
    closeOverlay: () => {},
    getAccountNavigationAction: () => {},
    navigation: {},
    fetchLabels: () => {},
    fetchFooterLinks: () => {},
  };

  constructor(props) {
    super(props);
    const { component } = this.props;
    this.state = {
      component,
      navData: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.accountNavigation &&
      props.accountNavigation.accountNav &&
      state.navData.length === 0
    ) {
      return {
        navData: props.accountNavigation.accountNav.map(nav => ({
          ...nav,
          ...{
            value: navConfigMap[nav.component],
          },
        })),
      };
    }

    return null;
  }

  componentDidMount() {
    const { getAccountNavigationAction, fetchLabels, fetchFooterLinks } = this.props;
    getAccountNavigationAction();
    fetchFooterLinks([FOOTER_LINKS, LEGAL_LINKS]);
    fetchLabels({ category: LABELS.account });
  }

  componentDidUpdate(prevProps) {
    const { isUserLoggedIn, closeOverlay } = this.props;
    const hasMobile = isMobileApp();
    if (!prevProps.isUserLoggedIn && isUserLoggedIn && !hasMobile) {
      closeOverlay();
    }
  }

  /**
   *  @function getComponent takes component and return the component that is required on the drop down click.
   */
  getComponent = component => {
    const componentObject = {
      paymentGiftCardsPageMobile: 'paymentGiftCardsPageMobile',
      myPlaceRewardsMobile: 'myPlaceRewardsMobile',
      accountOverviewMobile: 'accountOverviewMobile',
      profileInformationMobile: 'profileInformationMobile',
      myWalletPageMobile: 'myWalletPageMobile',
      earnExtraPointsPageMobile: 'earnExtraPointsPageMobile',
      pointsHistoryMobile: 'pointHistoryPageMobile',
      myPreferencePageMobile: 'myPreferencePageMobile',
      PointsClaimPageMobile: 'PointsClaimPageMobile',
      myOrdersPageMobile: 'myOrdersPageMobile',
      addressBookMobile: 'addressBookMobile',
      orderDetailsPageMobile: 'orderDetailsPageMobile',
      myFavoritePageMobile: 'myFavoritePageMobile',
      myPlaceRewardsCCPageMobile: 'myPlaceRewardsCCPageMobile',
    };
    if (componentObject[component]) {
      return componentObject[component];
    }
    return 'addressBookMobile';
  };

  /**
   *  @function handleComponentChange triggered when dropdown clicked
   */
  handleComponentChange = (component, otherProps) => {
    const componentName = this.getComponent(component);
    this.setState({
      component: componentName,
      componentProps: otherProps,
    });
  };

  navigattePage() {
    const { navigation } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'home');
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { component, componentProps, navData } = this.state;
    const { labels, isUserLoggedIn, navigation, fetchFooterLinks } = this.props;
    return (
      <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={82}>
        <StyledScrollView keyboardShouldPersistTaps="handled">
          <MyAccountLayout
            navData={navData}
            component={this.getComponent(component)}
            componentProps={componentProps}
            mainContent={AccountComponentNativeMapping[component]}
            handleComponentChange={this.handleComponentChange}
            labels={labels}
            isUserLoggedIn={isUserLoggedIn}
            navigation={navigation}
            fetchLinks={fetchFooterLinks}
          />
        </StyledScrollView>
      </StyledKeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    isUserLoggedIn: getUserLoggedInState(state),
    accountNavigation: getAccountNavigationState(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getAccountNavigationAction: () => {
      dispatch(getAccountNavigationList());
    },
    fetchLabels: payload => {
      dispatch(loadComponentLabelsData(payload));
    },
    fetchFooterLinks: payload => {
      dispatch(getSubNavigationData(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
export { Account as AccountVanilla };
