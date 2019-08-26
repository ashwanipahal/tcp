import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import ProfileInformation from '../organism/ProfileInformation';

export const MyProfile = ({ labels, handleComponentChange }) => {
  return (
    <View>
      <StyledHeading>{labels.lbl_profile_heading}</StyledHeading>
      <LineComp marginBottom={40} borderWidth={1} borderColor="black" />
      <ProfileInformation labels={labels} handleComponentChange={handleComponentChange} />
    </View>
  );
};

MyProfile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

MyProfile.defaultProps = {
  labels: {
    lbl_profile_heading: '',
  },
  handleComponentChange: () => {},
};

export default MyProfile;
