import React from 'react';
import { shallow } from 'enzyme';
import { getBirthDateOptionMap, childOptionsMap } from '@tcp/core/src/utils';
import { AddChildBirthdayFormVanilla } from '../AddChild.view';

describe('AddChildBirthday component', () => {
  it('should renders correctly', () => {
    const yearOptionsMap = getBirthDateOptionMap();
    const childOptions = childOptionsMap();
    const props = {
      handleSubmit: jest.fn(),
      className: 'any',
      birthMonthOptionsMap: yearOptionsMap.monthsMap,
      birthYearOptionsMap: childOptions.yearsMap,
      timestamp: '',
      childOptions: childOptions.genderMap,
      closeAddModal: jest.fn(),
      addChildBirthdayLabels: {},
    };
    const component = shallow(<AddChildBirthdayFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
