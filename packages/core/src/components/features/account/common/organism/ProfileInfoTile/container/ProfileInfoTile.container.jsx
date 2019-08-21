import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileInfoTileComponent from '../views';
import { getUserContactInfo, getMailingAddress } from '../../../../User/container/User.selectors';

const ProfileInfoTile = ({
  labels,
  handleComponentChange,
  personalInformation,
  mailingAddress,
}) => {
  return (
    <ProfileInfoTileComponent
      personalInformation={personalInformation}
      mailingAddress={mailingAddress}
      labels={labels}
      handleComponentChange={handleComponentChange}
    />
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  personalInformation: PropTypes.shape({}),
  mailingAddress: PropTypes.shape({}),
};

ProfileInfoTile.defaultProps = {
  labels: {},
  personalInformation: {},
  mailingAddress: {},
  handleComponentChange: () => {},
};

const mapStateToProps = state => ({
  personalInformation: getUserContactInfo(state),
  mailingAddress: getMailingAddress(state),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfoTile);
