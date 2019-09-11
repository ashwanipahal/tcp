import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import { BodyCopy, Row } from '@tcp/core/src/components/common/atoms';
import TileOption from '@tcp/core/src/components/features/account/MyProfile/atoms/TileOption';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import constants from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurvey/container/AboutYouSurvey.utils';
import styles from '../styles/SurveyQuestion.style';

export const SurveyQuestion = ({
  className,
  labels,
  options,
  question,
  questionId,
  dataLocator,
  ...otherProps
}) => {
  return (
    <div className={`survey__container ${className}`}>
      <Row centered>
        <BodyCopy
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          className="question-text"
          data-locator={dataLocator}
        >
          {question}
        </BodyCopy>
      </Row>
      <Row centered>
        <BodyCopy
          fontSize="fs13"
          fontWeight="regular"
          fontFamily="secondary"
          className="question-text"
        >
          {questionId === constants.QUESTION1
            ? getLabelValue(labels, 'lbl_profile_survey_select_one')
            : getLabelValue(labels, 'lbl_profile_survey_select_all')}
        </BodyCopy>
      </Row>
      <div className="options__container">
        {options &&
          options.map(option => {
            return (
              <div className="options">
                <TileOption
                  className={className}
                  optionText={option.value}
                  optionValue={option.id}
                  isSelected={option.selected}
                  questionId={questionId}
                  dataLocator={option.dataLocator}
                  {...otherProps}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

SurveyQuestion.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_survey_select_one: PropTypes.string,
    lbl_profile_survey_select_all: PropTypes.string,
  }),
  options: PropTypes.arrayOf([]).isRequired,
  className: PropTypes.string,
  question: PropTypes.string,
  questionId: PropTypes.string,
  dataLocator: PropTypes.string,
};

SurveyQuestion.defaultProps = {
  className: '',
  labels: PropTypes.shape({
    lbl_profile_survey_select_one: '',
    lbl_profile_survey_select_all: '',
  }),
  question: '',
  questionId: '',
  dataLocator: '',
};

export default withStyles(SurveyQuestion, styles);
export { SurveyQuestion as SurveyQuestionVanilla };
