import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoTileComponent from '../views';
import { getProfileInfoTileData } from '../../../../User/container/User.selectors';
import ProfileInfoTileSkelton from '../skelton/ProfileInfoTileSkelton.view';

const ProfileInfoTile = ({ labels, handleComponentChange, profileInfo, isFetching }) => {
  return !isFetching ? (
    <ProfileInfoTileComponent
      profileInfo={profileInfo}
      labels={labels}
      handleComponentChange={handleComponentChange}
    />
  ) : (
    <ProfileInfoTileSkelton />
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool,
};

ProfileInfoTile.defaultProps = {
  labels: {},
  isFetching: false,
};

export const mapStateToProps = state => ({
  profileInfo: getProfileInfoTileData(state),
});

export { ProfileInfoTile as ProfileInfoTileVanilla };

export default connect(
  mapStateToProps,
  null
)(ProfileInfoTile);
