import React from 'react';
import PropTypes from 'prop-types';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import ProfileInformation from '../organism/ProfileInformation';

const MyProfile = ({ labels }) => {
  return (
    <div>
      <FormPageHeadingComponent className="margin-none" />
      <ProfileInformation labels={labels} />
    </div>
  );
};

MyProfile.propTypes = {
  labels: PropTypes.shape({}),
};

MyProfile.defaultProps = {
  labels: {},
};

export default MyProfile;
