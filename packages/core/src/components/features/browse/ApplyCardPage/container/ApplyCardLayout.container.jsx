import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApplyCardLayoutView from '../views/ApplyCardLayout.View';
import { fetchModuleX, submitInstantCardApplication } from './ApplyCard.actions';

class ApplyCardLayoutContainer extends React.Component {
  static propTypes = {
    plccData: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    fetchModuleXContent: PropTypes.func.isRequired,
    submitApplication: PropTypes.func.isRequired,
    applicationStatus: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { plccData, fetchModuleXContent, labels } = this.props;
    if (!plccData && labels && labels.referred) {
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
    const { applicationStatus, plccData, labels } = this.props;
    return (
      <ApplyCardLayoutView
        applicationStatus={applicationStatus}
        labels={labels}
        plccData={plccData}
        submitPLCCForm={this.submitPLCCForm}
      />
    );
  }
}

export const mapStateToProps = state => {
  const { ApplyCardPage, Labels } = state;
  return {
    applicationStatus: ApplyCardPage.applicationStatus,
    plccData: ApplyCardPage.plccData,
    labels: Labels && Labels.PLCC && Labels.PLCC.plccForm,
  };
};

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
