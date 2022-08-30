import React from 'react';
import { shallow } from 'enzyme';
import { AddChildBirthdayForm } from '../AddChild.view';

describe('AddChildBirthday component', () => {
  it('should renders correctly', () => {
    const props = {
      handleSubmit: jest.fn(),
      className: 'class',
      birthMonthOptionsMap: [],
      birthYearOptionsMap: [],
      timestamp: '',
      childOptions: [],
      closeAddModal: jest.fn(),
      addChildBirthdayLabels: {},
    };
    const component = shallow(<AddChildBirthdayForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
