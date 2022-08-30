import React from 'react';
import PropTypes from 'prop-types';
import MyPref from '../organism/MyPreferencesSection.view.native';

const MyPrefrence = ({ labels, ...otherProps }) => {
  return <MyPref labels={labels} {...otherProps} />;
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
};

MyPrefrence.defaultProps = {
  labels: {},
};

export default MyPrefrence;
