import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChildren } from '../../../../User/container/User.selectors';
import {
  getChildrenAction,
  removeChildAction,
  resetBirthdaySavingMessageAction,
  addChildAction,
} from './BirthdaySavingsList.actions';
import { getStatus, getMessage } from './BirthdaySavingsList.selectors';
import BirthdaySavingsComponent from '../views';
import { toastMessageInfo } from '../../../../../../common/atoms/Toast/container/Toast.actions.native';

/**
 * @function BirthdaySavings
 * @description Container component which will provide childrenBirthdays list to BirthdaySavingsList component
 */
export class BirthdaySavings extends PureComponent {
  static propTypes = {
    childrenBirthdays: PropTypes.shape([]).isRequired,
    getChildrenBirthdays: PropTypes.func.isRequired,
    resetBirthdaySavingMessage: PropTypes.func.isRequired,
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

  componentWillUnmount() {
    const { resetBirthdaySavingMessage } = this.props;
    resetBirthdaySavingMessage();
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
    status: getStatus(state),
    message: getMessage(state),
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
    dispatch(removeChildAction(childId));
  },
  addChildBirthday: payload => {
    dispatch(addChildAction(payload));
  },
  resetBirthdaySavingMessage: () => {
    dispatch(resetBirthdaySavingMessageAction());
  },
  toastMessage: palyoad => {
    dispatch(toastMessageInfo(palyoad));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BirthdaySavings);
