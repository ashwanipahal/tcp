import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountNumber from '../views';
import { getLabels } from '../../../../Account/container/Account.selectors';
import getAccountOverviewLabels from './AccountNumber.selectors';
import { getMyPlaceNumber } from '../../../../User/container/User.selectors';

export class AccountNumberContainer extends PureComponent {
  render() {
    const { labels, myPlaceNumber, ...props } = this.props;
    const overViewLabels = getAccountOverviewLabels(labels);
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
