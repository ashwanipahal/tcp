import React from 'react';
import { shallow } from 'enzyme';
import { BirthdayCard } from '../BirthdayCard.view';

describe('BirthdayCard', () => {
  const component = shallow(
    <BirthdayCard
      className="test"
      name="test"
      birthYear="1998"
      birthMonth="08"
      gender="0"
      childId="12345"
      removeBirthday={() => {}}
      view="edit"
    />
  );

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('close Button should be present in case of edit mode', () => {
    expect(
      component.find({
        className: 'closeIcon',
      })
    ).toHaveLength(1);
  });

  it('close Button should not be present in case of read mode', () => {
    component.setProps({
      view: 'read',
    });
    expect(
      component.find({
        className: 'closeIcon',
      })
    ).toHaveLength(0);
  });

  it('genderIcon src prop should be correctly set based on the gender prop passed', () => {
    component.setProps({
      gender: '1',
    });
    const genderIcon = component.find({
      className: 'genderIcon',
    });
    expect(genderIcon.prop('src')).toBe('/static/images/boy-icon.png');
  });
});
