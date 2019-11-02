import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLabels } from '../../Account/container/Account.selectors';
import ChangePasswordPageContainer from '../views/ChangePasswordPage';

export class ChangePasswordRouteContainer extends PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}).isRequired,
  };

  render() {
    const { labels } = this.props;
    return <ChangePasswordPageContainer labels={labels} />;
  }
}

export const mapStateToProps = state => ({
  labels: getLabels(state),
});

export default connect(mapStateToProps)(ChangePasswordRouteContainer);
