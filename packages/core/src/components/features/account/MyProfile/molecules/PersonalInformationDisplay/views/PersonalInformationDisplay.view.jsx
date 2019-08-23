import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { MONTH_DISPLAY_MAP } from '../../../myProfile.constants';
import { isCanada } from '../../../../../../../utils';

export const MyPlaceRewards = (airMiles, MyPlaceNumber, labels) => {
  return (
    <BodyCopy
      dataLocator="profileinfo-rewardsid"
      className="elem-mt-LRG"
      fontSize="fs16"
      fontFamily="secondary"
    >
      {isCanada() && airMiles && `${labels.lbl_profile_air_miles} ${airMiles}`}
      {!isCanada() &&
        MyPlaceNumber &&
        `${labels.lbl_profile_my_place_rewards_info} ${MyPlaceNumber}`}
    </BodyCopy>
  );
};

export const PersonalInformationDisplay = ({
  className,
  UserEmail,
  UserFullName,
  UserPhoneNumber,
  userBirthday,
  airMiles,
  MyPlaceNumber,
  labels,
}) => {
  const birthdayArray = userBirthday ? userBirthday && userBirthday.split('|') : '';
  const userBirthdayDisplay =
    birthdayArray && birthdayArray.length === 2
      ? `${labels.lbl_profile_edit_birthday_heading}${MONTH_DISPLAY_MAP[birthdayArray[0]]} ${
          birthdayArray[1]
        }`
      : '';
  return (
    <div className={className}>
      {UserFullName && (
        <BodyCopy fontSize="fs16" fontFamily="secondary" dataLocator="profileinfo-username">
          {UserFullName}
        </BodyCopy>
      )}
      {UserEmail && (
        <BodyCopy dataLocator="profileinfo-emailaddress" fontSize="fs16" fontFamily="secondary">
          {UserEmail}
        </BodyCopy>
      )}
      {UserPhoneNumber && (
        <BodyCopy dataLocator="profileinfo-phonenumber" fontSize="fs16" fontFamily="secondary">
          {UserPhoneNumber}
        </BodyCopy>
      )}
      <BodyCopy dataLocator="profileinfo-userbday" fontSize="fs16" fontFamily="secondary">
        {userBirthdayDisplay}
      </BodyCopy>
      {MyPlaceRewards(airMiles, MyPlaceNumber, labels)}
    </div>
  );
};

PersonalInformationDisplay.propTypes = {
  className: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  UserEmail: PropTypes.string,
  UserFullName: PropTypes.string,
  UserPhoneNumber: PropTypes.number,
  airMiles: PropTypes.string,
  MyPlaceNumber: PropTypes.string,
  labels: PropTypes.shape({
    lbl_profile_edit_birthday_heading: PropTypes.string,
    lbl_profile_my_place_rewards_info: PropTypes.string,
    lbl_profile_air_miles: PropTypes.string,
  }),
};

PersonalInformationDisplay.defaultProps = {
  className: '',
  mailingAddress: {},
  userBirthday: '',
  UserEmail: '',
  UserFullName: '',
  UserPhoneNumber: '',
  airMiles: '',
  MyPlaceNumber: '',
  labels: {
    lbl_profile_edit_birthday_heading: '',
    lbl_profile_my_place_rewards_info: '',
    lbl_profile_air_miles: '',
  },
};

export default PersonalInformationDisplay;
