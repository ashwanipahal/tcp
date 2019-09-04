export const getAboutYouSurvey = labels => {
  return {
    questions: [
      {
        id: 'answer1',
        statement: labels.lbl_profile_survey_question1,
        multiSelect: false,
        answers: [],
        optionsMap: {
          shopper1: labels.lbl_profile_survey_question1_option1,
          shopper2: labels.lbl_profile_survey_question1_option2,
          shopper3: labels.lbl_profile_survey_question1_option3,
          shopper4: labels.lbl_profile_survey_question1_option4,
        },
        options: [
          {
            id: 'shopper1',
            value: labels.lbl_profile_survey_question1_option1,
            selected: false,
          },
          {
            id: 'shopper2',
            value: labels.lbl_profile_survey_question1_option2,
            selected: false,
          },
          {
            id: 'shopper3',
            value: labels.lbl_profile_survey_question1_option3,
            selected: false,
          },
          {
            id: 'shopper4',
            value: labels.lbl_profile_survey_question1_option4,
            selected: false,
          },
        ],
      },
      {
        id: 'answer2',
        statement: labels.lbl_profile_survey_question2,
        multiSelect: true,
        answers: [],
        optionsMap: {
          shopper1: labels.lbl_profile_survey_question2_option1,
          shopper2: labels.lbl_profile_survey_question2_option2,
          shopper3: labels.lbl_profile_survey_question2_option3,
          shopper4: labels.lbl_profile_survey_question2_option4,
          shopper5: labels.lbl_profile_survey_question2_option5,
        },
        options: [
          {
            id: 'shopper1',
            value: labels.lbl_profile_survey_question2_option1,
            selected: false,
          },
          {
            id: 'shopper2',
            value: labels.lbl_profile_survey_question2_option2,
            selected: false,
          },
          {
            id: 'shopper3',
            value: labels.lbl_profile_survey_question2_option3,
            selected: false,
          },
          {
            id: 'shopper4',
            value: labels.lbl_profile_survey_question2_option4,
            selected: false,
          },
          {
            id: 'shopper5',
            value: labels.lbl_profile_survey_question2_option5,
            selected: false,
          },
        ],
      },
    ],
  };
};

export default getAboutYouSurvey;
