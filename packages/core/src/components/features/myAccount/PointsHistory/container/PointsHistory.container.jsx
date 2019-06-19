import React from 'react';
import MyAccountLayout from '../../MyAccountLayoutContainer';
import PointsHistory from '../views/PointsHistory.view';

const PointsHistoryContainer = () => {
  return <MyAccountLayout mainContent={PointsHistory} />;
};

export default PointsHistoryContainer;
