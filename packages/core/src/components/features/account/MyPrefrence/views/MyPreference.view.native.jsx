/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import MyPreferencesSection from '../organism/MyPreferencesSection.view';

const MyPrefrence = ({ labels, handleComponentChange }) => {
  return <MyPreferencesSection labels={labels} handleComponentChange={handleComponentChange} />;
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

MyPrefrence.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

export default withStyles(MyPrefrence);
