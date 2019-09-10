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
            dataLocator: 'moreaboutyou-question-parentbtn',
          },
          {
            id: 'shopper2',
            value: labels.lbl_profile_survey_question1_option2,
            selected: false,
            dataLocator: 'moreaboutyou-question-grandparentbtn',
          },
          {
            id: 'shopper3',
            value: labels.lbl_profile_survey_question1_option3,
            selected: false,
            dataLocator: 'moreaboutyou-question-giftingforothersbtn',
          },
          {
            id: 'shopper4',
            value: labels.lbl_profile_survey_question1_option4,
            selected: false,
            dataLocator: 'moreaboutyou-question-prefernottoanswerbtn',
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
            dataLocator: 'moreaboutyou-question-girlbtn',
          },
          {
            id: 'shopper2',
            value: labels.lbl_profile_survey_question2_option2,
            selected: false,
            dataLocator: 'moreaboutyou-question-boybtn',
          },
          {
            id: 'shopper3',
            value: labels.lbl_profile_survey_question2_option3,
            selected: false,
            dataLocator: 'moreaboutyou-question-toddlergirlbtn',
          },
          {
            id: 'shopper4',
            value: labels.lbl_profile_survey_question2_option4,
            selected: false,
            dataLocator: 'moreaboutyou-question-toddlerboybtn',
          },
          {
            id: 'shopper5',
            value: labels.lbl_profile_survey_question2_option5,
            selected: false,
            dataLocator: 'moreaboutyou-question-babybtn',
          },
        ],
      },
    ],
  };
};

export default getAboutYouSurvey;
