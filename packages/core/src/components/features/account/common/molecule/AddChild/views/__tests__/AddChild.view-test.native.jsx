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

describe('Dropdown functions', () => {
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

  it('should call onGenderChangeValue', async () => {
    const component = shallow(<AddChildBirthdayForm {...props} />);
    component.instance().onGenderChangeValue('', '');
  });

  it('should call onUserBirthMonthChangeValue', async () => {
    const component = shallow(<AddChildBirthdayForm {...props} />);
    component.instance().onUserBirthMonthChangeValue('', '');
  });

  it('should call onUserBirthYear', async () => {
    const component = shallow(<AddChildBirthdayForm {...props} />);
    component.instance().onUserBirthYear('', '');
  });
});
