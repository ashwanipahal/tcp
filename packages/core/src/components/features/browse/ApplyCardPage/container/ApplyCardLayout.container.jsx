import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApplyCardLayoutView from '../views/ApplyCardLayout.View';
import { fetchModuleX, submitInstantCardApplication } from './ApplyCard.actions';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import { getUserProfileData } from './ApplyCard.selectors';
import { routerPush } from '../../../../../utils';

class ApplyCardLayoutContainer extends React.Component {
  static propTypes = {
    plccData: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    fetchModuleXContent: PropTypes.func.isRequired,
    isPLCCModalFlow: PropTypes.bool.isRequired,
    submitApplication: PropTypes.func.isRequired,
    applicationStatus: PropTypes.string.isRequired,
    plccUser: PropTypes.bool.isRequired,
    profileInfo: PropTypes.shape({}).isRequired,
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
    const {
      applicationStatus,
      isPLCCModalFlow,
      plccData,
      labels,
      plccUser,
      profileInfo,
    } = this.props;
    if (plccUser) {
      routerPush('/', '/place-card');
    }
    return (
      <ApplyCardLayoutView
        applicationStatus={applicationStatus}
        labels={labels}
        plccData={plccData}
        submitPLCCForm={this.submitPLCCForm}
        plccUser={plccUser}
        profileInfo={profileInfo}
        isPLCCModalFlow={isPLCCModalFlow}
      />
    );
  }
}

export const mapStateToProps = state => {
  const { ApplyCardPage, Labels } = state;
  return {
    applicationStatus: ApplyCardPage.applicationStatus,
    plccData: ApplyCardPage.plccData,
    plccUser: isPlccUser(state),
    profileInfo: getUserProfileData(state),
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
