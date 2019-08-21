import React from 'react';
import PropTypes from 'prop-types';
import FPO from '../../../../../../common/atoms/FPO';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const MailingInformation = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_mailing_address}
      ctaTitle={labels.lbl_profile_edit_mailing_info}
      ctaLink="/account?id=profile&subSection=edit-mailing-address"
      ctaPath="/account/profile/edit-mailing-address"
    >
      <FPO />
    </MyProfileTile>
  );
};

MailingInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_information: PropTypes.string,
    lbl_profile_edit_personal_info: PropTypes.string,
  }),
};

MailingInformation.defaultProps = {
  labels: {
    lbl_profile_personal_information: '',
    lbl_profile_edit_personal_info: '',
  },
};

export default MailingInformation;
