import React from 'react';
import MyAccountLayout from '../../MyAccountLayoutContainer';
import ProfileInformation from '../views/ProfileInformation.view';

const ProfileInformationContainer = () => {
  return <MyAccountLayout mainContent={ProfileInformation} />;
};

export default ProfileInformationContainer;
