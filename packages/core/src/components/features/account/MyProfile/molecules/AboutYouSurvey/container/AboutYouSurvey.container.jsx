import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSurveyAnswers } from '@tcp/core/src/components/features/account/User/container/User.actions';
import {
  getDefaultStore,
  getUserName,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { AboutYouSurvey } from '../views/AboutYouSurvey.view';
import { getAboutYouSurvey } from './AboutYouSurvey';

export class AboutYouSurveyContainer extends PureComponent {
  /**
   * This function will call the api to save the current and final state of the survey selections.
   * @param {object} data - request payload for the api, containing answer1 and answer2 as array.
   */
  saveSurveyData = data => {
    const { setSurveyAnswersAction, toggleModalState } = this.props;
    setSurveyAnswersAction(data);
    // Close modal when we have submitted last survey answer
    if (data.answer2) {
      toggleModalState();
    }
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
          question.answers.push(answer1);
        }
        return updatedOption;
      });
      updatedSurvey[0] = question;
    }
    return updatedSurvey;
  };

  render() {
    const { labels, userSurvey, className, ...otherProps } = this.props;
    const survey = this.setFirstOptions(getAboutYouSurvey(labels));

    return (
      <div className={className}>
        <AboutYouSurvey
          labels={labels}
          className={className}
          userSurvey={userSurvey}
          userSurveyQuestions={survey}
          saveSurveyData={this.saveSurveyData}
          {...otherProps}
        />
      </div>
    );
  }
}

AboutYouSurveyContainer.propTypes = {
  labels: PropTypes.shape({}),
  setSurveyAnswersAction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  userSurvey: PropTypes.shape([]),
  className: PropTypes.string,
  toggleModalState: PropTypes.func.isRequired,
};

AboutYouSurveyContainer.defaultProps = {
  labels: {},
  onSubmit: () => {},
  className: '',
  userSurvey: [],
};

const mapStateToProps = state => {
  return {
    defaultStore: getDefaultStore(state),
    userFirstName: getUserName(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  setSurveyAnswersAction: payload => {
    dispatch(setSurveyAnswers(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutYouSurveyContainer);
