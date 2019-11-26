import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { UrlHandler } from '../../../../../../../utils/utils.app';

import {
  AddChildFormWrapper,
  BirthdayContainer,
  InputFieldHalf,
  StyledAnchorWrapper,
  CheckboxMarginWrapper,
} from '../styles/AddChild.style.native';
import endpoints from '../../../externalEndpoints';
import Select from '../../../../../../common/atoms/Select';

export class AddChildBirthdayForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    addChildBirthdayLabels: PropTypes.shape({}).isRequired,
    birthMonthOptionsMap: PropTypes.shape([]).isRequired,
    birthYearOptionsMap: PropTypes.shape([]).isRequired,
    childOptions: PropTypes.shape([]).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    closeAddModal: PropTypes.func,
  };

  static defaultProps = {
    closeAddModal: () => {},
  };

  static timestampFormatOptions = {
    timeZoneName: 'short',
  };

  render() {
    const {
      handleSubmit,
      addChildBirthdayLabels,
      birthMonthOptionsMap,
      birthYearOptionsMap,
      childOptions,
      timestamp,
      closeAddModal,
    } = this.props;
    return (
      <>
        <AddChildFormWrapper>
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_child_information')}
            spacingStyles="margin-top-LRG margin-left-LRG margin-bottom-LRG"
          />
          <ViewWithSpacing spacingStyles="margin-left-LRG margin-right-LRG">
            <Field
              label={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_child_name')}
              name="childName"
              id="childName"
              component={TextBox}
              dataLocator="childNameField"
            />
          </ViewWithSpacing>
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs10"
            fontWeight="black"
            color="gray.900"
            text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_birthday_heading')}
            spacingStyles="margin-left-LRG margin-right-LRG margin-top-LRG"
          />
          <BirthdayContainer>
            <InputFieldHalf>
              <Field
                placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_birthday_month')}
                component={Select}
                options={birthMonthOptionsMap}
                name="childBirthMonth"
              />
            </InputFieldHalf>
            <InputFieldHalf>
              <Field
                placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_birthday_year')}
                component={Select}
                options={birthYearOptionsMap}
                name="childBirthYear"
              />
            </InputFieldHalf>
          </BirthdayContainer>
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs10"
            fontWeight="black"
            color="gray.900"
            text={getLabelValue(addChildBirthdayLabels, 'add_child_gender_heading')}
            spacingStyles="margin-left-LRG margin-right-LRG margin-top-LRG"
          />
          <BirthdayContainer>
            <InputFieldHalf>
              <Field
                component={Select}
                placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_gender_heading')}
                options={childOptions}
                name="gender"
              />
            </InputFieldHalf>
          </BirthdayContainer>
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_parent_digital_signature')}
            spacingStyles="margin-top-LRG margin-left-LRG margin-bottom-LRG"
          />
          <BirthdayContainer>
            <InputFieldHalf>
              <Field
                label={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_first_name')}
                name="firstName"
                id="firstName"
                component={TextBox}
                dataLocator="firstNameField"
              />
            </InputFieldHalf>
            <InputFieldHalf>
              <Field
                label={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_last_name')}
                name="lastName"
                id="lastName"
                component={TextBox}
                dataLocator="lastNameField"
              />
            </InputFieldHalf>
          </BirthdayContainer>
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            text={`${getLabelValue(
              addChildBirthdayLabels,
              'lbl_add_child_timestamp'
            )} ${timestamp.toLocaleString('en-US', AddChildBirthdayForm.timestampFormatOptions)}`}
            spacingStyles="margin-right-LRG margin-left-LRG"
          />
          <CheckboxMarginWrapper>
            <Field
              id="acceptAddChildAgreement"
              name="acceptAddChildAgreement"
              component={InputCheckbox}
              isChecked={this.isEmployeeCheck}
              dataLocator="tnccb"
              rightText={`${getLabelValue(
                addChildBirthdayLabels,
                'lbl_add_child_terms_agreement'
              )}${getLabelValue(addChildBirthdayLabels, 'lbl_add_child_terms_agreement_second')}`}
            />
          </CheckboxMarginWrapper>
          <StyledAnchorWrapper>
            <Anchor
              fontSizeVariation="medium"
              underline
              onPress={() => {
                UrlHandler(endpoints.policiesPage);
              }}
              anchorVariation="primary"
              data-locator="privacyLnk"
              text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_privacy')}
            />
            <Anchor
              fontSizeVariation="medium"
              underline
              noLink
              onPress={() => {
                UrlHandler(endpoints.faqPage);
              }}
              anchorVariation="primary"
              data-locator="faqLnk"
              text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_faq')}
            />
          </StyledAnchorWrapper>
        </AddChildFormWrapper>
        <ViewWithSpacing spacingStyles="margin-top-XXL">
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            onPress={handleSubmit}
            text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_save')}
          />
        </ViewWithSpacing>
        <ViewWithSpacing spacingStyles="margin-top-MED margin-bottom-XL">
          <Button
            fill="WHITE"
            onPress={closeAddModal}
            text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_cancel')}
          />
        </ViewWithSpacing>
      </>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'acceptAddChildAgreement',
    'childName',
    'firstName',
    'lastName',
    'childBirthMonth',
    'childBirthYear',
    'gender',
  ])
);

export default reduxForm({
  form: 'AddChildBirthdayForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(AddChildBirthdayForm);
