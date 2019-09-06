import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import AboutYouInformationForm from '../molecules/AboutYouInformationForm';

export const AboutYouInformation = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  initialValues,
  onClose,
}) => {
  return (
    <View>
      <AboutYouInformationForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </View>
  );
};

AboutYouInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_back: PropTypes.string,
    lbl_profile_heading: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};

AboutYouInformation.defaultProps = {
  labels: {
    lbl_profile_personal_info_back: '',
    lbl_profile_heading: '',
  },
  initialValues: {},
};

export default AboutYouInformation;
