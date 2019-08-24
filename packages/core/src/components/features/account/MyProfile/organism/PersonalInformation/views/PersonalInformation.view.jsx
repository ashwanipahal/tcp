import React from 'react';
import PropTypes from 'prop-types';
import PersonalInformationDisplay from '../../../molecules/PersonalInformationDisplay';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../../ProfileInformation/styles/ProfileInformation.style';
import Address from '../../../../../../common/molecules/Address';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const PersonalInformation = ({
  labels,
  ProfileInfoTile,
  UserEmail,
  userBirthday,
  UserFullName,
  UserPhoneNumber,
  airMiles,
  MyPlaceNumber,
}) => {
  const { address } = ProfileInfoTile;
  return (
    <>
      <MyProfileTile
        title={labels.lbl_profile_personal_information}
        ctaTitle={labels.lbl_profile_edit_personal_info}
        dataLocator="pi-editpersonalinfo"
      >
        <PersonalInformationDisplay
          labels={labels}
          UserEmail={UserEmail}
          userBirthday={userBirthday}
          UserFullName={UserFullName}
          UserPhoneNumber={UserPhoneNumber}
          airMiles={airMiles}
          MyPlaceNumber={MyPlaceNumber}
        />
      </MyProfileTile>
      {address && address.isComplete && (
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className="profileInformationCol"
          >
            <MyProfileTile
              title={labels.lbl_profile_mailing_address}
              ctaTitle={labels.lbl_profile_edit_mailing_info}
              dataLocator="profileinfo-editmailingaddress"
            >
              <Address
                address={address}
                dataLocatorPrefix="profileinfo-editmailing"
                showName={false}
              />
            </MyProfileTile>
          </Col>
        </Row>
      )}
    </>
  );
};

PersonalInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_information: PropTypes.string,
    lbl_profile_edit_personal_info: PropTypes.string,
  }),
  ProfileInfoTile: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  UserEmail: PropTypes.string,
  UserFullName: PropTypes.string,
  UserPhoneNumber: PropTypes.number,
  airMiles: PropTypes.string,
  MyPlaceNumber: PropTypes.string,
};

PersonalInformation.defaultProps = {
  labels: {
    lbl_profile_personal_information: '',
    lbl_profile_edit_personal_info: '',
  },
  ProfileInfoTile: {},
  userBirthday: '',
  UserEmail: '',
  UserFullName: '',
  UserPhoneNumber: '',
  airMiles: '',
  MyPlaceNumber: '',
};

export default withStyles(PersonalInformation, styles);
