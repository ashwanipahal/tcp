import React from 'react';
import { shallow } from 'enzyme';
import { PickUpContactDisplayVanilla } from '../views/PickUpContactDisplay.view.native';

describe('PickUpContactDisplayVanilla component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      labels: {},
      className: '',
      formData: {
        firstName: '',
        lastName: '',
        emailAddress: 'abc@gmail.com',
        phoneNumber: '87887788787',
      },
    };
    const component = shallow(<PickUpContactDisplayVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
