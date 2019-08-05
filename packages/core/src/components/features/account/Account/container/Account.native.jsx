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

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for drop down nav, needs an entry in AccountComponentMappingNative file.
 */

class Account extends React.PureComponent<Props, State> {
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

  getComponent = component => {
    switch (component) {
      case 'paymentGiftCardsPageMobile':
        return 'paymentGiftCardsPageMobile';
      case 'myPlaceRewardsMobile':
        return 'myPlaceRewardsMobile';
      default:
        return 'addressBookMobile';
    }
  };

  handleComponentChange = component => {
    /** This handling is for temporary purpose, need to remove later once we have all containers */
    const componentName = this.getComponent(component);
    this.setState({
      component: componentName,
    });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { component } = this.state;
    const { labels } = this.props;
    return (
      <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={82}>
        <StyledScrollView>
          <MyAccountLayout
            navData={navDataMobile}
            mainContent={AccountComponentNativeMapping[component]}
            handleComponentChange={this.handleComponentChange}
            labels={labels}
          />
        </StyledScrollView>
      </StyledKeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
  };
};

export default connect(mapStateToProps)(Account);
