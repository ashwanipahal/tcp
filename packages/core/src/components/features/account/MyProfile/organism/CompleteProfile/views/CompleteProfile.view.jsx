import React from 'react';
import PropTypes from 'prop-types';
import FPO from '../../../../../../common/atoms/FPO';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const CompleteProfile = ({ labels }) => {
  return (
    <MyProfileTile title={labels.lbl_profile_Enhance_Experience}>
      <FPO />
    </MyProfileTile>
  );
};

CompleteProfile.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_Enhance_Experience: PropTypes.string,
  }),
};

CompleteProfile.defaultProps = {
  labels: {
    lbl_profile_Enhance_Experience: '',
  },
};

export default CompleteProfile;
