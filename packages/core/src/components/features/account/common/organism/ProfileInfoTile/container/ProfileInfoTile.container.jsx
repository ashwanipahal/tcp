import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoTileComponent from '../views';

const ProfileInfoTile = ({ labels, handleComponentChange }) => {
  return <ProfileInfoTileComponent labels={labels} handleComponentChange={handleComponentChange} />;
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

ProfileInfoTile.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfoTile);
