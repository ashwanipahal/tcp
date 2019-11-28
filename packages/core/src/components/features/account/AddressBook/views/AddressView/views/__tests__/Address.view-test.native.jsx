import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { AddressView } from '../Address.view.native';

describe('AddressView', () => {
  it('should render correctly', () => {
    const props = {
      addresses: fromJS([{ addressId: '12345' }]),
    };
    const tree = shallow(<AddressView {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly without any address', () => {
    const props = {
      addresses: fromJS([]),
      labels: {
        addressBook: {
          ACC_LBL_ADDRESS_BOOK_HEADING: 'address book',
          ACC_LBL_ADD_NEW_ADDRESS_CTA: 'add new address',
        },
      },
    };
    const tree = shallow(<AddressView {...props} />);
    expect(tree).toMatchSnapshot();
  });

  describe('#instances', () => {
    let wrapper;
    let wrapperInstance;
    beforeEach(() => {
      const props = {
        addresses: fromJS([{ addressId: '12345' }]),
      };
      wrapper = shallow(<AddressView {...props} />);
      wrapperInstance = wrapper.instance();
    });

    it('toggleAddAddressModal should set addAddressMount state to true', () => {
      wrapperInstance.toggleAddAddressModal();
      expect(wrapper.state('addAddressMount')).toBeTruthy();
    });

    it('toggleAddressModal should set currentForm to addressVerification', () => {
      wrapperInstance.toggleAddressModal();
      expect(wrapper.state('currentForm')).toBe('VerificationModal');
    });
  });
});
