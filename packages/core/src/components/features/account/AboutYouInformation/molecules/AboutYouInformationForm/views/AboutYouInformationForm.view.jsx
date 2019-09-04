import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
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
import styles from '../styles/AboutYouInformationForm.style';
import AboutYouInformationConstants from '../../../container/AboutYouInformation.constants';
import internalEndpoints from '../../../../common/internalEndpoints';

export class AboutYouInformationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const { initialValues } = this.props;
    this.state = {
      options1: initialValues.options1,
      options2: initialValues.options2,
    };
  }

  onSelectOption = (questionId, value) => {
    const { options1, options2 } = this.state;
    const updateOptions = questionId === 'question1' ? options1 : options2;
    const newOptions = updateOptions.map(option => {
      const updatedOption = option;
      if (questionId === 'question1') {
        updatedOption.selected = option.value === value;
      } else if (questionId === 'question2' && option.value === value) {
        updatedOption.selected = !updatedOption.selected;
      }
      return updatedOption;
    });
    if (questionId === 'question1') {
      this.setState({
        options1: newOptions,
      });
    } else {
      this.setState({
        options2: newOptions,
      });
    }
  };

  onUpdate = () => {
    const { options1, options2 } = this.state;
    const { onSubmit } = this.props;
    const answer1 = options1.find(item => item.selected).value;
    const answer2List = options2.filter(item => item.selected);
    const answer2 = answer2List ? answer2List.map(option => option.value).join('|') : '';
    onSubmit({ answer1, answer2 });
  };

  render() {
    const { className, labels, pristine, errorMessage, handleSubmit } = this.props;
    const { options1, options2 } = this.state;
    return (
      <form
        name={AboutYouInformationConstants.ABOUT_YOU_INFORMATION_FORM}
        className={className}
        onSubmit={handleSubmit}
        noValidate
      >
        {errorMessage && (
          <Notification
            className="elem-mt-MED"
            status="error"
            message={labels[`lbl_profile_error_${errorMessage}`]}
          />
        )}
        <Row fullBleed className="elem-mt-XXL">
          <BodyCopy>{labels.lbl_profile_survey_question1}</BodyCopy>
        </Row>
        <Row fullBleed className="elem-mt-XXL">
          {options1.map(option => {
            return (
              <Col colSize={{ small: 3, medium: 4, large: 3 }}>
                <Field
                  component={LabeledRadioButton}
                  key="shippingMethodId"
                  selectedValue={option.selected}
                  name="shippingMethodId"
                  checked={option.selected}
                  onClick={() => this.onSelectOption('question1', option.value)}
                >
                  <BodyCopy>{option.value}</BodyCopy>
                </Field>
              </Col>
            );
          })}
        </Row>

        <Row fullBleed className="elem-mt-XXL">
          <BodyCopy>{labels.lbl_profile_survey_question2}</BodyCopy>
        </Row>

        <Row fullBleed className="elem-mt-XXL">
          {options2.map((option, index) => {
            return (
              <Col colSize={{ small: 3, medium: 4, large: 2 }}>
                <Field
                  name={`question2-option-${index}`}
                  component={InputCheckbox}
                  dataLocator="editPersonalInfo-isEmployee"
                  className="AddPersonalInfo-isEmployee"
                  checked={option.selected}
                  onChange={() => this.onSelectOption('question2', option.value)}
                >
                  {option.value}
                </Field>
              </Col>
            );
          })}
        </Row>

        <Row className="elem-mb-LRG elem-mt-XXL">
          <Col
            className="AddEditPersonalInformationForm_cancel"
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
                dataLocator="cancelBtn"
                fullWidth
                className="elem-mb-XS"
              >
                {labels.lbl_profile_personal_info_cancelCta}
              </Button>
            </Anchor>
          </Col>
          <Col
            className="AddEditPersonalInformationForm_update"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
          >
            <Button
              fill="BLUE"
              buttonVariation="fixed-width"
              dataLocator="UpdateBtn"
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
              onClick={this.onUpdate}
            >
              {labels.lbl_profile_personal_info_updateCta}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

AboutYouInformationForm.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_cancelCta: PropTypes.string,
    lbl_profile_personal_info_updateCta: PropTypes.string,
  }),
  pristine: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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

// const validateMethod = createValidateMethod(getStandardConfig([]));

export default reduxForm({
  form: AboutYouInformationConstants.ABOUT_YOU_INFORMATION_FORM, // a unique identifier for this form
})(withStyles(AboutYouInformationForm, styles));
