import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChildren } from '../../../../User/container/User.selectors';
import { getChildrenAction } from './BirthdaySavingsList.actions';
import { getLabels } from './BirthdaySavingsList.selectors';
import BirthdaySavingsComponent from '../views';

export class BirthdaySavings extends PureComponent {
  static propTypes = {
    childrenBirthdays: PropTypes.shape([]).isRequired,
    getChildrenBirthdays: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { childrenBirthdays, getChildrenBirthdays } = this.props;
    if (!childrenBirthdays) {
      getChildrenBirthdays();
    }
  }

  render() {
    return <BirthdaySavingsComponent {...this.props} />;
  }
}

export const mapStateToProps = state => {
  return {
    childrenBirthdays: getChildren(state),
    labels: getLabels(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  getChildrenBirthdays: () => {
    dispatch(getChildrenAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BirthdaySavings);
