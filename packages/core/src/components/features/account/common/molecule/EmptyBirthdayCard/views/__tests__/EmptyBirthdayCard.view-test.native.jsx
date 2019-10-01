import React from 'react';
import { shallow } from 'enzyme';
import { EmptyBirthdayCard } from '../EmptyBirthdayCard.view.native';

describe('EmptyBirthdayCard', () => {
  const component = shallow(<EmptyBirthdayCard view="edit" labels={{}} />);

  it('should render correctly for edit view', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render correctly for read view as well', () => {
    component.setProps({
      view: 'read',
    });

    expect(component).toMatchSnapshot();
  });
});
