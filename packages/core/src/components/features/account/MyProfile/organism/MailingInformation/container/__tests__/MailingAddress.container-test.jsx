import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddEditCreditCard } from '../../../../../AddEditCreditCard/container/AddEditCreditCard.container';
import AddEditCreditCardView from '../../../../../AddEditCreditCard/views/AddEditCreditCard.view';
import { MailingInformationContainer, mapDispatchToProps } from '../MailingInformation.container';

const address = {
  address: {
    addressLine1: 'test',
    addressLine2: '',
    addressLine: [],
    city: 'New York',
    country: 'US',
    firstName: 'Test',
    isComplete: true,
    lastName: 'Test',
    state: 'NY',
    zipCode: '10001',
  },
};

const formPayload = {
  address: {
    addressLine1: 'test',
    addressLine2: '',
    addressLine: [],
    city: 'New York',
    country: 'US',
    firstName: 'test',
    isComplete: true,
    lastName: 'kumar',
    state: 'NY',
    zipCode: '10001',
  },
  address1: 'test',
  address2: ' ',
  city: 'New York',
  country: 'US',
  firstName: 'test',
  isCommercialAddress: true,
  isComplete: true,
  lastName: 'kumar',
  nickName: 'TEST11@GMAIL.COM',
  phoneNumber: '7448946033',
  primary: 'false',
  state: 'NY',
  zip: '10001',
};
const labels = {
  addressFormLabels: {},
  profile: {},
};

const props = {
  addressList: [
    {
      addressId: '12345',
      primary: 'true',
      addressLine1: '500 West 33rd Street',
      addressLine2: '',
      addressLine: [],
    },
  ],
  address: {
    emailAddress: 'TEST11@GMAIL.COM',
    firstName: 'vinit',
    lastName: 'kumar',
    phoneNumber: '7448946033',
  },
  mailingAddress: true,
  initialValues: {},
  onFileAddressKey: '',
  addressFormLabels: {},
  showCreditCardFields: false,
  showUserName: false,
  labels: {
    profile: {},
  },
};

describe('MailingAddressContainer', () => {
  it('should render Mailing Address form', () => {
    const tree = shallow(
      <AddEditCreditCard
        submitAddressFormAction={jest.fn()}
        verifyAddressAction={jest.fn()}
        backToAddressBookClick={jest.fn()}
        getAddressListAction={jest.fn()}
        {...props}
      />
    );
    expect(tree.is(AddEditCreditCardView)).toBeTruthy();
  });

  describe('instances', () => {
    let instance;
    let verifyAddressSpy;
    let submitNewAddressFormActionSpy;
    let getAddressListActionSpy;
    beforeEach(() => {
      verifyAddressSpy = jest.fn();
      submitNewAddressFormActionSpy = jest.fn();
      getAddressListActionSpy = jest.fn();
      const component = shallow(
        <MailingInformationContainer
          submitNewAddressFormAction={submitNewAddressFormActionSpy}
          verifyAddressAction={verifyAddressSpy}
          getAddressListAction={getAddressListActionSpy}
          addressList={List()}
          labels={labels}
          {...props}
        />
      );
      instance = component.instance();
    });
    it('#verifyAddress should call verifyAddressAction prop', () => {
      instance.verifyAddress(formPayload);
      expect(verifyAddressSpy).toBeCalled();
    });
    it('#submitAddressForm should call submitNewAddressFormAction prop in mailing address mode', () => {
      instance.submitAddressForm(address);
      expect(submitNewAddressFormActionSpy).toBeCalled();
    });
    it('#getAddressListAction should call on componentDidMount', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getAddressListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
