import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import MyAccountLayout from '../views/MyAccountLayout.view';
import AccountComponentMapping from '../AccountComponentMapping';
// import navData from '../MyAccountRoute.config';
import utils from '../../../../../utils';

import { getAccountNavigationList } from './Account.actions';
import { getAccountNavigationState } from './Account.selectors';

// @flow
type Props = {
  router: Object,
  getAccountNavigationAction: () => void,
  accountNavigation: array<any>
};

type State = {
  component: String,
};

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for left nav, needs an entry in AccountComponentMapping file.
 * @param {router} router Router object to get the query key
 */

export class Account extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const activeComponent = utils.getObjectValue(props.router, 'account-overview', 'query', 'id');
    this.state = {
      componentToLoad:
        utils.getObjectValue(props.router, undefined, 'query', 'subSection') || activeComponent,
      activeComponent,
    };
  }

  componentDidMount() {
    const { getAccountNavigationAction} = this.props;
    getAccountNavigationAction();
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const nextActiveComponent = utils.getObjectValue(
      nextProps.router,
      'account-overview',
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

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { componentToLoad, activeComponent } = this.state;
    const { router, accountNavigation } = this.props;
    let navData = [];
    if(accountNavigation){
      navData = accountNavigation.accountNav;
    }
    return (
      <MyAccountLayout
        mainContent={AccountComponentMapping[componentToLoad]}
        active={activeComponent}
        navData={navData}
        router={router}
      />
    );
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getAccountNavigationAction: () => {
      dispatch(getAccountNavigationList());
    }
  };
};

const mapStateToProps = state => {
  return {
    accountNavigation: getAccountNavigationState(state)
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Account));
