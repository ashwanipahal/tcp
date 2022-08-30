import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils from '@tcp/core/src/utils';
import { setSurveyAnswers } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { getAboutYouSurvey } from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurvey/container/AboutYouSurvey';
import { getProfileLabels } from '@tcp/core/src/components/features/account/AddEditPersonalInformation/container/AddEditPersonalInformation.selectors';
import { getSuccess } from '@tcp/core/src/components/features/account/MyProfile/container/MyProfile.selectors';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import { getAnswersList } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import AboutYouInformation from '../views';

export class AboutYouInformationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { labels } = this.props;
    this.survey = this.setInitialOptions(getAboutYouSurvey(labels));
    this.setInitialValues();
  }

  componentDidUpdate() {
    const { successMessage } = this.props;
    if (successMessage && successMessage === 'successMessage') {
      this.goBackToProfile();
    }
  }

  /**
   * This function is to submit the survey selection to the api.
   * @param {string} data - selected options as request payload
   */
  updateAboutYouInformation = data => {
    const { setSurveyAnswersAction } = this.props;
    setSurveyAnswersAction(data);
  };

  /**
   * This fucntion is for setting the current state and retain the current saved state
   * @param {object} survey - set of saved questions data from the json
   */
  setInitialOptions = survey => {
    const updatedSurvey = survey.questions;
    const { userSurvey } = this.props;
    const answer1 = userSurvey && userSurvey.getIn(['0', '0']);
    if (answer1) {
      updatedSurvey[0].options = updatedSurvey[0].options.map(option => {
        const updatedOption = option;
        if (option.value === answer1) {
          updatedOption.selected = true;
        }
        return updatedOption;
      });
    }
    const answer2List = userSurvey && userSurvey.get(1);
    if (answer2List && answer2List.get(0)) {
      updatedSurvey[1].options = updatedSurvey[1].options.map(option => {
        const updatedOption = option;
        if (answer2List.find(item => item === option.value)) {
          updatedOption.selected = true;
        }
        return updatedOption;
      });
    }
    return updatedSurvey;
  };

  /**
   * This function is to move back to the profile info page
   */
  goBackToProfile = () => {
    utils.routerPush(internalEndpoints.profilePage.link, internalEndpoints.profilePage.path);
    return null;
  };

  /**
   * This function is to set initial values for the form
   */
  setInitialValues = () => {
    // This is to set static values from the saved json file
    this.initialValues = {
      options1: this.survey[0].options,
      options2: this.survey[1].options,
    };
  };

  render() {
    const { successMessage, errorMessage, labels, onClose, ...otherProps } = this.props;
    return (
      <AboutYouInformation
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.updateAboutYouInformation}
        labels={labels}
        initialValues={this.initialValues}
        onClose={onClose}
        {...otherProps}
      />
    );
  }
}

AboutYouInformationContainer.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  setSurveyAnswersAction: PropTypes.func.isRequired,
  userSurvey: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func,
};

AboutYouInformationContainer.defaultProps = {
  onClose: () => {},
};

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  userSurvey: getAnswersList(state),
  labels: getProfileLabels(state),
});

export const mapDispatchToProps = dispatch => ({
  setSurveyAnswersAction: payload => {
    dispatch(setSurveyAnswers(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutYouInformationContainer);
