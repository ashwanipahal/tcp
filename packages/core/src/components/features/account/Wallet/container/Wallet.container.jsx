import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
import { LABELS } from '@tcp/core/src/reduxStore/constants';
import WalletView from '../views';
import { getGlobalLabels, getCommonLabels } from '../../Account/container/Account.selectors';
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

  render() {
    const { labels, commonLabels, ...props } = this.props;
    return <WalletView labels={labels} commonLabels={commonLabels} {...props} />;
  }
}

export const mapStateToProps = state => {
  return {
    labels: getGlobalLabels(state),
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
  fetchLabels: PropTypes.func,
};

WalletContainer.defaultProps = {
  labels: {},
  commonLabels: {},
  fetchLabels: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletContainer);
