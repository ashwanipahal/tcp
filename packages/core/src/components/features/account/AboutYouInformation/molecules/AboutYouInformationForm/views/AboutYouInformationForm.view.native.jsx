import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { BodyCopy, Button, LabeledRadioButton } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  AboutYouWrapper,
  OptionsWrapper,
  Options,
  ActionsWrapper,
  ActionsContainer,
} from '../styles/AboutYouInformationForm.style.native';
import AboutYouInformationConstants from '../../../container/AboutYouInformation.constants';

export class AboutYouInformationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const { initialValues } = this.props;
    this.state = {
      options1: initialValues.options1,
      options2: initialValues.options2,
    };
  }

  /**
   * This function is to update the selected option state.
   * @param {bool} isFirstQuestion - to uniquely identify the question selected
   * @param {string} value - selcted option value
   */
  onSelectOption = (isFirstQuestion, value) => {
    const { options1, options2 } = this.state;
    const newOptions = (isFirstQuestion ? options1 : options2).map(option => {
      const updatedOption = option;
      if (isFirstQuestion) {
        updatedOption.selected = option.value === value;
      } else if (!isFirstQuestion && option.value === value) {
        updatedOption.selected = !updatedOption.selected;
      }
      return updatedOption;
    });
    if (isFirstQuestion) {
      this.setState({
        options1: newOptions,
      });
    } else {
      this.setState({
        options2: newOptions,
      });
    }
  };

  /**
   * This function is to construct the request payload to submit to the container
   */
  onUpdate = () => {
    const { options1, options2 } = this.state;
    const { onSubmit, onClose } = this.props;
    const answer1 = options1.find(item => item.selected).value;
    const answer2List = options2.filter(item => item.selected);
    const answer2 = answer2List ? answer2List.map(option => option.value).join('|') : '';
    onSubmit({ answer1, answer2 });
    onClose();
  };

  render() {
    const { labels, pristine, onClose } = this.props;
    const { options1, options2 } = this.state;
    return (
      <AboutYouWrapper>
        <BodyCopy
          fontSize="fs14"
          fontFamily="secondary"
          data-locator="moreaboutyou-edit-q1text"
          text={getLabelValue(labels, 'lbl_profile_survey_question1')}
        />
        <OptionsWrapper>
          {options1.map((option, index) => {
            return (
              <Options>
                <LabeledRadioButton
                  obj={{
                    label: option.value,
                    value: option.value,
                  }}
                  index={index}
                  name="question1"
                  checked={option.selected}
                  data-locator={`moreaboutyou-radiooption-${index}`}
                  onPress={() => this.onSelectOption(true, option.value)}
                />
              </Options>
            );
          })}
        </OptionsWrapper>

        <View>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            data-locator="moreaboutyou-edit-q2text"
            text={getLabelValue(labels, 'lbl_profile_survey_question2')}
          />
        </View>

        <OptionsWrapper>
          {options2.map((option, index) => {
            return (
              <Options>
                <Field
                  name={`question2-option-${index}`}
                  component={InputCheckbox}
                  data-locator={`moreaboutyou-checkboxoption-${index}`}
                  isChecked={option.selected}
                  rightText={option.value}
                  fontSize="fs11"
                  onClick={() => this.onSelectOption(false, option.value)}
                />
              </Options>
            );
          })}
        </OptionsWrapper>

        <ActionsContainer>
          <ActionsWrapper>
            <Button
              fill="BLUE"
              data-locator="moreaboutyou-savebtn"
              disabled={pristine}
              onPress={this.onUpdate}
              text={getLabelValue(labels, 'lbl_profile_survey_save')}
            />
          </ActionsWrapper>
          <ActionsWrapper>
            <Button
              data-locator="moreaboutyou-cancelbtn"
              text={getLabelValue(labels, 'lbl_profile_personal_info_cancelCta')}
              onPress={onClose}
            />
          </ActionsWrapper>
        </ActionsContainer>
      </AboutYouWrapper>
    );
  }
}

AboutYouInformationForm.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_cancelCta: PropTypes.string,
    lbl_profile_survey_save: PropTypes.string,
    lbl_profile_survey_question1: PropTypes.string,
    lbl_profile_survey_question2: PropTypes.string,
  }),
  pristine: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

AboutYouInformationForm.defaultProps = {
  labels: {
    lbl_profile_personal_info_cancelCta: '',
    lbl_profile_survey_save: '',
    lbl_profile_survey_question1: '',
    lbl_profile_survey_question2: '',
  },
};

export default reduxForm({
  form: AboutYouInformationConstants.ABOUT_YOU_INFORMATION_FORM, // a unique identifier for this form
})(AboutYouInformationForm);
