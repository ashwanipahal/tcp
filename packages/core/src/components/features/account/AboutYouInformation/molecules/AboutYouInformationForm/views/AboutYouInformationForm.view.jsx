import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  Anchor,
  BodyCopy,
  Button,
  Col,
  LabeledRadioButton,
  Row,
} from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import styles from '../styles/AboutYouInformationForm.style';
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
    const { onSubmit } = this.props;
    const answer1 = options1.find(item => item.selected).value;
    const answer2List = options2.filter(item => item.selected);
    const answer2 = answer2List ? answer2List.map(option => option.value).join('|') : '';
    onSubmit({ answer1, answer2 });
  };

  render() {
    const { className, labels, pristine } = this.props;
    const { options1, options2 } = this.state;
    return (
      <div className={className}>
        <Row fullBleed className="elem-mt-XXL">
          <BodyCopy dataLocator="moreaboutyou-edit-q1text">
            {labels.lbl_profile_survey_question1}
          </BodyCopy>
        </Row>
        <Row fullBleed className="elem-mt-XXL">
          {options1.map((option, index) => {
            return (
              <Col colSize={{ small: 3, medium: 4, large: 3 }}>
                <Field
                  component={LabeledRadioButton}
                  key="question1"
                  selectedValue={option.selected}
                  name="question1"
                  checked={option.selected}
                  dataLocator={`moreaboutyou-radiooption-${index}`}
                  onClick={() => this.onSelectOption(true, option.value)}
                >
                  <BodyCopy>{option.value}</BodyCopy>
                </Field>
              </Col>
            );
          })}
        </Row>

        <Row fullBleed className="elem-mt-XXL">
          <BodyCopy dataLocator="moreaboutyou-edit-q2text">
            {labels.lbl_profile_survey_question2}
          </BodyCopy>
        </Row>

        <Row fullBleed className="elem-mt-XXL">
          {options2.map((option, index) => {
            return (
              <Col colSize={{ small: 3, medium: 4, large: 2 }}>
                <Field
                  name={`question2-option-${index}`}
                  component={InputCheckbox}
                  dataLocator={`moreaboutyou-checkboxoption-${index}`}
                  checked={option.selected}
                  onChange={() => this.onSelectOption(false, option.value)}
                  className="aboutyou-checkbox"
                >
                  {option.value}
                </Field>
              </Col>
            );
          })}
        </Row>

        <Row className="elem-mb-LRG elem-mt-XXL">
          <Col
            className="aboutyou_cancel"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
            offsetLeft={{
              large: 3,
              medium: 1,
            }}
          >
            <Anchor
              to={internalEndpoints.profilePage.link}
              asPath={internalEndpoints.profilePage.path}
            >
              <Button
                type="button"
                buttonVariation="fixed-width"
                dataLocator="moreaboutyou-cancelbtn"
                fullWidth
                className="elem-mb-XS"
              >
                {labels.lbl_profile_personal_info_cancelCta}
              </Button>
            </Anchor>
          </Col>
          <Col
            className="aboutyou_save"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
          >
            <Button
              fill="BLUE"
              buttonVariation="fixed-width"
              dataLocator="moreaboutyou-savebtn"
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
              onClick={this.onUpdate}
            >
              {labels.lbl_profile_survey_save}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

AboutYouInformationForm.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_cancelCta: PropTypes.string,
    lbl_profile_personal_info_updateCta: PropTypes.string,
  }),
  pristine: PropTypes.bool.isRequired,
  className: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AboutYouInformationForm.defaultProps = {
  className: '',
  labels: {
    lbl_profile_personal_info_cancelCta: '',
    lbl_profile_personal_info_updateCta: '',
  },
};

export default reduxForm({
  form: AboutYouInformationConstants.ABOUT_YOU_INFORMATION_FORM, // a unique identifier for this form
})(withStyles(AboutYouInformationForm, styles));
export { AboutYouInformationForm as AboutYouInformationFormVanilla };
