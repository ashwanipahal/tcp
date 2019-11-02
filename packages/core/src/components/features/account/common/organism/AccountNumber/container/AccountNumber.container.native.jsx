import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LABELS } from '@tcp/core/src/reduxStore/constants';
import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
import AccountNumber from '../views';
import { getGlobalLabels, getCommonLabels } from '../../../../Account/container/Account.selectors';
import { isMobileApp } from '../../../../../../../utils/utils';
import { getMyPlaceNumber } from '../../../../User/container/User.selectors';

export class AccountNumberContainer extends React.Component {
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
    const { labels, commonLabels, myPlaceNumber, ...props } = this.props;
    return (
      <AccountNumber
        labels={labels}
        commonLabels={commonLabels}
        myPlaceNumber={myPlaceNumber}
        {...props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: getGlobalLabels(state),
    commonLabels: getCommonLabels(state),
    myPlaceNumber: getMyPlaceNumber(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchLabels: payload => {
      dispatch(loadComponentLabelsData(payload));
    },
  };
};

AccountNumberContainer.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
  fetchLabels: PropTypes.func,
  myPlaceNumber: PropTypes.string,
};

AccountNumberContainer.defaultProps = {
  labels: {},
  commonLabels: {},
  fetchLabels: () => {},
  myPlaceNumber: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountNumberContainer);
