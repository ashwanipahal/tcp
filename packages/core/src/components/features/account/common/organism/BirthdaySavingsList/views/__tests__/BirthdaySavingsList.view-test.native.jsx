import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import BirthdaySavingsList, { InfoMessage } from '../BirthdaySavingsList.view.native';
import EmptyBirthdayCard from '../../../../molecule/EmptyBirthdayCard';

const labels = {
  lbl_profile_personal_info_back: 'back',
  lbl_profile_birthday_savings: 'Birthday Savings',
  lbl_profile_birthday_saving_info:
    'Add up to 4 kids’ birthdays to your account and receive special savings during their birthday month!',
};

describe('BirthdaySavingsList component', () => {
  it('should renders correctly when childrenBirthdays are not present with read view', () => {
    const props = {
      labels,
      view: 'read',
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component).toMatchSnapshot();
  });

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
  it('should render BirthdayCard component if addChildBirthday is added', () => {
    const props = {
      labels: {},
      childrenBirthdays: fromJS([{ childId: '3434' }]),
      view: 'read',
      addChildBirthday: jest.fn(),
      removeBirthday: jest.fn(),
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component).toMatchSnapshot();
  });
});

describe('#instances', () => {
  const removeBirthday = jest.fn();
  const activeChild = {
    childId: '12345',
    childName: 'test',
  };
  const props = {
    labels: {
      lbl_profile_removeInfoText: 'dummy $childName$ dummy',
    },
    childrenBirthdays: fromJS([{ childId: '12345', childName: 'test' }]),
    removeBirthday,
    view: 'edit',
  };
  const component = shallow(<BirthdaySavingsList {...props} />);

  it('showRemoveModal should render remove modal', () => {
    component.instance().showRemoveModal(activeChild);
    expect(component.state('removeModal')).toBe(true);
  });

  it('closeRemoveModal should close the remove modal', () => {
    component.instance().closeRemoveModal();
    expect(component.state('removeModal')).toBe(false);
  });

  it('removeBirthdayHandler should call removeBirthday prop', () => {
    component.instance().removeBirthdayHandler({});
    expect(removeBirthday).toHaveBeenCalled();
  });
});

describe('InfoMessage component', () => {
  it('should render correctly', () => {
    const component = shallow(<InfoMessage labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
