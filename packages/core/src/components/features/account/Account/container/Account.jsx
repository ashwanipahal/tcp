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
    this.state = {
      component: utils.getObjectValue(props.router, 'addressBook', 'query', 'id'),
    };
  }

  componentDidMount() {
    const { getAccountNavigationAction} = this.props;
    getAccountNavigationAction();
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const nextComponent = utils.getObjectValue(nextProps.router, 'addressBook', 'query', 'id');
    const prevComponent = prevState.component;
    if (nextComponent !== prevComponent) {
      return { component: nextComponent };
    }
    return null;
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { component } = this.state;
    const { router, accountNavigation } = this.props;
    let navData = [];
    if(accountNavigation){
      navData = accountNavigation.accountNav;
    }
    return (
      <MyAccountLayout
        mainContent={AccountComponentMapping[component]}
        active={component}
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
