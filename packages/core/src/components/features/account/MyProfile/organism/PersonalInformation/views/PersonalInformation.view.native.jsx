import React from 'react';
import PropTypes from 'prop-types';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import AddEditPersonalInformation from '@tcp/core/src/components/features/account/AddEditPersonalInformation';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PersonalInformationDisplay from '../../../molecules/PersonalInformationDisplay';
import Address from '../../../../../../common/molecules/Address';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

export class PersonalInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    const { componentProps } = this.props;
    if (componentProps.activeComponent === 'userBirthday') {
      this.state = { isOpenBool: true };
    } else {
      this.state = { isOpenBool: false };
    }
  }

  toggleModal = () => {
    const { isOpenBool } = this.state;
    this.setState({
      isOpenBool: !isOpenBool,
    });
  };

  render() {
    const {
      labels,
      toggleModalState,
      profileInfoTile,
      userEmail,
      userBirthday,
      userFullName,
      userPhoneNumber,
      airMiles,
      myPlaceNumber,
    } = this.props;

    const { address } = profileInfoTile;
    const { isOpenBool } = this.state;
    return (
      <>
        <MyProfileTile
          title={getLabelValue(labels, 'lbl_profile_personal_information')}
          ctaTitle={getLabelValue(labels, 'lbl_profile_edit_personal_info')}
          handleComponentChange={this.toggleModal}
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
            title={getLabelValue(labels, 'lbl_profile_mailing_address')}
            ctaTitle={getLabelValue(labels, 'lbl_profile_edit_mailing_info')}
            handleComponentChange={() => toggleModalState('mountMailingAddressModal')}
          >
            <Address
              address={address}
              dataLocatorPrefix="profileinfo-editmailing"
              showName={false}
            />
          </MyProfileTile>
        )}

        <ModalNative
          isOpen={isOpenBool}
          onRequestClose={this.toggleModal}
          heading={getLabelValue(labels, 'lbl_profile_heading')}
        >
          <AddEditPersonalInformation onRequestClose={this.toggleModal} />
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
  profileInfoTile: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userEmail: PropTypes.string,
  userFullName: PropTypes.string,
  userPhoneNumber: PropTypes.number,
  airMiles: PropTypes.string,
  myPlaceNumber: PropTypes.string,
  toggleModalState: PropTypes.func.isRequired,
  componentProps: PropTypes.shape({}),
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
  componentProps: {},
};

export default PersonalInformation;
