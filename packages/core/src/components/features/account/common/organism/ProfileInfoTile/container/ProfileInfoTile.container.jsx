import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoTileComponent from '../views';
import { getProfileInfoTileData } from '../../../../User/container/User.selectors';

const ProfileInfoTile = ({ labels, handleComponentChange, profileInfo }) => {
  return (
    <ProfileInfoTileComponent
      profileInfo={profileInfo}
      labels={labels}
      handleComponentChange={handleComponentChange}
    />
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
};

ProfileInfoTile.defaultProps = {
  labels: {},
};

export const mapStateToProps = state => ({
  profileInfo: getProfileInfoTileData(state),
});

export { ProfileInfoTile as ProfileInfoTileVanilla };

export default connect(
  mapStateToProps,
  null
)(ProfileInfoTile);
