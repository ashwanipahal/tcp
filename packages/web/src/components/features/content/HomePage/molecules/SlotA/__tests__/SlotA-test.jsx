import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleA/mock';
import SlotA from '../SlotA';

describe('SlotA component', () => {
  it('SlotA component renders correctly', () => {
    const component = shallow(<SlotA {...mock.moduleA} />);
    expect(component).toMatchSnapshot();
  });
});
