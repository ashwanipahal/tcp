import React from 'react';
import { shallow } from 'enzyme';
import { BirthdayCard } from '../BirthdayCard.view.native';

describe('BirthdayCard', () => {
  const component = shallow(
    <BirthdayCard
      name="test"
      birthYear="1998"
      birthMonth="08"
      gender="0"
      childId="12345"
      view="edit"
    />
  );

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
