import React from 'react';
import PropTypes from 'prop-types';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import CreateAccount from '@tcp/core/src/components/features/account/CreateAccount';
import PersonalInformationDisplay from '../../../molecules/PersonalInformationDisplay';
import Address from '../../../../../../common/molecules/Address';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';


class PersonalInformation extends React.PureComponent{
  constructor() {
    super();
    this.state = { isOpenBool: false };
  }

  openModal = () => {
    const { isOpenBool } = this.state;
    this.setState({
      isOpenBool: !isOpenBool,
    });
  };


  render(){
    const {
      labels,
      handleComponentChange,
      profileInfoTile,
      userEmail,
      userBirthday,
      userFullName,
      userPhoneNumber,
      airMiles,
      myPlaceNumber,
    } = this.props;

    const { address } = profileInfoTile;
    const {isOpenBool} = this.state;
    return (
      <>
        <MyProfileTile
          title={labels.lbl_profile_personal_information}
          ctaTitle={labels.lbl_profile_edit_personal_info}
          handleComponentChange={this.openModal}
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
          <MyProfileTile
            title={labels.lbl_profile_mailing_address}
            ctaTitle={labels.lbl_profile_edit_mailing_info}
            handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
          >
            <Address address={address} dataLocatorPrefix="profileinfo-editmailing" showName={false} />
          </MyProfileTile>
        )}

        <ModalNative
          isOpen={isOpenBool}
          onRequestClose={this.openModal}
          heading={labels.lbl_profile_personal_information}
        >
          <CreateAccount />
        </ModalNative>
      </>
    );
  }
}

PersonalInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_information: PropTypes.string,
    lbl_profile_edit_personal_info: PropTypes.string,
  }),
  handleComponentChange: PropTypes.func.isRequired,
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

export default PersonalInformation;
