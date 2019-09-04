import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils from '@tcp/core/src/utils';
import { setSurveyAnswers } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { getAboutYouSurvey } from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurvey/container/AboutYouSurvey';
import { getProfileLabels } from '@tcp/core/src/components/features/account/AddEditPersonalInformation/container/AddEditPersonalInformation.selectors';
import { getSuccess } from '../../MyProfile/container/MyProfile.selectors';
import AboutYouInformation from '../views';
import internalEndpoints from '../../common/internalEndpoints';
import { getAnswersList } from '../../User/container/User.selectors';

export class AboutYouInformationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { labels } = this.props;
    this.survey = this.setFirstOptions(getAboutYouSurvey(labels));
    this.setInitialValues(this.survey);
  }

  componentDidUpdate() {
    const { successMessage } = this.props;
    if (successMessage && successMessage === 'successMessage') {
      this.goBackToProfile();
    }
  }

  updateAboutYouInformation = data => {
    const { setSurveyAnswersAction } = this.props;
    setSurveyAnswersAction(data);
  };

  /**
   * This fucntion is for setting the current state and retain the current saved state
   * @param {object} survey - set of saved questions data from the json
   */
  setFirstOptions = survey => {
    const updatedSurvey = survey.questions;
    const { userSurvey } = this.props;
    const answer1 = userSurvey && userSurvey.getIn(['0', '0']);
    const question = updatedSurvey[0];
    if (answer1) {
      question.options = question.options.map(option => {
        const updatedOption = option;
        if (option.value === answer1) {
          updatedOption.selected = true;
        }
        return updatedOption;
      });
      updatedSurvey[0] = question;
    }
    const answer2List = userSurvey && userSurvey.get(1);
    const question2 = updatedSurvey[1];
    if (answer2List && answer2List.get(0)) {
      question2.options = question2.options.map(option => {
        const updatedOption = option;
        if (answer2List.find(item => item === option.value)) {
          updatedOption.selected = true;
        }
        return updatedOption;
      });
      updatedSurvey[1] = question2;
    }
    return updatedSurvey;
  };

  goBackToProfile = () => {
    utils.routerPush(internalEndpoints.profilePage.link, internalEndpoints.profilePage.path);
    return null;
  };

  setInitialValues = () => {
    const { labels } = this.props;
    const survey = this.setFirstOptions(getAboutYouSurvey(labels));
    this.initialValues = {
      options1: survey[0].options,
      options2: survey[1].options,
    };
  };

  render() {
    const { successMessage, errorMessage, labels, formErrorMessage } = this.props;
    return (
      <AboutYouInformation
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.updateAboutYouInformation}
        labels={labels}
        initialValues={this.initialValues}
        formErrorMessage={formErrorMessage}
      />
    );
  }
}

AboutYouInformationContainer.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  formErrorMessage: PropTypes.shape({}).isRequired,
  setSurveyAnswersAction: PropTypes.func.isRequired,
  userSurvey: PropTypes.shape({}).isRequired,
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
