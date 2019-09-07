import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import TileOption from '@tcp/core/src/components/features/account/MyProfile/atoms/TileOption';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import constants from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurvey/container/AboutYouSurvey.utils';
import {
  OptionsContainer,
  Options,
  QuestionWrapper,
  QuestionText,
} from '../styles/SurveyQuestion.style.native';

export const SurveyQuestion = ({
  className,
  labels,
  options,
  question,
  questionId,
  ...otherProps
}) => {
  return (
    <QuestionWrapper>
      <QuestionText>
        <BodyCopy fontSize="fs14" fontWeight="regular" fontFamily="secondary" text={question} />
        <BodyCopy
          fontSize="fs13"
          fontWeight="regular"
          fontFamily="secondary"
          text={
            questionId === constants.QUESTION1
              ? getLabelValue(labels, 'lbl_profile_survey_select_one')
              : getLabelValue(labels, 'lbl_profile_survey_select_all')
          }
        />
      </QuestionText>
      <OptionsContainer>
        {options &&
          options.map(option => {
            return (
              <Options>
                <TileOption
                  className={className}
                  optionText={option.value}
                  optionValue={option.id}
                  isSelected={option.selected}
                  questionId={questionId}
                  {...otherProps}
                />
              </Options>
            );
          })}
      </OptionsContainer>
    </QuestionWrapper>
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
};

SurveyQuestion.defaultProps = {
  className: '',
  labels: {
    lbl_profile_survey_select_one: '',
    lbl_profile_survey_select_all: '',
  },
  question: '',
  questionId: '',
};

export default SurveyQuestion;
