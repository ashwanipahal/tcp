import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import MyAccountLayout from '../views/MyAccountLayout.view';
import AccountComponentMapping from '../AccountComponentMapping';
import utils from '../../../../../utils';
import { getAccountNavigationState, getLabels } from './Account.selectors';
import { getAccountNavigationList } from './Account.actions';

/**
 * @function Account The Account component is the main container for the account section
 * This component includes the layout view, it passes the MyAccountLayout with the mainContent to be rendered
 * on th right side.
 * NOTE: Which ever new component that gets added for left nav, needs an entry in AccountComponentMapping file.
 * @param {router} router Router object to get the query key
 */

export class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    const activeComponent = utils.getObjectValue(props.router, 'account-overview', 'query', 'id');
    this.state = {
      componentToLoad:
        utils.getObjectValue(props.router, undefined, 'query', 'subSection') || activeComponent,
      activeComponent,
    };
  }

  componentDidMount() {
    const { getAccountNavigationAction } = this.props;
    getAccountNavigationAction();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
    const { router, accountNavigation, labels } = this.props;
    let navData = [];
    if (accountNavigation) {
      navData = accountNavigation.accountNav;
    }
    return (
      <MyAccountLayout
        mainContent={AccountComponentMapping[componentToLoad]}
        active={activeComponent}
        navData={navData}
        router={router}
        labels={labels}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getAccountNavigationAction: () => {
      dispatch(getAccountNavigationList());
    },
  };
};

const mapStateToProps = state => {
  return {
    accountNavigation: getAccountNavigationState(state),
    labels: getLabels(state),
  };
};

Account.propTypes = {
  getAccountNavigationAction: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  accountNavigation: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}),
};

Account.defaultProps = {
  labels: PropTypes.shape({ addressBook: {}, labels: {} }),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
