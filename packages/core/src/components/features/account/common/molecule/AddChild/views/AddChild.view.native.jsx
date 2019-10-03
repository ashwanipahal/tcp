import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, change } from 'redux-form';
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

import DropDown from '../../../../../../common/atoms/DropDown/views/DropDown.native';
import {
  AddChildFormWrapper,
  BirthdayContainer,
  InputFieldHalf,
  dropDownStyle,
  itemStyle,
  StyledAnchorWrapper,
  CheckboxMarginWrapper,
} from '../styles/AddChild.style.native';
import endpoints from '../../../externalEndpoints';

export class AddChildBirthdayForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    addChildBirthdayLabels: PropTypes.shape({}).isRequired,
    birthMonthOptionsMap: PropTypes.shape([]).isRequired,
    birthYearOptionsMap: PropTypes.shape([]).isRequired,
    childOptions: PropTypes.shape([]).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    closeAddModal: PropTypes.func,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    closeAddModal: () => {},
    dispatch: () => {},
  };

  static timestampFormatOptions = {
    timeZoneName: 'short',
  };

  onUserBirthMonthChangeValue = itemValue => {
    const { dispatch } = this.props;
    dispatch(change('AddChildBirthdayForm', 'userBirthMonth', itemValue));
  };

  onUserBirthYear = itemValue => {
    const { dispatch } = this.props;
    dispatch(change('AddChildBirthdayForm', 'userBirthYear', itemValue));
  };

  onGenderChangeValue = itemValue => {
    const { dispatch } = this.props;
    dispatch(change('AddChildBirthdayForm', 'gender', itemValue));
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
          <BirthdayContainer>
            <InputFieldHalf>
              <Field
                component={DropDown}
                heading={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_birthday_heading')}
                selectedValue={getLabelValue(
                  addChildBirthdayLabels,
                  'lbl_add_child_birthday_month'
                )}
                data={birthMonthOptionsMap}
                dataLocator="childBirthdayMonthDD"
                dropDownStyle={{ ...dropDownStyle }}
                onValueChange={this.onUserBirthMonthChangeValue}
                itemStyle={{ ...itemStyle }}
                variation="secondary"
                bgColor
              />
              <ViewWithSpacing spacingStyles="margin-top-SM">
                <Field
                  component={TextBox}
                  title=""
                  type="hidden"
                  id="userBirthMonth"
                  name="userBirthMonth"
                />
              </ViewWithSpacing>
            </InputFieldHalf>
            <InputFieldHalf birthYear>
              <Field
                component={DropDown}
                data={birthYearOptionsMap}
                selectedValue={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_birthday_year')}
                dataLocator="childBirthdayYearDD"
                dropDownStyle={{ ...dropDownStyle }}
                onValueChange={this.onUserBirthYear}
                itemStyle={{ ...itemStyle }}
                variation="secondary"
                bgColor
              />
              <Field
                component={TextBox}
                title=""
                type="hidden"
                id="userBirthYear"
                name="userBirthYear"
              />
            </InputFieldHalf>
          </BirthdayContainer>

          <BirthdayContainer chooseGender>
            <InputFieldHalf>
              <Field
                component={DropDown}
                heading={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_gender_heading')}
                selectedValue={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_choose_gender')}
                data={childOptions}
                dataLocator="childGenderDD"
                dropDownStyle={{ ...dropDownStyle }}
                onValueChange={this.onGenderChangeValue}
                itemStyle={{ ...itemStyle }}
                variation="secondary"
                bgColor
              />
              <ViewWithSpacing spacingStyles="margin-top-SM">
                <Field component={TextBox} title="" type="hidden" id="gender" name="gender" />
              </ViewWithSpacing>
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
            buttonVariation="variable-width"
            text={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_save')}
          />
        </ViewWithSpacing>
        <ViewWithSpacing spacingStyles="margin-top-MED margin-bottom-XL">
          <Button
            fill="WHITE"
            buttonVariation="variable-width"
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
    'userBirthMonth',
    'userBirthYear',
    'gender',
  ])
);

export default reduxForm({
  form: 'AddChildBirthdayForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(AddChildBirthdayForm);
