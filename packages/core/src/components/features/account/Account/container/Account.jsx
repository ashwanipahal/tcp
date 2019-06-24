import React from 'react';
import pathOr from 'lodash/fp/pathOr';
import { withRouter } from 'next/router'; //eslint-disable-line
import MyAccountLayout from '../../MyAccountLayoutContainer/container/MyAccountLayout.container';
import AccountComponentMapping from '../AccountComponentMapping';

// @flow
type Props = {
  router: Object,
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
      component: pathOr('accountOverview', 'query.id', props.router),
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const nextComponent = pathOr('accountOverview', 'query.id', nextProps.router);
    const prevComponent = pathOr('accountOverview', 'component', prevState);
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
    return (
      <MyAccountLayout
        mainContent={AccountComponentMapping[component]}
        selectedComponent={component}
      />
    );
  }
}

export default withRouter(Account);
