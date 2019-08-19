import React from 'react';
import PropTypes from 'prop-types';
import FPO from '../../../../../../common/atoms/FPO';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const BirthdaySaving = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_birthday_savings}
      ctaTitle={labels.lbl_profile_add_birthday_info}
    >
      <FPO />
    </MyProfileTile>
  );
};

BirthdaySaving.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_savings: PropTypes.string,
    lbl_profile_add_birthday_info: PropTypes.string,
  }),
};

BirthdaySaving.defaultProps = {
  labels: {
    lbl_profile_birthday_savings: '',
    lbl_profile_add_birthday_info: '',
  },
};

export default BirthdaySaving;
