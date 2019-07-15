import React from 'react';
import { ScrollView } from 'react-native';
import MyAccountLayout from '../views/MyAccountLayout.view';
import AccountComponentNativeMapping from '../AccountComponentMapping';
import navDataMobile from '../MyAccountRoute.config';

// @flow
type Props = {
  component: String,
};

type State = {
  component: String,
};

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for drop down nav, needs an entry in AccountComponentMappingNative file.
 */

export default class Account extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { component } = this.props;
    this.state = {
      component,
    };
  }

  handleComponentChange = (component: String) => {
    /** This handling is for temporary purpose, need to remove later once we have all containers */
    let componentName = component;
    if (componentName === 'paymentGiftCardsPageMobile') {
      componentName = 'paymentGiftCardsPageMobile';
    } else if (componentName !== 'addressBookMobile') {
      componentName = 'addressBookMobile';
    }
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
    return (
      <ScrollView>
        <MyAccountLayout
          navData={navDataMobile}
          mainContent={AccountComponentNativeMapping[component]}
          handleComponentChange={this.handleComponentChange}
        />
      </ScrollView>
    );
  }
}
