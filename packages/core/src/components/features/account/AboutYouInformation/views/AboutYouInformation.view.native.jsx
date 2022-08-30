import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import AboutYouInformationForm from '../molecules/AboutYouInformationForm';

export const AboutYouInformation = ({ onSubmit, initialValues, onClose, ...otherProps }) => {
  return (
    <View>
      <AboutYouInformationForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
        {...otherProps}
      />
    </View>
  );
};

AboutYouInformation.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};

AboutYouInformation.defaultProps = {
  initialValues: {},
};

export default AboutYouInformation;
