import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../views/DeleteModal.native';

describe('DeleteModal Component', () => {
  it('should render correctly', () => {
    const props = {
      dto: {
        cardDescription: 'Are you sure you want to delete this Credit/Debit Card?',
        cardImage: 4,
        cardDetail: 'Card ending in ',
        accountNo: '************1111',
        cardExpiry: 'Expires on 1/2020',
      },
      labels: {
        paymentGC: {
          lbl_payment_modalDeleteCard: 'DELETE CARD',
          lbl_payment_modalGCCancel: "No, Don't Delete",
          lbl_payment_modalGCCardEnd: 'Card ending in ',
          lbl_payment_modalGCConfirm: 'Yes, Delete',
          lbl_payment_gcExpire: ' Expires on ',
          lbl_payment_remainingBalance: 'Remaining balance',
        },
      },
      setDeleteModalMountedState: true,
      addressDetails: {
        addressLine1: '70 Sherman Ave Unit 3',
        addressLine2: '',
        city: 'Jersey City',
        country: 'US',
        firstName: 'Gagandeep',
        lastName: 'Bhardwaj',
        phone1: '4704954115',
        state: 'NJ',
        zipCode: '07307',
      },
      style: [{}],
    };
    const tree = shallow(<DeleteModal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
