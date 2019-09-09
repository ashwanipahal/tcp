import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, change } from 'redux-form';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Button from '@tcp/core/src/components/common/atoms/Button';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import AddEditPersonalInfoConstants from '../../../AddEditPersonalInformation.constants';
import DropDown from '../../../../../../common/atoms/DropDown/views/DropDown.native';
import {
  SaveButtonWrapper,
  FieldTopMarginWrapper,
  CancelButtonWrapper,
  dropDownStyle,
  itemStyle,
  InputFieldHalf,
  BirthdayContainer,
  AddEditMessageView,
  AddEditInfoWrapper,
  HiddenStateWrapper,
  FieldBirthdayTopMarginWrapper,
} from '../styles/AddEditPersonalInformationForm.native.style';

export class AddEditPersonalInformationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const monthArray = [
      {
        id: ``,
        displayName: 'Month',
      },
    ];
    const yearArray = [
      {
        id: ``,
        displayName: 'Year',
      },
    ];

    const { birthMonthOptionsMap, birthYearOptionsMap, initialValues } = props;
    this.isEmployeeCheck = initialValues.isEmployee;
    this.birthMonthOptionsArr = [...monthArray, ...birthMonthOptionsMap];
    this.birthYearOptionsArr = [...yearArray, ...birthYearOptionsMap];
    this.state = {
      birthMonthSelect: initialValues.userBirthMonth
        ? this.birthMonthOptionsArr[initialValues.userBirthMonth].displayName
        : this.birthMonthOptionsArr[0].displayName,
      birthYearSelect: initialValues.userBirthYear
        ? initialValues.userBirthYear
        : this.birthYearOptionsArr[0].displayName,
    };
  }

  render() {
    const { labels, handleSubmit, onCancel, dispatch, isEmployee } = this.props;
    const { birthMonthSelect, birthYearSelect } = this.state;

    return (
      <AddEditInfoWrapper>
        <FieldTopMarginWrapper>
          <Field
            label={labels.lbl_profile_personal_info_firstName}
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            maxLength={50}
            dataLocator="editPersonalInfo-firstname"
          />
        </FieldTopMarginWrapper>

        <Field
          label={labels.lbl_profile_personal_info_lastName}
          name="lastName"
          id="lastName"
          type="text"
          component={TextBox}
          maxLength={50}
          dataLocator="editPersonalInfo-lastname"
        />
        <Field
          label={labels.lbl_profile_personal_info_email}
          name="Email"
          id="Email"
          type="email"
          component={TextBox}
          dataLocator="editPersonalInfo-email"
        />
        <AddEditMessageView>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            text={labels.lbl_profile_email_used_login}
          />
        </AddEditMessageView>

        <FieldTopMarginWrapper>
          <Field
            label={labels.lbl_profile_personal_info_phoneNumber}
            name="phoneNumber"
            id="phoneNumber"
            component={TextBox}
            dataLocator="editPersonalInfo-phnumber"
            type="tel"
          />
        </FieldTopMarginWrapper>

        <BirthdayContainer>
          <InputFieldHalf>
            <Field
              component={DropDown}
              heading={labels.lbl_profile_personal_info_birthday}
              selectedValue={birthMonthSelect}
              data={this.birthMonthOptionsArr}
              dataLocator="addnewaddress-country"
              dropDownStyle={{ ...dropDownStyle }}
              onValueChange={itemValue => {
                dispatch(
                  change(
                    AddEditPersonalInfoConstants.ADD_PROFILE_INFORMATION_FORM,
                    'userBirthMonth',
                    itemValue
                  )
                );
                this.setState({ birthMonthSelect: itemValue });
              }}
              itemStyle={{ ...itemStyle }}
              variation="secondary"
            />
            <HiddenStateWrapper>
              <Field
                label=""
                component={TextBox}
                title=""
                type="hidden"
                id="userBirthMonth"
                name="userBirthMonth"
              />
            </HiddenStateWrapper>
          </InputFieldHalf>
          <InputFieldHalf zipCode>
            <Field
              component={DropDown}
              selectedValue={birthYearSelect}
              data={this.birthYearOptionsArr}
              dataLocator="editPersonalInfo-userBirthYear"
              dropDownStyle={{ ...dropDownStyle }}
              onValueChange={itemValue => {
                dispatch(
                  change(
                    AddEditPersonalInfoConstants.ADD_PROFILE_INFORMATION_FORM,
                    'userBirthYear',
                    itemValue
                  )
                );
                this.setState({ birthYearSelect: itemValue });
              }}
              itemStyle={{ ...itemStyle }}
              variation="secondary"
            />
            <Field
              label=""
              component={TextBox}
              title=""
              type="hidden"
              id="userBirthYear"
              name="userBirthYear"
            />
          </InputFieldHalf>
        </BirthdayContainer>

        <FieldBirthdayTopMarginWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            text={labels.lbl_profile_celebration_birthday}
          />
        </FieldBirthdayTopMarginWrapper>

        <FieldTopMarginWrapper>
          <Field
            id="isEmployee"
            name="isEmployee"
            component={InputCheckbox}
            isChecked={this.isEmployeeCheck}
            dataLocator="editPersonalInfo-isEmployee"
            rightText={labels.lbl_profile_personal_info_tcp_employee}
          />
        </FieldTopMarginWrapper>
        {isEmployee && (
          <FieldTopMarginWrapper>
            <Field
              label={labels.lbl_profile_personal_info_associate_id}
              name="associateId"
              id="associateId"
              type="text"
              component={TextBox}
              dataLocator="editPersonalInfo-associateId"
            />
          </FieldTopMarginWrapper>
        )}
        <SaveButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            onPress={handleSubmit}
            buttonVariation="variable-width"
            text={labels.lbl_profile_personal_info_updateCta}
          />
        </SaveButtonWrapper>
        <CancelButtonWrapper>
          <Button
            fill="WHITE"
            buttonVariation="variable-width"
            onPress={onCancel}
            text={labels.lbl_profile_personal_info_cancelCta}
          />
        </CancelButtonWrapper>
      </AddEditInfoWrapper>
    );
  }
}

AddEditPersonalInformationForm.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_firstName: PropTypes.string,
  }),
  initialValues: PropTypes.shape({
    userBirthMonth: PropTypes.string,
    userBirthYear: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  birthMonthOptionsMap: PropTypes.shape([]).isRequired,
  birthYearOptionsMap: PropTypes.shape([]).isRequired,
  isEmployee: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
};

AddEditPersonalInformationForm.defaultProps = {
  labels: {
    lbl_profile_personal_info_firstName: '',
  },
  initialValues: {
    userBirthMonth: '',
    userBirthYear: '',
  },
  dispatch: () => {},
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'phoneNumber',
    'associateId',
    'airMilesAccountNumber',
    'Email',
    'userBirthMonth',
    'userBirthYear',
  ])
);

export default reduxForm({
  form: AddEditPersonalInfoConstants.ADD_PROFILE_INFORMATION_FORM, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(AddEditPersonalInformationForm);
