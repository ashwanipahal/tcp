import React from 'react';
import PropTypes from 'prop-types';
import { Button, BodyCopy, Row, Col, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SurveyQuestion from '@tcp/core/src/components/features/account/MyProfile/molecules/SurveyQuestion';
import { getIconPath } from '@tcp/core/src/utils';
import styles from '../styles/AboutYouSurvey.style';
import { Constants } from '../container/AboutYouSurvey.utils';

export class AboutYouSurvey extends React.Component {
  constructor(props) {
    super(props);
    const { userSurveyQuestions } = props;
    const question1 = userSurveyQuestions[0];
    const question2 = userSurveyQuestions[1];
    this.submitDisabled = true;

    this.state = {
      question1: {
        stage: question1.answers.length ? Constants.Stage.Saved : Constants.Stage.New,
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
      if (item.id === data) {
        val.selected = !item.selected;
      } else if (!question.multiSelect) {
        val.selected = false;
      }
      return val;
    });
    const selectedAnswers = question.options.filter(item => item.selected);
    question.answers = selectedAnswers.map(item => item.value);
    this.setState({ [questionId]: question, savedStageSelected: true });
    this.submitDisabled = false;
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
    saveSurveyData(payload);
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
    const { className, labels, userFirstName, userSurvey } = this.props;
    const { question1, question2, savedStageSelected } = this.state;
    let question1Stage = question1.stage;
    const updatedQuestion1 = question1;
    const answer1 = userSurvey && userSurvey.getIn(['0', '0']);
    if (question1.answers.length && !savedStageSelected) {
      question1Stage = Constants.Stage.Saved;
    } else if (answer1 && !question1.answers.length) {
      updatedQuestion1.answers = answer1;
      question1Stage = Constants.Stage.Saved;
    }

    return (
      <div className={className}>
        <div className="questions-container">
          <Row centered>
            <BodyCopy fontSize="fs20" fontWeight="black" fontFamily="secondary">
              {`${labels.lbl_profile_survey_hi}, ${userFirstName}`}
            </BodyCopy>
          </Row>
          <Row centered>
            <Col colSize={{ small: 6, medium: 6, large: 8 }} className="sub-header">
              <BodyCopy
                fontSize="fs14"
                fontWeight="regular"
                fontFamily="secondary"
                component="div"
                className="title-text"
              >
                {labels.lbl_profile_survey_header}
              </BodyCopy>
            </Col>
          </Row>
          <Row centered>
            <Col colSize={{ small: 4, medium: 8, large: 10 }} className="stage-wrapper">
              <Image
                alt="Survey Stage"
                className="star-image"
                title="survey completion stage"
                src={getIconPath('star-filled')}
                onClick={this.selectFirstStage}
                role="presentation"
              />
              <hr className="stage-line" />
              <Image
                alt="Survey Stage"
                className="star-image"
                title="survey completion stage"
                src={getIconPath(question1Stage !== Constants.Stage.Saved ? 'star' : 'star-filled')}
              />
              <hr className="stage-line" />
              <Image alt="Survey Stage" className="star-image" src={getIconPath('circle-check')} />
            </Col>
          </Row>

          <Row fullBleed>
            <Row fullBleed>
              {question1Stage !== Constants.Stage.Saved && (
                <SurveyQuestion
                  labels={labels}
                  className={className}
                  options={updatedQuestion1.options}
                  question={updatedQuestion1.statement}
                  onSelection={this.onSelection}
                  questionId="question1"
                />
              )}
            </Row>
            <Row centered>
              {question1Stage === Constants.Stage.Saved && (
                <SurveyQuestion
                  labels={labels}
                  className={className}
                  options={question2.options}
                  question={question2.statement}
                  onSelection={this.onSelection}
                  questionId="question2"
                />
              )}
            </Row>
          </Row>
          <Row centered>
            <Col colSize={{ small: 3 }} className="survey-submit-wrapper">
              <Button
                onClick={() => this.updateSurvey(question1Stage !== Constants.Stage.Saved)}
                buttonVariation="fixed-width"
                type="button"
                fill="BLUE"
                className="survey-submit__cta"
                disabled={this.submitDisabled}
              >
                {labels.lbl_profile_survey_save}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
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

export default withStyles(AboutYouSurvey, styles);
export { AboutYouSurvey as AboutYouSurveyVanilla };
