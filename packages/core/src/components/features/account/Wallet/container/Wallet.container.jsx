import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
import { LABELS } from '@tcp/core/src/reduxStore/constants';
import WalletView from '../views';
import {
  getGlobalLabels,
  getCommonLabels,
  getLabels,
} from '../../Account/container/Account.selectors';
import { isMobileApp } from '../../../../../utils/utils';

export class WalletContainer extends React.Component {
  /**
   * @function componentDidMount function is used to
   * call fetchLabels method
   */
  componentDidMount() {
    const { fetchLabels } = this.props;
    if (isMobileApp()) {
      fetchLabels({ category: LABELS.account });
    }
  }

  getAccountOverviewLabels = labels => {
    return (labels && labels.accountOverview) || {};
  };

  render() {
    const { labels, commonLabels, accountLabels, ...props } = this.props;
    const overViewLabels = this.getAccountOverviewLabels(accountLabels);
    return (
      <WalletView
        labels={labels}
        commonLabels={commonLabels}
        overViewLabels={overViewLabels}
        {...props}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    labels: getGlobalLabels(state),
    accountLabels: getLabels(state),
    commonLabels: getCommonLabels(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchLabels: payload => {
      dispatch(loadComponentLabelsData(payload));
    },
  };
};

WalletContainer.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
  accountLabels: PropTypes.shape({}),
  fetchLabels: PropTypes.func,
};

WalletContainer.defaultProps = {
  labels: {},
  commonLabels: {},
  accountLabels: {},
  fetchLabels: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletContainer);
