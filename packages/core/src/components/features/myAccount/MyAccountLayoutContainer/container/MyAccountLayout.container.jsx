import React from 'react';
import MyAccountLayout from '../views/MyAccountLayout.view';
import navData from '../MyAccountNavData';

const MyAccountLayoutContainer = ({ mainContent }) => {
  return <MyAccountLayout mainContent={mainContent} navData={navData} />;
};

export default MyAccountLayoutContainer;
