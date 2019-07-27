import React from 'react';
import { shallow } from 'enzyme';
import { AddEditCreditCard } from '../AddEditCreditCard.view';

describe('AddEditCreditCard component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<AddEditCreditCard {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with error message', () => {
    const props = {
      labels: {},
      isEdit: true,
      errorMessage: 'There is some error',
    };
    const component = shallow(<AddEditCreditCard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
