/*
 * This class is used to get current internet connectivity status in react-native app
 * To get the internet connection state follow the steps as below:
 *
 * 1. Import NetworkContext
 * import { NetworkContext } from '@tcp/core/src/components/common/hoc/NetworkProvider.app';
 *
 * 2. Store context in static variable contextType
 * static contextType = NetworkContext;
 *
 * 3. Get isConnected state from context
 * const { isConnected } = this.context;
 *
 * This is the current internet connectivity state stored in context
 *
 */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import NetInfo from '@react-native-community/netinfo';
import { PropTypes } from 'prop-types';

export const NetworkContext = React.createContext({ isConnected: true });

export default class NetworkProvider extends React.PureComponent {
  // eslint-disable-next-line react/no-unused-state
  state = { isConnected: true };

  componentDidMount() {
    // Subscribe to net information status
    this.subscribeNetInfo();
  }

  componentWillUnmount() {
    // unsubscribe net info subscription from app on unmount
    this.unsubscribeNetInfo();
  }

  /**
   * @function subscribeNetInfo
   * This method checks current internet state and adds an event listener for checking if internet is available in future
   *
   * @memberof App
   */
  subscribeNetInfo = () => {
    // fetch current connection state
    NetInfo.fetch().then(connectionState => {
      this.updateConnectionState(connectionState);
    });

    // Subscribe to net info
    this.unsubscribeNetInfo = NetInfo.addEventListener(connectionState => {
      this.updateConnectionState(connectionState);
    });
  };

  /**
   * @function updateConnectionState
   * This method stores the connection state from netinfo in state
   * @param connectionState
   *
   * @memberof App
   */
  updateConnectionState = connectionState => {
    const { isConnected } = connectionState;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isConnected });
  };

  render() {
    const { children } = this.props;

    return <NetworkContext.Provider value={this.state}>{children}</NetworkContext.Provider>;
  }
}

NetworkProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
