import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChildren } from '../../../../User/container/User.selectors';
import { getChildrenAction, removeChildrenAction } from './BirthdaySavingsList.actions';
import BirthdaySavingsComponent from '../views';

/**
 * @function BirthdaySavings
 * @description Container component which will provide childrenBirthdays list to BirthdaySavingsList component
 */
export class BirthdaySavings extends PureComponent {
  static propTypes = {
    childrenBirthdays: PropTypes.shape([]).isRequired,
    getChildrenBirthdays: PropTypes.func.isRequired,
  };

  /**
   * handle component mount
   */
  componentDidMount() {
    const { childrenBirthdays, getChildrenBirthdays } = this.props;
    if (!childrenBirthdays) {
      getChildrenBirthdays();
    }
  }

  /**
   * render BirthdaySavings list markup
   */
  render() {
    return <BirthdaySavingsComponent {...this.props} />;
  }
}

/**
 * @function mapStateToProps
 * @param { object } state
 * This function will return derived state props for BirthdaySavings component
 */
export const mapStateToProps = state => {
  return {
    childrenBirthdays: getChildren(state),
  };
};

/**
 * @function mapDispatchToProps
 * @param { function } dispatch
 * This function will return dispatcher props for BirthdaySavings component
 */
export const mapDispatchToProps = dispatch => ({
  getChildrenBirthdays: () => {
    dispatch(getChildrenAction());
  },
  removeBirthday: childId => {
    dispatch(removeChildrenAction(childId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BirthdaySavings);
