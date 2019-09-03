import React from 'react';
import { shallow } from 'enzyme';
import {
  ProfileInfoTileVanilla as ProfileInfoTile,
  mapStateToProps,
} from '../ProfileInfoTile.container';
import ProfileInfoTileComponent from '../../views/ProfileInfoTile.view';
import { getProfileInfoTileData } from '../../../../../User/container/User.selectors';

jest.mock('../../../../../User/container/User.selectors', () => ({
  getProfileInfoTileData: jest.fn(),
}));

describe('ProfileInfoTile container', () => {
  it('should render ProfileInfoTile component', () => {
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
        profileInfo={profileInfo}
        handleComponentChange={handleComponentChange}
      />
    );
    expect(component.is(ProfileInfoTileComponent)).toBeTruthy();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action getAddressList which will call dispatch function on execution', () => {
    getProfileInfoTileData.mockImplementation(() => ({
      firstName: 'first',
    }));
    const props = mapStateToProps({});
    expect(props.profileInfo.firstName).toBe('first');
  });
});
