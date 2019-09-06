import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { BirthdaySavingsList, InfoMessage } from '../BirthdaySavingsList.view';
import EmptyBirthdayCard from '../../../../molecule/EmptyBirthdayCard';
import Notification from '../../../../../../../common/molecules/Notification';

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

  it('In read mode if no child is present, then only info message should be visible', () => {
    const props = {
      labels,
      childrenBirthdays: null,
      view: 'read',
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component.is(InfoMessage)).toBeTruthy();
  });

  it('In edit mode if no child is present, then 4 empty tiles should be visible', () => {
    const props = {
      labels,
      childrenBirthdays: null,
    };
    const component = shallow(<BirthdaySavingsList {...props} />);
    expect(component.find(EmptyBirthdayCard)).toHaveLength(4);
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

  describe('#instances', () => {
    const removeBirthday = jest.fn();
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
      component.instance().showRemoveModal({
        childId: '12345',
        childName: 'test',
      });
      expect(component.find('.cancelCta')).toHaveLength(1);
    });

    it('closeRemoveModal should close the remove modal', () => {
      component.instance().closeRemoveModal();
      expect(component.find('.cancelCta')).toHaveLength(0);
    });

    it('removeBirthdayHandler should call removeBirthday prop', () => {
      component.instance().removeBirthdayHandler({});
      expect(removeBirthday).toHaveBeenCalled();
    });

    it('on update status prop, Notification component should be rendered', () => {
      component.setProps({
        status: 'success',
        messageKey: 'lbl_profile_success',
      });
      expect(component.find(Notification)).toHaveLength(1);
    });

    describe('getColumnClasses', () => {
      it('should return elem-mb-LRG for read view and index less than 2', () => {
        expect(component.instance().getColumnClasses(false, 1)).toBe('elem-mb-LRG');
      });

      it('should return elem-mb-MED for edit view', () => {
        expect(component.instance().getColumnClasses(true, 3)).toBe('elem-mb-MED');
      });
    });

    describe('getColumnSize', () => {
      it('should return correct colSize for edit view', () => {
        expect(component.instance().getColumnSize(true)).toStrictEqual({
          small: 3,
          medium: 2,
          large: 3,
        });
      });

      it('should return correct colSize for read view', () => {
        expect(component.instance().getColumnSize(false)).toStrictEqual({
          small: 3,
          medium: 4,
          large: 6,
        });
      });
    });

    describe('getIgnoreGutter', () => {
      it('should return correct ignoreGutter for edit view', () => {
        expect(component.instance().getIgnoreGutter(true, 3)).toStrictEqual({
          small: true,
          medium: true,
          large: true,
        });
      });

      it('should return correct ignoreGutter for read view', () => {
        expect(component.instance().getIgnoreGutter(false, 3)).toStrictEqual({
          small: true,
          medium: true,
          large: true,
        });
      });
    });
  });
});

describe('InfoMessage component', () => {
  it('should render correctly', () => {
    const component = shallow(<InfoMessage labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
