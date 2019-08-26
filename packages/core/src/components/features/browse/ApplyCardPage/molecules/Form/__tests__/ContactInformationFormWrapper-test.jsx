import React from 'react';
import { shallow } from 'enzyme';
import ContactInformationFormWrapper from '../ContactInformationFormWrapper';

describe('ContactInformationFormWrapper component', () => {
  const props = {
    dispatch: jest.fn(),
    labels: {
      plcc_form_contact_info_header: 'contact information',
      plcc_form_firstName: 'First Name',
      plcc_form_middleNameinitial: 'M.I.',
      plcc_form_lastName: 'Last Name',
      plcc_form_addressLine1: 'Address Line 1',
      plcc_form_addressLine2: 'Address Line 2',
      plcc_form_city: 'city',
      plcc_form_zipcode: 'zipcode',
      plcc_form_mobile_phone_number: 'mobile phone',
      plcc_form_email: 'email',
      plcc_form_alternate_phone: 'alternate phone',
      plcc_form_min_phone: 'min phone',
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
