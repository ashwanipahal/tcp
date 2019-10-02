import React from 'react';
import { shallow } from 'enzyme';
import ContactInformationFormWrapper from '../ContactInformationFormWrapper';

describe('ContactInformationFormWrapper component', () => {
  const props = {
    dispatch: jest.fn(),
    labels: {
      lbl_PLCCForm_contactInfoHeader: 'contact information',
      lbl_PLCCForm_firstName: 'First Name',
      lbl_PLCCForm_middleNameInitial: 'M.I.',
      lbl_PLCCForm_lastName: 'Last Name',
      lbl_PLCCForm_addressLine1: 'Address Line 1',
      lbl_PLCCForm_addressLine2: 'Address Line 2',
      lbl_PLCCForm_city: 'city',
      lbl_PLCCForm_state: 'state',
      lbl_PLCCForm_statePlaceholder: 'state select',
      lbl_PLCCForm_zipCode: 'zipcode',
      lbl_PLCCForm_mobilePhoneNumber: 'mobile phone',
      lbl_PLCCForm_email: 'email',
      lbl_PLCCForm_alternatePhone: 'alternate phone',
      lbl_PLCCForm_minPhone: 'min phone',
    },
  };

  it('should renders correctly', () => {
    const component = shallow(<ContactInformationFormWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call handlePlaceSelected', async () => {
    const component = shallow(<ContactInformationFormWrapper {...props} />);
    component.instance().handlePlaceSelected('', '');
  });
});
