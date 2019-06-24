// @flow
import React from 'react';
import MyAccountLayout from '../views/MyAccountLayout.view';
import navData from '../MyAccountNavData';

type Props = {
  props: Object,
};

const MyAccountLayoutContainer = ({ ...props }: Props) => {
  return <MyAccountLayout {...props} navData={navData} />;
};

export default MyAccountLayoutContainer;
