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
  handleComponentChange: PropTypes.func,
  profileInfo: PropTypes.shape({}).isRequired,
};

ProfileInfoTile.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

const mapStateToProps = state => ({
  profileInfo: getProfileInfoTileData(state),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfoTile);
