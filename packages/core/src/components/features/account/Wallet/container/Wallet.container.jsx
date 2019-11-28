import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadComponentLabelsData, getSubNavigationData } from '@tcp/core/src/reduxStore/actions';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import { LABELS } from '@tcp/core/src/reduxStore/constants';
import WalletView from '../views';
import {
  getGlobalLabels,
  getCommonLabels,
  getLabels,
} from '../../Account/container/Account.selectors';
import { getAccountOverviewLabels, getWalletFooterLinks } from './Wallet.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import { isMobileApp } from '../../../../../utils/utils';
import constants from '../Wallet.constants';

export class WalletContainer extends React.Component {
  /**
   * @function componentDidMount function is used to
   * call fetchLabels method
   */
  componentDidMount() {
    const { fetchLabels, fetchFooterLinks } = this.props;
    if (isMobileApp()) {
      fetchLabels({ category: LABELS.account });
      fetchFooterLinks([constants.WALLET_FOOTER_LINKS]);
    }
  }

  render() {
    const {
      labels,
      commonLabels,
      accountLabels,
      isUserLoggedIn,
      footerLinks,
      ...props
    } = this.props;
    const overViewLabels = getAccountOverviewLabels(accountLabels);
    return (
      <WalletView
        labels={labels}
        commonLabels={commonLabels}
        overViewLabels={overViewLabels}
        isUserLoggedIn={isUserLoggedIn}
        footerLinks={footerLinks}
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
    isUserLoggedIn: getUserLoggedInState(state),
    footerLinks: getWalletFooterLinks(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchLabels: payload => {
      dispatch(loadComponentLabelsData(payload));
    },
    openApplyNowModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
    fetchFooterLinks: payload => {
      dispatch(getSubNavigationData(payload));
    },
  };
};

WalletContainer.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
  accountLabels: PropTypes.shape({}),
  fetchLabels: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
  fetchFooterLinks: PropTypes.func,
  footerLinks: PropTypes.shape([]),
};

WalletContainer.defaultProps = {
  labels: {},
  commonLabels: {},
  accountLabels: {},
  fetchLabels: () => {},
  isUserLoggedIn: false,
  fetchFooterLinks: () => {},
  footerLinks: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletContainer);
