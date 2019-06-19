// @flow
import React from 'react';
import MyAccountLayout from '../views/MyAccountLayout.view';
import navData from '../MyAccountNavData';

type Props = {
  mainContent: Function,
};

const MyAccountLayoutContainer = ({ mainContent }: Props) => {
  return <MyAccountLayout mainContent={mainContent} navData={navData} />;
};

export default MyAccountLayoutContainer;
