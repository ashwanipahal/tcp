import React from 'react';
import PropTypes from 'prop-types';
import FPO from '@tcp/core/src/components/common/atoms/FPO';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const PersonalInformation = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_personal_information}
      ctaTitle={labels.lbl_profile_edit_personal_info}
    >
      <FPO />
    </MyProfileTile>
  );
};

PersonalInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_information: PropTypes.string,
    lbl_profile_edit_personal_info: PropTypes.string,
  }),
};

PersonalInformation.defaultProps = {
  labels: {
    lbl_profile_personal_information: '',
    lbl_profile_edit_personal_info: '',
  },
};

export default PersonalInformation;
