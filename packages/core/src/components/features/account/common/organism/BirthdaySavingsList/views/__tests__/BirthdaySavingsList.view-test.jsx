import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import {
  BirthdaySavingsList,
  getColumnClasses,
  getColumnSize,
  getIgnoreGutter,
} from '../BirthdaySavingsList.view';
import EmptyBirthdayCard from '../../../../molecule/EmptyBirthdayCard';

const labels = {
  lbl_profile_personal_info_back: 'back',
  lbl_profile_birthday_savings: 'Birthday Savings',
  lbl_profile_birthday_saving_info:
    'Add up to 4 kids’ birthdays to your account and receive special savings during their birthday month!',
};

describe('BirthdaySavingsList component', () => {
  it('should renders correctly when childrenBirthdays are not present', () => {
    const props = {
      labels,
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when childrenBirthdays are present', () => {
    const props = {
      labels,
      childrenBirthdays: fromJS([{ childId: '12345' }]),
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correct number of emptyBirthdayCard component if childrenBirthdays are less than 4', () => {
    const props = {
      labels,
      childrenBirthdays: fromJS([{ childId: '12345' }]),
      view: 'read',
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component.find(EmptyBirthdayCard)).toHaveLength(3);
  });

  it('should render 4 tiles in edit mode if no birthdays are present', () => {
    const props = {
      labels,
      childrenBirthdays: null,
      view: 'edit',
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component.find(EmptyBirthdayCard)).toHaveLength(4);
  });
});

describe('getColumnClasses', () => {
  it('should return elem-mb-LRG for read view and index less than 2', () => {
    expect(getColumnClasses(false, 1)).toBe('elem-mb-LRG');
  });

  it('should return elem-mb-MED for edit view', () => {
    expect(getColumnClasses(true, 3)).toBe('elem-mb-MED');
  });
});

describe('getColumnSize', () => {
  it('should return correct colSize for edit view', () => {
    expect(getColumnSize(true)).toStrictEqual({
      small: 3,
      medium: 2,
      large: 3,
    });
  });

  it('should return correct colSize for read view', () => {
    expect(getColumnSize(false)).toStrictEqual({
      small: 3,
      medium: 4,
      large: 6,
    });
  });
});

describe('getIgnoreGutter', () => {
  it('should return correct ignoreGutter for edit view', () => {
    expect(getIgnoreGutter(true, 3)).toStrictEqual({
      small: true,
      medium: true,
      large: true,
    });
  });

  it('should return correct ignoreGutter for read view', () => {
    expect(getIgnoreGutter(false, 3)).toStrictEqual({
      small: true,
      medium: true,
      large: true,
    });
  });
});
