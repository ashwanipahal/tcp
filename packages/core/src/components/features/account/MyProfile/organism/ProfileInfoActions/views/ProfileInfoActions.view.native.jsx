import React from 'react';
import PropTypes from 'prop-types';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

export const ProfileInfoActions = ({ labels }) => {
  return (
    <MyProfileTile>
      <BodyCopyWithSpacing
        text={labels.lbl_profile_Enhance_Experience}
        fontSize="fs16"
        fontWeight="semibold"
        spacingStyles="margin-bottom-MED"
      />
      <BodyCopyWithSpacing
        text={labels.lbl_profile_profileInCompleteMessage}
        fontSize="fs16"
        spacingStyles="margin-bottom-MED"
      />
    </MyProfileTile>
  );
};

ProfileInfoActions.propTypes = {
  labels: PropTypes.shape({}),
};

ProfileInfoActions.defaultProps = {
  labels: {
    lbl_profile_Enhance_Experience: '',
    lbl_profile_profileInCompleteMessage: '',
  },
};

export default ProfileInfoActions;
