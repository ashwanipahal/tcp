import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import BirthdaySavingsList from '../../../../common/organism/BirthdaySavingsList';
import { getLabelValue } from '../../../../../../../utils';

const BirthdaySaving = ({ labels, handleComponentChange, childrenBirthdays }) => {
  const ctaTitle = getLabelValue(
    labels,
    childrenBirthdays && childrenBirthdays.size > 0
      ? 'lbl_profile_edit_birthday_info'
      : 'lbl_profile_add_birthday_info'
  );

  return (
    <MyProfileTile
      title={labels.lbl_profile_birthday_savings}
      ctaTitle={ctaTitle}
      dataLocator="pi-addbirthdayinfo"
      handleComponentChange={handleComponentChange}
      birthdaySaving
    >
      <BirthdaySavingsList view="read" labels={labels} />
    </MyProfileTile>
  );
};

BirthdaySaving.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_savings: PropTypes.string,
    lbl_profile_add_birthday_info: PropTypes.string,
    lbl_profile_birthday_saving_info: PropTypes.string,
  }),
  childrenBirthdays: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
};

BirthdaySaving.defaultProps = {
  labels: {
    lbl_profile_birthday_savings: '',
    lbl_profile_add_birthday_info: '',
    lbl_profile_birthday_saving_info: '',
  },
  childrenBirthdays: fromJS([]),
};

export default BirthdaySaving;
