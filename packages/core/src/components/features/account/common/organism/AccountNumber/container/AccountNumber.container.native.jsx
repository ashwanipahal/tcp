import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountNumber from '../views';
import { getLabels } from '../../../../Account/container/Account.selectors';
import { getMyPlaceNumber } from '../../../../User/container/User.selectors';

export class AccountNumberContainer extends PureComponent {
  getAccountOverviewLabels = labels => {
    return (labels && labels.accountOverview) || {};
  };

  render() {
    const { labels, myPlaceNumber, ...props } = this.props;
    const overViewLabels = this.getAccountOverviewLabels(labels);
    return <AccountNumber labels={overViewLabels} myPlaceNumber={myPlaceNumber} {...props} />;
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    myPlaceNumber: getMyPlaceNumber(state),
  };
};

AccountNumberContainer.propTypes = {
  labels: PropTypes.shape({}),
  myPlaceNumber: PropTypes.string,
};

AccountNumberContainer.defaultProps = {
  labels: {},
  myPlaceNumber: '',
};

export default connect(mapStateToProps)(AccountNumberContainer);
