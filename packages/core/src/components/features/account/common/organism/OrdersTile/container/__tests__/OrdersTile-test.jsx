import React from 'react';
import { shallow } from 'enzyme';
import {
  OrdersTileVanilla as OrdersTile,
  mapStateToProps,
} from '../OrdersTile.container';
import OrdersTileComponent from '../../views/OrdersTile.view';
import { getProfileInfoTileData } from '../../../../../User/container/User.selectors';

jest.mock('../../../../../User/container/User.selectors', () => ({
  getProfileInfoTileData: jest.fn(),
}));

describe('OrdersTile container', () => {
  it('should render OrdersTile component', () => {
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
      <OrdersTile
        labels={labels}
        profileInfo={profileInfo}
        handleComponentChange={handleComponentChange}
      />
    );
    expect(component.is(OrdersTileComponent)).toBeTruthy();
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
