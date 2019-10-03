/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import MyPreferencesSection from '../organism/MyPreferencesSection.view';

const MyPrefrence = ({ labels, handleComponentChange, componentProps }) => {
  return (
    <MyPreferencesSection
      labels={labels}
      handleComponentChange={handleComponentChange}
      componentProps={componentProps}
    />
  );
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
};

MyPrefrence.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
};

export default withStyles(MyPrefrence);
