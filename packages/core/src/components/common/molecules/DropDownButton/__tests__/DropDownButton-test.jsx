import React from 'react';
import { shallow } from 'enzyme';
import { DropDownButtonVanilla as DropDownButton } from '../DropDownButton';
import mock from '../../../../../services/abstractors/common/moduleB/mock';

const { ctaItems } = mock.composites;

describe('DropDownButton component', () => {
  it('renders correctly', () => {
    const component = shallow(
      <DropDownButton className="test" buttonsData={ctaItems} dropdownLabel="Test" />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.test')).toHaveLength(1);
  });

  it('toggle panel function called', () => {
    const component = shallow(
      <DropDownButton className="test" buttonsData={ctaItems} dropdownLabel="Test" />
    );
    component.find('.dropdown-button').simulate('click');
    expect(component.state('open')).toBe(true);
  });

  it('open dropdown function called', () => {
    const component = shallow(
      <DropDownButton className="test" buttonsData={ctaItems} dropdownLabel="Test" />
    );
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, true);
    document.body.dispatchEvent(evt);
    expect(component.state('open')).toBe(false);
  });
});
