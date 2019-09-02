import React from 'react';
import { shallow } from 'enzyme';
import { AddEditCreditCard } from '../../../../../AddEditCreditCard/container/AddEditCreditCard.container';
import AddEditCreditCardView from '../../../../../AddEditCreditCard/views/AddEditCreditCard.view';

describe('MailingAddressContainer', () => {
  it('should render Mailing Address form', () => {
    const props = {
      addressList: [
        {
          addressId: '12345',
          primary: 'true',
        },
      ],
      mailingAddress: true,
      labels: {},
      initialValues: {},
      onFileAddressKey: '',
      addressFormLabels: {},
    };
    const tree = shallow(
      <AddEditCreditCard
        submitAddressFormAction={jest.fn()}
        verifyAddressAction={jest.fn()}
        backToAddressBookClick={jest.fn()}
        {...props}
      />
    );
    expect(tree.is(AddEditCreditCardView)).toBeTruthy();
  });
});
