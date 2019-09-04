import React from 'react';
import { shallow } from 'enzyme';
import DropDownButton from '../DropDownButton';
import mock from '../../../../../services/abstractors/common/moduleB/mock';

const { ctaItems } = mock.moduleB.composites;

describe('DropDownButton component', () => {
  it('renders correctly', () => {
    const component = shallow(
      <DropDownButton className="test" buttonsData={ctaItems} dropdownLabel="Test" />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.test')).toHaveLength(1);
  });
});
