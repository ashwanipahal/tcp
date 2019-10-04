import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PersonalInformationDisplay from '../../../molecules/PersonalInformationDisplay';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../../ProfileInformation/styles/ProfileInformation.style';
import Address from '../../../../../../common/molecules/Address';
import internalEndpoints from '../../../../common/internalEndpoints';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

export const PersonalInformation = ({
  labels,
  profileInfoTile,
  userEmail,
  userBirthday,
  userFullName,
  userPhoneNumber,
  airMiles,
  myPlaceNumber,
}) => {
  const { address } = profileInfoTile;
  return (
    <>
      <MyProfileTile
        title={getLabelValue(labels, 'lbl_profile_personal_information')}
        ctaTitle={getLabelValue(labels, 'lbl_profile_edit_personal_info')}
        dataLocator="pi-editpersonalinfo"
        ctaLink={internalEndpoints.editProfileInformationPage.link}
        ctaPath={internalEndpoints.editProfileInformationPage.path}
      >
        <PersonalInformationDisplay
          labels={labels}
          userEmail={userEmail}
          userBirthday={userBirthday}
          userFullName={userFullName}
          userPhoneNumber={userPhoneNumber}
          airMiles={airMiles}
          myPlaceNumber={myPlaceNumber}
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
              title={getLabelValue(labels, 'lbl_profile_mailing_address')}
              ctaTitle={getLabelValue(labels, 'lbl_profile_edit_mailing_info')}
              dataLocator="profileinfo-editmailingaddress"
              ctaLink={internalEndpoints.mailingAddressPage.link}
              ctaPath={internalEndpoints.mailingAddressPage.path}
            >
              <Address
                address={address}
                dataLocatorPrefix="profileinfo-editmailing"
                showName={false}
                className="profileInformationAddress"
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
  profileInfoTile: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userEmail: PropTypes.string,
  userFullName: PropTypes.string,
  userPhoneNumber: PropTypes.number,
  airMiles: PropTypes.string,
  myPlaceNumber: PropTypes.string,
};

PersonalInformation.defaultProps = {
  labels: {
    lbl_profile_personal_information: '',
    lbl_profile_edit_personal_info: '',
  },
  profileInfoTile: {},
  userBirthday: '',
  userEmail: '',
  userFullName: '',
  userPhoneNumber: '',
  airMiles: '',
  myPlaceNumber: '',
};

export default withStyles(PersonalInformation, styles);
