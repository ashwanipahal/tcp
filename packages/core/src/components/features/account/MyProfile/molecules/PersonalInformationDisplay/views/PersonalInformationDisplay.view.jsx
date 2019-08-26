import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { COMPLETE_MONTH } from '../../../../../../../utils/parseDate';
import { isCanada } from '../../../../../../../utils';

const getMyPlaceRewards = (airMiles, myPlaceNumber, labels) => {
  return (
    <BodyCopy
      dataLocator="profileinfo-rewardsid"
      className="elem-mt-LRG"
      fontSize="fs16"
      fontFamily="secondary"
    >
      {isCanada() && airMiles && `${labels.lbl_profile_air_miles} ${airMiles}`}
      {!isCanada() &&
        myPlaceNumber &&
        `${labels.lbl_profile_my_place_rewards_info} ${myPlaceNumber}`}
    </BodyCopy>
  );
};

export const PersonalInformationDisplay = ({
  className,
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
    <div className={className}>
      {userFullName && (
        <BodyCopy fontSize="fs16" fontFamily="secondary" dataLocator="profileinfo-username">
          {userFullName}
        </BodyCopy>
      )}
      {userEmail && (
        <BodyCopy dataLocator="profileinfo-emailaddress" fontSize="fs16" fontFamily="secondary">
          {userEmail}
        </BodyCopy>
      )}
      {userPhoneNumber && (
        <BodyCopy dataLocator="profileinfo-phonenumber" fontSize="fs16" fontFamily="secondary">
          {userPhoneNumber}
        </BodyCopy>
      )}
      <BodyCopy dataLocator="profileinfo-userbday" fontSize="fs16" fontFamily="secondary">
        {userBirthdayDisplay}
      </BodyCopy>
      {getMyPlaceRewards(airMiles, myPlaceNumber, labels)}
    </div>
  );
};

PersonalInformationDisplay.propTypes = {
  className: PropTypes.string,
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
  className: '',
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
