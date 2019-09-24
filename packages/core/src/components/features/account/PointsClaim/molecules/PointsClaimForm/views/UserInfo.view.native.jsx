import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { UserInfoRow, UserInfoLabels, UserInfoValues } from '../styles/UserInfo.native.style';
import { BodyCopy } from '../../../../../../common/atoms';

export const UserInfo = ({ labels, myPlaceNumber, userInfoData }) => {
  return (
    <>
      <UserInfoRow>
        <UserInfoLabels>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_points_claim_account_number', 'myPlaceRewards')}
            fontFamily="secondary"
            fontSize="fs16"
            color="gray.900"
            fontWeight="extrabold"
          />
        </UserInfoLabels>
        <UserInfoValues>
          <BodyCopy
            text={myPlaceNumber}
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            color="gray.900"
          />
        </UserInfoValues>
      </UserInfoRow>
      <UserInfoRow>
        <UserInfoLabels>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_points_claim_firstname', 'myPlaceRewards')}
            fontFamily="secondary"
            fontSize="fs16"
            color="gray.900"
            fontWeight="extrabold"
          />
        </UserInfoLabels>
        <UserInfoValues>
          <BodyCopy
            text={userInfoData.firstName}
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            color="gray.900"
          />
        </UserInfoValues>
      </UserInfoRow>
      <UserInfoRow>
        <UserInfoLabels>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_points_claim_lastname', 'myPlaceRewards')}
            fontFamily="secondary"
            fontSize="fs16"
            color="gray.900"
            fontWeight="extrabold"
          />
        </UserInfoLabels>
        <UserInfoValues>
          <BodyCopy
            text={userInfoData.lastName}
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            color="gray.900"
          />
        </UserInfoValues>
      </UserInfoRow>
      <UserInfoRow>
        <UserInfoLabels>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_points_claim_email', 'myPlaceRewards')}
            fontFamily="secondary"
            fontSize="fs16"
            color="gray.900"
            fontWeight="extrabold"
          />
        </UserInfoLabels>
        <UserInfoValues>
          <BodyCopy
            text={userInfoData.emailAddress}
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            color="gray.900"
          />
        </UserInfoValues>
      </UserInfoRow>
    </>
  );
};

UserInfo.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  myPlaceNumber: PropTypes.string,
  userInfoData: PropTypes.shape({}),
};

UserInfo.defaultProps = {
  myPlaceNumber: '',
  userInfoData: {},
};

export default UserInfo;
