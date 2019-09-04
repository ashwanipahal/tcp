import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import { BodyCopy, Row } from '@tcp/core/src/components/common/atoms';
import TileOption from '@tcp/core/src/components/features/account/MyProfile/atoms/TileOption';

import styles from '../styles/SurveyQuestion.style';

export const SurveyQuestion = ({
  className,
  labels,
  options,
  question,
  questionId,
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
          {labels.lbl_profile_survey_select_one}
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
  }),
  options: PropTypes.arrayOf([]).isRequired,
  className: PropTypes.string,
  question: PropTypes.string,
  questionId: PropTypes.string,
};

SurveyQuestion.defaultProps = {
  className: '',
  labels: PropTypes.shape({
    lbl_profile_survey_select_one: '',
  }),
  question: '',
  questionId: '',
};

export default withStyles(SurveyQuestion, styles);
export { SurveyQuestion as SurveyQuestionVanilla };
