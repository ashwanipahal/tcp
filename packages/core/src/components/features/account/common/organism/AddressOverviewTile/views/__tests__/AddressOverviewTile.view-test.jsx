import React from 'react';
import { shallow } from 'enzyme';
import { AddressOverviewTile } from '../AddressOverviewTile.view';

describe('AddressOverviewTile component', () => {
  it('should render correctly', () => {
    const addresses = [
      {
        firstName: 'test',
        lastName: 'test',
        addressLine: ['addressline 1', 'addressline 2'],
        city: 'test city',
        country: 'test country',
        phone1: '1234567890',
        xcont_isDefaultBilling: 'true',
        primary: 'true',
      },
    ];
    const labels = {
      lbl_overview_addressBookHeading: 'Address Book',
      lbl_overview_addressBookCTA: 'View Address Book',
      lbl_overview_addressBookEdit: 'Edit',
      lbl_overview_addressBookAdd: 'Add',
      lbl_overview_addressNotAdded: 'You have not added an address yet.',
      lbl_overview_defaultBillingAddress: 'Default Billing Address',
      lbl_overview_defaultShipingAddress: 'Default Shiping Address',
    };
    const component = shallow(<AddressOverviewTile labels={labels} addressList={addresses} />);
    expect(component).toMatchSnapshot();
  });
});

describe('AddressOverviewTile render empty address component', () => {
  it('should render correctly', () => {
    const addresses = [
      {
        firstName: '',
        lastName: '',
        addressLine: [],
        city: '',
        country: '',
        phone1: '',
        xcont_isDefaultBilling: 'false',
        primary: 'false',
      },
    ];
    const labels = {};
    const component = shallow(<AddressOverviewTile labels={labels} addressList={addresses} />);
    expect(component).toMatchSnapshot();
  });
});

describe('AddressOverviewTile render empty address', () => {
  it('should render empty address correctly', () => {
    const addressList = null;
    const labels = {};
    const component = shallow(<AddressOverviewTile labels={labels} addressList={addressList} />);
    expect(component).toMatchSnapshot();
  });
});
