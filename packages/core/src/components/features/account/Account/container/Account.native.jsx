import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyAccountLayout from '../views/MyAccountLayout.view';
import AccountComponentNativeMapping from '../AccountComponentMapping';
import navDataMobile from '../MyAccountRoute.config';
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
} from '../styles/MyAccountContainer.style.native';
import { getLabels } from './Account.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import { isMobileApp, navigateToNestedRoute } from '../../../../../utils/utils.app';

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for drop down nav, needs an entry in AccountComponentMappingNative file.
 */

export class Account extends React.PureComponent<Props, State> {
  static propTypes = {
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    const { component } = this.props;
    this.state = {
      component,
    };
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
    };
    if (componentObject[component]) {
      return componentObject[component];
    }
    return 'addressBookMobile';
  };

  /**
   *  @function handleComponentChange triggered when dropdown clicked
   */
  handleComponentChange = (component, otherProps, routerPath) => {
    const componentName = this.getComponent(component);
    this.setState({
      component: componentName,
      componentProps: otherProps,
      router: routerPath,
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
    const { component, componentProps, router } = this.state;
    const { labels, isUserLoggedIn, navigation } = this.props;
    return (
      <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={82}>
        <StyledScrollView keyboardShouldPersistTaps="handled">
          <MyAccountLayout
            navData={navDataMobile}
            component={this.getComponent(component)}
            componentProps={componentProps}
            mainContent={AccountComponentNativeMapping[component]}
            handleComponentChange={this.handleComponentChange}
            labels={labels}
            isUserLoggedIn={isUserLoggedIn}
            navigation={navigation}
            router={router}
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
  };
};

export default connect(mapStateToProps)(Account);
export { Account as AccountVanilla };
