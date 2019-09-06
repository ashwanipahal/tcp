import React from 'react';
import { shallow } from 'enzyme';
import { BirthdaySavings, mapDispatchToProps } from '../BirthdaySavingsList.container';
import BirthdaySavingsComponent from '../../views/BirthdaySavingsList.view';

describe('BirthdaySavingsList container', () => {
  it('should render BirthdaySavingsComponent', () => {
    const component = shallow(
      <BirthdaySavings
        childrenBirthdays={[{}]}
        labels={{}}
        getChildrenBirthdays={() => {}}
        removeBirthday={() => {}}
      />
    );
    expect(component.is(BirthdaySavingsComponent)).toBeTruthy();
  });

  it('should call getChildrenBirthdays prop on mount', () => {
    const getChildrenBirthdays = jest.fn();
    shallow(
      <BirthdaySavings
        labels={{}}
        getChildrenBirthdays={getChildrenBirthdays}
        removeBirthday={() => {}}
      />
    );
    expect(getChildrenBirthdays).toHaveBeenCalled();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action getChildrenBirthdays which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getChildrenBirthdays();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action removeBirthday which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.removeBirthday();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
