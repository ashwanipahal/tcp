import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, change } from 'redux-form';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Button from '@tcp/core/src/components/common/atoms/Button';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import { UrlHandler } from '../../../../../../../utils/utils.app';

import DropDown from '../../../../../../common/atoms/DropDown/views/DropDown.native';
import {
  AddChildFormWrapper,
  InformationHeaderView,
  FieldTopMarginWrapper,
  BirthdayContainer,
  InputFieldHalf,
  dropDownStyle,
  itemStyle,
  StyledAnchorWrapper,
  SaveButtonWrapper,
  CancelButtonWrapper,
  CheckboxMarginWrapper,
  HiddenStateWrapper,
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
          <InformationHeaderView>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="regular"
              text={addChildBirthdayLabels.lbl_add_child_child_information}
            />
          </InformationHeaderView>
          <FieldTopMarginWrapper>
            <Field
              label={addChildBirthdayLabels.lbl_add_child_child_name}
              name="childName"
              id="childName"
              component={TextBox}
              dataLocator="childNameField"
            />
          </FieldTopMarginWrapper>
          <BirthdayContainer>
            <InputFieldHalf>
              <Field
                component={DropDown}
                heading={addChildBirthdayLabels.lbl_add_child_birthday_heading}
                selectedValue={addChildBirthdayLabels.lbl_add_child_birthday_month}
                data={birthMonthOptionsMap}
                dataLocator="childBirthdayMonthDD"
                dropDownStyle={{ ...dropDownStyle }}
                onValueChange={this.onUserBirthMonthChangeValue}
                itemStyle={{ ...itemStyle }}
                variation="secondary"
                bgColor
              />
              <HiddenStateWrapper>
                <Field
                  component={TextBox}
                  title=""
                  type="hidden"
                  id="userBirthMonth"
                  name="userBirthMonth"
                />
              </HiddenStateWrapper>
            </InputFieldHalf>
            <InputFieldHalf birthYear>
              <Field
                component={DropDown}
                data={birthYearOptionsMap}
                selectedValue={addChildBirthdayLabels.lbl_add_child_birthday_year}
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
                heading={addChildBirthdayLabels.lbl_add_child_gender_heading}
                selectedValue={addChildBirthdayLabels.lbl_add_child_choose_gender}
                data={childOptions}
                dataLocator="childGenderDD"
                dropDownStyle={{ ...dropDownStyle }}
                onValueChange={this.onGenderChangeValue}
                itemStyle={{ ...itemStyle }}
                variation="secondary"
                bgColor
              />
              <HiddenStateWrapper>
                <Field component={TextBox} title="" type="hidden" id="gender" name="gender" />
              </HiddenStateWrapper>
            </InputFieldHalf>
          </BirthdayContainer>
          <InformationHeaderView>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="regular"
              text={addChildBirthdayLabels.lbl_add_child_parent_digital_signature}
            />
          </InformationHeaderView>
          <BirthdayContainer>
            <InputFieldHalf>
              <Field
                label={addChildBirthdayLabels.lbl_add_child_first_name}
                name="firstName"
                id="firstName"
                component={TextBox}
                dataLocator="firstNameField"
              />
            </InputFieldHalf>
            <InputFieldHalf>
              <Field
                label={addChildBirthdayLabels.lbl_add_child_last_name}
                name="lastName"
                id="lastName"
                component={TextBox}
                dataLocator="lastNameField"
              />
            </InputFieldHalf>
          </BirthdayContainer>
          <FieldTopMarginWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              text={`${addChildBirthdayLabels.lbl_add_child_timestamp} ${timestamp.toLocaleString(
                'en-US',
                AddChildBirthdayForm.timestampFormatOptions
              )}`}
            />
          </FieldTopMarginWrapper>
          <CheckboxMarginWrapper>
            <Field
              id="acceptAddChildAgreement"
              name="acceptAddChildAgreement"
              component={InputCheckbox}
              isChecked={this.isEmployeeCheck}
              dataLocator="tnccb"
              rightText={`${addChildBirthdayLabels.lbl_add_child_terms_agreement}${
                addChildBirthdayLabels.lbl_add_child_terms_agreement_second
              }`}
            />
          </CheckboxMarginWrapper>
          {/* <CheckBoxWrapper>
            <Field
              name="hasGiftWrapping"
              component={InputCheckbox}
              dataLocator="hide-show-checkbox"
              enableSuccessCheck={false}
              onChange={this.handleChange}
            />
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              text={`${addChildBirthdayLabels.lbl_add_child_terms_agreement}${
                addChildBirthdayLabels.lbl_add_child_terms_agreement_second
              }`}
            />
          </CheckBoxWrapper> */}
          <StyledAnchorWrapper>
            <Anchor
              fontSizeVariation="medium"
              underline
              onPress={() => {
                UrlHandler(endpoints.policiesPage);
              }}
              anchorVariation="primary"
              data-locator="privacyLnk"
              text={addChildBirthdayLabels.lbl_add_child_privacy}
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
              text={addChildBirthdayLabels.lbl_add_child_faq}
            />
          </StyledAnchorWrapper>
        </AddChildFormWrapper>

        <SaveButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            onPress={handleSubmit}
            buttonVariation="variable-width"
            text={addChildBirthdayLabels.lbl_add_child_save}
          />
        </SaveButtonWrapper>
        <CancelButtonWrapper>
          <Button
            fill="WHITE"
            buttonVariation="variable-width"
            onPress={closeAddModal}
            text={addChildBirthdayLabels.lbl_add_child_cancel}
          />
        </CancelButtonWrapper>
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
