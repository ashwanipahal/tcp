import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';

export const BirthdaySaving = ({ labels, handleComponentChange }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_birthday_savings}
      ctaTitle={labels.lbl_profile_add_birthday_info}
      dataLocator="pi-addbirthdayinfo"
      handleComponentChange={handleComponentChange}
    >
      <BodyCopyWithSpacing fontSize="fs14" text={labels.lbl_profile_birthday_saving_info} />
    </MyProfileTile>
  );
};

BirthdaySaving.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_savings: PropTypes.string,
    lbl_profile_add_birthday_info: PropTypes.string,
    lbl_profile_birthday_saving_info: PropTypes.string,
  }),
  handleComponentChange: PropTypes.func.isRequired,
};

BirthdaySaving.defaultProps = {
  labels: {
    lbl_profile_birthday_savings: '',
    lbl_profile_add_birthday_info: '',
    lbl_profile_birthday_saving_info: '',
  },
};

export default BirthdaySaving;
