import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { COMPLETE_MONTH } from '../../../../../../../utils/parseDate';
import { isCanada } from '../../../../../../../utils';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';

const getMyPlaceRewards = (airMiles, myPlaceNumber, labels) => {
  let myPlaceRewardsText = '';
  const isCA = isCanada();
  if (isCA && airMiles) {
    myPlaceRewardsText = `${labels.lbl_profile_air_miles} ${airMiles}`;
  }
  if (!isCA && myPlaceNumber) {
    myPlaceRewardsText = `${labels.lbl_profile_my_place_rewards_info} ${myPlaceNumber}`;
  }
  if (myPlaceRewardsText) {
    return (
      <BodyCopyWithSpacing className="margin-top-LRG" fontSize="fs16" text={myPlaceRewardsText} />
    );
  }
  return null;
};

export const PersonalInformationDisplay = ({
  userEmail,
  userFullName,
  userPhoneNumber,
  userBirthday,
  airMiles,
  myPlaceNumber,
  labels,
}) => {
  const birthdayArray = userBirthday ? userBirthday.split('|') : [];
  const userBirthdayDisplay =
    birthdayArray && birthdayArray.length === 2
      ? `${labels.lbl_profile_edit_birthday_heading} ${COMPLETE_MONTH[birthdayArray[0] - 1]} ${
          birthdayArray[1]
        }`
      : '';
  return (
    <View>
      {userFullName && <BodyCopy fontSize="fs16" text={userFullName} />}
      {userEmail && <BodyCopy fontSize="fs16" text={userEmail} />}
      {userPhoneNumber && <BodyCopy fontSize="fs16" text={userPhoneNumber} />}
      <BodyCopy fontSize="fs16" text={userBirthdayDisplay} />
      {getMyPlaceRewards(airMiles, myPlaceNumber, labels)}
    </View>
  );
};

PersonalInformationDisplay.propTypes = {
  mailingAddress: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userEmail: PropTypes.string,
  userFullName: PropTypes.string,
  userPhoneNumber: PropTypes.number,
  airMiles: PropTypes.string,
  myPlaceNumber: PropTypes.string,
  labels: PropTypes.shape({
    lbl_profile_edit_birthday_heading: PropTypes.string,
    lbl_profile_my_place_rewards_info: PropTypes.string,
    lbl_profile_air_miles: PropTypes.string,
  }),
};

PersonalInformationDisplay.defaultProps = {
  mailingAddress: {},
  userBirthday: '',
  userEmail: '',
  userFullName: '',
  userPhoneNumber: '',
  airMiles: '',
  myPlaceNumber: '',
  labels: {
    lbl_profile_edit_birthday_heading: '',
    lbl_profile_my_place_rewards_info: '',
    lbl_profile_air_miles: '',
  },
};

export default PersonalInformationDisplay;
