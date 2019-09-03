import React from 'react';
import { shallow } from 'enzyme';
import DropDownCategoryButton from '../DropDownCategoryButton';
import mock from '../../../../../services/abstractors/common/moduleB/mock';

const { ctaItems } = mock.moduleB.composites;

describe('DropDownCategoryButton component', () => {
  it('renders correctly', () => {
    const component = shallow(
      <DropDownCategoryButton className="test" buttonsData={ctaItems} dropdownLabel="Test" />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.test')).toHaveLength(1);
  });
});
