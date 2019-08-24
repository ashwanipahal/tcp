import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ProfileInformation from '../organism/ProfileInformation';
import {
  StyledHeading,
  UnderlineStyle
} from '../../common/styles/styles.native';

const MyProfile = ({ labels }) => {
  return (
    <View>
      <StyledHeading>{labels.lbl_profile_heading}</StyledHeading>
      <UnderlineStyle />
      <ProfileInformation labels={labels} />
    </View>
  );
};

MyProfile.propTypes = {
  labels: PropTypes.shape({}),
};

MyProfile.defaultProps = {
  labels: {},
};

export default MyProfile;
