import React from 'react';
import { shallow } from 'enzyme';
import mock from './mock';
import { JeansModuleVanilla as JeanModule } from '../views/JeansModule.view';

describe('JeanModule component', () => {
  it('should default variant correctly', () => {
    const wrapper = shallow(<JeanModule jeansModule={mock.JeansModule} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });
});
