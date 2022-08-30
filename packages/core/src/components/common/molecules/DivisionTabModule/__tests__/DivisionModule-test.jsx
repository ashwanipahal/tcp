import React from 'react';
import { shallow } from 'enzyme';
import mock from './mock';
import { DivisionTabModuleVanilla as DivisionTabModule } from '../views/DivisionTabModule.view';

describe('DivisionTabModule component', () => {
  it('should default variant correctly', () => {
    const wrapper = shallow(<DivisionTabModule data={mock.DivisionModule} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });
});
