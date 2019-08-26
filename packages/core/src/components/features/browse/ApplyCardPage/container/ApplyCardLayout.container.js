/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { ApplyCardLayoutView } from '../views/ApplyCardLayout.View';
import { fetchModuleX, submitInstantCardApplication } from './ApplyCard.actions';
import { getCreditCardContent, getPLCCApplicationStatus } from './ApplyCard.selector';
import PropTypes from 'prop-types';
import { isPlccUser } from '../../../account/LoginPage/container/LoginPage.selectors';

class ApplyCardLayoutContainer extends React.Component {
  static propTypes = {
    disclaimersData: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    fetchModuleXContent: PropTypes.func,
  };

  componentDidMount() {
    const { disclaimersData, fetchModuleXContent, labels } = this.props;
    if (!disclaimersData) {
      fetchModuleXContent(labels && labels.referred);
    }
  }

  /**
   *  @fatarrow - submitPLCCForm
   *  @param - formData - contains the data of redux form.
   *
   *  @description - submits for an instant credit card
   */
  submitPLCCForm = formData => {
    const { submitApplication } = this.props;
    submitApplication(formData);
  };

  render() {
    const { applicationStatus, disclaimersData, labels, linkInfo } = this.props;
    return (
      <ApplyCardLayoutView
        applicationStatus={applicationStatus}
        labels={labels}
        preScreenCodeLink={linkInfo}
        disclaimersData={disclaimersData}
        submitPLCCForm={this.submitPLCCForm}
      />
    );
  }
}

export const mapStateToProps = state => ({
  applicationStatus: getPLCCApplicationStatus(state),
  disclaimersData: getCreditCardContent(state),
  labels: state.Labels && state.Labels.PLCC && state.Labels.PLCC.plccForm,
  isPlcc: isPlccUser(state),
});

export const mapDispatchToProps = dispatch => {
  return {
    submitApplication: payload => {
      dispatch(submitInstantCardApplication(payload));
    },
    fetchModuleXContent: contentId => {
      dispatch(fetchModuleX(contentId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyCardLayoutContainer);
