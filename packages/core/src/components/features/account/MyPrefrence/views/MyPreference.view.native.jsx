/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import MyPreferencesSection from '../organism/MyPreferencesSection.view';

const MyPrefrence = ({ labels, handleComponentChange, activeComponent }) => {
  return (
    <MyPreferencesSection
      labels={labels}
      handleComponentChange={handleComponentChange}
      activeComponent={activeComponent}
    />
  );
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  activeComponent: PropTypes.string,
};

MyPrefrence.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  activeComponent: '',
};

export default withStyles(MyPrefrence);
