/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import { ParentContainer } from '../../AddressBook/styles/AddressBook.style.native';
import MyPreferencesSection from '../organism/MyPreferencesSection.view';

const MyPrefrence = ({ labels }) => {
  return <MyPreferencesSection labels={labels} />;
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
};

MyPrefrence.defaultProps = {
  labels: {},
};

export default withStyles(MyPrefrence, ParentContainer);
