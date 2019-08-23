import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/PersonalInformationDisplay.style';
import { MONTH_DISPLAY_MAP } from '../../../myProfile.constants';
import { isCanada } from '../../../../../../../utils';


export const MyPlaceRewards = (airMiles, MyPlaceNumber) =>{
  return (
    <BodyCopy
      className="elem-mt-LRG"
      fontSize="fs16"
      fontFamily="secondary"
    >
      {isCanada()  && airMiles && (
        `Air Miles #: ${airMiles}`
      )}
      {!isCanada() && MyPlaceNumber && (
          `My Place Rewards #: ${MyPlaceNumber}`
      )}
    </BodyCopy>
  )}

export const PersonalInformationDisplay = ({
  className,
  UserEmail,
  UserFullName,
  UserPhoneNumber,
  userBirthday,
  airMiles,
  MyPlaceNumber,
}) => {
  const birthdayArray = userBirthday ? userBirthday && userBirthday.split('|'):'';
  const userBirthdayDisplay = birthdayArray && birthdayArray.length === 2 ? `Birthday: ${MONTH_DISPLAY_MAP[birthdayArray[0]]} ${birthdayArray[1]}` : '';
  return (
    <div className={className}>
      {UserFullName && (
      <BodyCopy
        fontSize="fs16"
        fontFamily="secondary"
      >
        {UserFullName}
      </BodyCopy>
      )}
      {UserEmail && (
      <BodyCopy
        fontSize="fs16"
        fontFamily="secondary"
      >
        {UserEmail}
      </BodyCopy>
      )}
      {UserPhoneNumber && (
      <BodyCopy
        fontSize="fs16"
        fontFamily="secondary"
      >
        {UserPhoneNumber}
      </BodyCopy>
      )}
      <BodyCopy
        fontSize="fs16"
        fontFamily="secondary"
      >
        {userBirthdayDisplay}
      </BodyCopy>
      {MyPlaceRewards(airMiles,MyPlaceNumber)}
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
};

export default withStyles(PersonalInformationDisplay, styles);
