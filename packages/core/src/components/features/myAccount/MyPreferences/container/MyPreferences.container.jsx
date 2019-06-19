import React from 'react';
import MyAccountLayout from '../../MyAccountLayoutContainer';
import MyPreferences from '../views/MyPreferences.view';

const MyPreferencesContainer = () => {
  return <MyAccountLayout mainContent={MyPreferences} />;
};

export default MyPreferencesContainer;
