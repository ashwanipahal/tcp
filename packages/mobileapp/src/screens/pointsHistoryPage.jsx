import React from 'react';
import PointsHistoryPageContainer from '@tcp/core/src/components/features/account/PointHistory/container/PointsHistoryPage.container';

const pointsHistoryPage = props => {
  return (
    <React.Fragment>
      <PointsHistoryPageContainer {...props} />
    </React.Fragment>
  );
};

export default pointsHistoryPage;
