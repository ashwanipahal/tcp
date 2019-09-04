import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils from '@tcp/core/src/utils';
import { getSuccess } from '../../MyProfile/container/MyProfile.selectors';
import AboutYouInformation from '../views';
import internalEndpoints from '../../common/internalEndpoints';

export class AboutYouInformationContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    updateProfileAction: PropTypes.func.isRequired,
    messageStateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    isEmployee: PropTypes.string.isRequired,
    formErrorMessage: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    const { labels, ...otherProps } = this.props;
    this.initialValues = this.getInitialValues(otherProps);
  }

  componentDidUpdate() {
    const { successMessage } = this.props;
    if (successMessage && successMessage === 'successMessage') {
      this.goBackToProfile();
    }
  }

  componentWillUnmount() {}

  updateProfileInformation = () => {};

  goBackToProfile = () => {
    utils.routerPush(internalEndpoints.profilePage.link, internalEndpoints.profilePage.path);
    return null;
  };

  getInitialValues = props => {
    return {};
  };

  render() {
    const { successMessage, errorMessage, labels, formErrorMessage } = this.props;
    return (
      <AboutYouInformation
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.updateProfileInformation}
        labels={labels}
        initialValues={this.initialValues}
        formErrorMessage={formErrorMessage}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
});

export const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutYouInformationContainer);
