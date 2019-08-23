import React from 'react';
import { shallow } from 'enzyme';
import { PickUpContactDisplayVanilla } from '../views/PickUpContactDisplay';

describe('PickUpContactDisplayVanilla component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      labels: {},
      className: '',
      formData: {
        pickUpContact: {
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
        },
      },
    };
    const component = shallow(<PickUpContactDisplayVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
