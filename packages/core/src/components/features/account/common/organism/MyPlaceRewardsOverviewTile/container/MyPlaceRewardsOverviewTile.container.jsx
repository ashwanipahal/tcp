import React from 'react';
import { connect } from 'react-redux';
import MyPlaceRewardsOverviewTileComponent from '../views';

export const MyPlaceRewardsOverviewTile = ({ ...props }) => (
  <MyPlaceRewardsOverviewTileComponent {...props} />
);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(MyPlaceRewardsOverviewTile);
