import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyProfile from '../views/MyProfile.view';

const getMyProfileInfoLabels = labels => {
  return (labels && labels.profile) || {};
};

export const MyProfileContainer = ({ labels, ...otherProps }) => {
  const profileInfoLabels = getMyProfileInfoLabels(labels);
  return <MyProfile labels={profileInfoLabels} {...otherProps} />;
};

MyProfileContainer.propTypes = {
  labels: PropTypes.shape({}),
};

MyProfileContainer.defaultProps = {
  labels: {},
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(MyProfileContainer);
