import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import AddEditPersonalInformationForm from '../molecules/AddEditPersonalInformationForm';

export const AddEditPersonalInformation = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  onCancel,
  birthMonthOptionsMap,
  birthYearOptionsMap,
  initialValues,
  isEmployee,
  formErrorMessage,
}) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <AddEditPersonalInformationForm
          labels={labels}
          successMessage={successMessage}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
          onCancel={onCancel}
          birthMonthOptionsMap={birthMonthOptionsMap}
          birthYearOptionsMap={birthYearOptionsMap}
          initialValues={initialValues}
          isEmployee={isEmployee}
          formErrorMessage={formErrorMessage}
        />
      </ScrollView>
    </View>
  );
};

AddEditPersonalInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_back: PropTypes.string,
    lbl_profile_heading: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  birthMonthOptionsMap: PropTypes.shape([]).isRequired,
  birthYearOptionsMap: PropTypes.shape([]).isRequired,
  initialValues: PropTypes.shape({}),
  isEmployee: PropTypes.string.isRequired,
  formErrorMessage: PropTypes.shape({}).isRequired,
};

AddEditPersonalInformation.defaultProps = {
  labels: {
    lbl_profile_personal_info_back: '',
    lbl_profile_heading: '',
  },
  initialValues: {},
};
export default AddEditPersonalInformation;
