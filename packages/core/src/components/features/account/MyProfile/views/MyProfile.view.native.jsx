import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  StyledHeading,
  StyledUnderline,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import ProfileInformation from '../organism/ProfileInformation';

export const MyProfile = ({ labels, handleComponentChange }) => {
  return (
    <View>
      <StyledHeading>{labels.lbl_profile_heading}</StyledHeading>
      <StyledUnderline />
      <ProfileInformation labels={labels} handleComponentChange={handleComponentChange} />
    </View>
  );
};

MyProfile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

MyProfile.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

export default MyProfile;
