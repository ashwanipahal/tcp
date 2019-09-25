import React from 'react';
import { shallow } from 'enzyme';
import EmptyBirthdayCard from '../EmptyBirthdayCard.view';

describe('EmptyBirthdayCard', () => {
  const component = shallow(<EmptyBirthdayCard view="edit" labels={{}} className="test" />);

  it('should render correctly for edit view', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render correctly for read view as well', () => {
    component.setProps({
      view: 'read',
    });

    expect(component).toMatchSnapshot();
  });

  it('should render correctly for selected box', () => {
    component.setProps({
      view: 'read',
      active: 1,
      id: 1,
    });
    expect(component).toMatchSnapshot();
  });
});
