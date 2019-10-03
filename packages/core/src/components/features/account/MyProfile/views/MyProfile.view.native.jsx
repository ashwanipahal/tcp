import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import ProfileInformation from '../organism/ProfileInformation';

export const MyProfile = ({ labels, handleComponentChange, componentProps, ...otherProps }) => {
  return (
    <View>
      <StyledHeading>{getLabelValue(labels, 'lbl_profile_heading')}</StyledHeading>
      <LineComp marginBottom={28} borderWidth={1} borderColor="black" />
      <ProfileInformation
        labels={labels}
        handleComponentChange={handleComponentChange}
        componentProps={componentProps}
        {...otherProps}
      />
    </View>
  );
};

MyProfile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
};

MyProfile.defaultProps = {
  labels: {
    lbl_profile_heading: '',
  },
  handleComponentChange: () => {},
  componentProps: {},
};

export default MyProfile;
