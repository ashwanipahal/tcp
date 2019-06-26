import React from 'react';
import MyAccountLayout from '../views/MyAccountLayout.view';
import navData from '../MyAccountNavData';

const MyAccountLayoutContainer = ({ mainContent, submitAddAddress }) => {
  return (
    <MyAccountLayout
      mainContent={mainContent}
      navData={navData}
      submitAddAddress={submitAddAddress}
    />
  );
};

export default MyAccountLayoutContainer;
