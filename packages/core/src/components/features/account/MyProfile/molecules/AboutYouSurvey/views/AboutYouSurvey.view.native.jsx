import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Button, BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import SurveyQuestion from '@tcp/core/src/components/features/account/MyProfile/molecules/SurveyQuestion';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  StageWrapper,
  ActionsWrapper,
  SurveyWrapper,
  Title,
  StageLine,
  TouchableWrapper,
  TextStyle,
} from '../styles/AboutYouSurvey.style.native';
import { Constants } from '../container/AboutYouSurvey.utils';

const starIcon = require('../../../../../../../../../mobileapp/src/assets/images/star.png');
const starFilledIcon = require('../../../../../../../../../mobileapp/src/assets/images/star-filled.png');
const circleCheck = require('../../../../../../../../../mobileapp/src/assets/images/circle-check.png');

export class AboutYouSurvey extends React.Component {
  constructor(props) {
    super(props);
    const { userSurveyQuestions, userSurvey } = props;
    const question1 = userSurveyQuestions[0];
    const question2 = userSurveyQuestions[1];
    this.submitDisabled = true;
    this.submitDisabled = true;
    if (userSurvey && userSurvey.getIn(['0', '0'])) {
      this.submitDisabled = false;
    }

    this.state = {
      question1: {
        stage: Constants.Stage.New,
        optionsMap: question1.optionsMap,
        answers: question1.answers,
        options: question1.options,
        multiSelect: question1.multiSelect,
        statement: question1.statement,
      },
      question2: {
        stage: Constants.Stage.New,
        optionsMap: question2.optionsMap,
        answers: question2.answers,
        options: question2.options,
        multiSelect: question2.multiSelect,
        statement: question2.statement,
      },
      savedStageSelected: false,
    };
  }

  /**
   * This function called on selection of options.
   * @param {string} data - selected option
   * @param {string} questionId - represents the question Id as question1 or question2
   */
  onSelection = (data, questionId) => {
    const survey = this.state;
    const question = survey[questionId];
    const surveyOptions = question.options;
    question.options = surveyOptions.map(item => {
      const val = item;
      if (item.id === data && !question.multiSelect) {
        val.selected = true;
      } else if (item.id === data && question.multiSelect) {
        val.selected = !item.selected;
      } else if (!question.multiSelect) {
        val.selected = false;
      }
      return val;
    });
    const selectedAnswers = question.options.filter(item => item.selected);
    question.answers = selectedAnswers.map(item => item.value);
    this.setState({ [questionId]: question, savedStageSelected: false });
    this.submitDisabled = !question.answers.length;
  };

  /**
   * This function will invoke on Save/Update CTA, and saves the current state in the backend.
   * @param {bool} updateQuestion1 - will tell which question to save/update
   */
  updateSurvey = updateQuestion1 => {
    const { question1, question2 } = this.state;
    const { saveSurveyData } = this.props;
    let updatedQuestion = {};
    if (updateQuestion1) {
      updatedQuestion = question1;
      updatedQuestion.stage = Constants.Stage.Saved;
      this.setState({ question1: updatedQuestion, savedStageSelected: true });
    } else {
      updatedQuestion = question2;
      updatedQuestion.stage = Constants.Stage.Saved;
      this.setState({ question2: updatedQuestion, savedStageSelected: true });
    }
    const payload = {
      answer1: question1.answers.length ? question1.answers[0] : '',
      answer2: question2.answers && question2.answers.length ? question2.answers.join('|') : '',
    };
    saveSurveyData(payload, !updateQuestion1);
    this.submitDisabled = true;
  };

  /**
   * This function invokes on the selection of first survey stage and sets the 1st stage as new to update.
   */
  selectFirstStage = () => {
    const { question1 } = this.state;
    const selectedQuestion = question1;
    selectedQuestion.stage = Constants.Stage.New;
    this.setState({ question1: selectedQuestion, savedStageSelected: true });
  };

  render() {
    const { className, labels, userFirstName } = this.props;
    const { question1, question2 } = this.state;
    const question1Stage = question1.stage;

    return (
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <SurveyWrapper>
          <Title>
            <BodyCopy
              fontSize="fs20"
              fontWeight="black"
              fontFamily="secondary"
              text={`${getLabelValue(labels, 'lbl_profile_survey_hi')}, ${userFirstName}`}
            />
            <BodyCopy
              fontSize="fs14"
              fontWeight="regular"
              fontFamily="secondary"
              text={getLabelValue(labels, 'lbl_profile_survey_header')}
              style={TextStyle}
            />
          </Title>
          <StageWrapper>
            <TouchableWrapper onPress={() => this.selectFirstStage()}>
              <Image
                alt="Survey Stage"
                source={starFilledIcon}
                height="26px"
                width="26px"
                onClick={this.selectFirstStage}
              />
            </TouchableWrapper>
            <StageLine />
            <Image
              alt="Survey Stage"
              height="26px"
              width="26px"
              source={question1Stage !== Constants.Stage.Saved ? starIcon : starFilledIcon}
            />
            <StageLine />
            <Image alt="Survey Stage" height="26px" width="26px" source={circleCheck} />
          </StageWrapper>
          {question1Stage !== Constants.Stage.Saved && (
            <SurveyQuestion
              labels={labels}
              className={className}
              options={question1.options}
              question={question1.statement}
              onSelection={this.onSelection}
              questionId={Constants.QUESTION1}
            />
          )}
          {question1Stage === Constants.Stage.Saved && (
            <SurveyQuestion
              labels={labels}
              className={className}
              options={question2.options}
              question={question2.statement}
              onSelection={this.onSelection}
              questionId={Constants.QUESTION2}
            />
          )}
          <ActionsWrapper>
            <Button
              onPress={() => this.updateSurvey(question1Stage !== Constants.Stage.Saved)}
              type="button"
              fill="BLUE"
              disabled={this.submitDisabled}
              text={getLabelValue(labels, 'lbl_profile_survey_save')}
            />
          </ActionsWrapper>
        </SurveyWrapper>
      </ScrollView>
    );
  }
}

AboutYouSurvey.propTypes = {
  className: PropTypes.string,
  userFirstName: PropTypes.string,
  labels: PropTypes.shape({
    lbl_profile_survey_header: PropTypes.string,
    lbl_profile_survey_describe_yourself: PropTypes.string,
    lbl_profile_survey_select_one: PropTypes.string,
    lbl_profile_survey_save: PropTypes.string,
  }),
  userSurveyQuestions: PropTypes.arrayOf(PropTypes.shape({})),
  saveSurveyData: PropTypes.func,
  userSurvey: PropTypes.arrayOf([]),
};

AboutYouSurvey.defaultProps = {
  className: '',
  userFirstName: '',
  labels: {
    lbl_profile_survey_header: '',
    lbl_profile_survey_describe_yourself: '',
    lbl_profile_survey_select_one: '',
    lbl_profile_survey_save: '',
  },
  userSurveyQuestions: [],
  saveSurveyData: () => {},
  userSurvey: [],
};

export default AboutYouSurvey;
