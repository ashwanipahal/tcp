import React from 'react';
import { shallow } from 'enzyme';
import ProfileInfoTile from '../ProfileInfoTile.view';

describe('ProfileInfoTile component', () => {
  it('should render correctly', () => {
    const labels = {
      lbl_overview_profileInformationHeading: '',
      lbl_overview_profileInfoEditCTA: '',
      lbl_overview_profileInfoMember: '',
      lbl_overview_profileInfoEmailAddress: '',
      lbl_overview_profileInfoMailingAddress: '',
      lbl_overview_profileInfoPassword: '',
      lbl_overview_profileInfoChangeCTA: '',
      lbl_overview_profileInfoViewCTA: '',
    };
    const handleComponentChange = () => {};
    const profileInfo = {
      firstName: 'First',
      lastName: 'Last',
      emailAddress: 'first.last@tcp.com',
      rewardsAccountNumber: 'B100000012222',
      address: {
        addressLine1: 'addressLine1',
        addressLine2: 'addressLine2',
        city: 'Manhattan',
        state: 'NY',
        zipCode: '12345',
      },
    };
    const component = shallow(
      <ProfileInfoTile
        labels={labels}
        handleComponentChange={handleComponentChange}
        profileInfo={profileInfo}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
