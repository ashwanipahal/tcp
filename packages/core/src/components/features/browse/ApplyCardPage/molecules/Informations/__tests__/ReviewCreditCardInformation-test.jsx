import React from 'react';
import { shallow } from 'enzyme';
import ReviewCreditCardInformation from '../ReviewCreditCardInformation';

describe('ReviewCreditCardInformation component', () => {
  it('should renders correctly', () => {
    const props = {
      creditCardHeader: '<h1>Contact Information</h1>',
    };
    const component = shallow(<ReviewCreditCardInformation {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when no arguments are passed', () => {
    const component = shallow(<ReviewCreditCardInformation />);
    expect(component).toMatchSnapshot();
  });
});
