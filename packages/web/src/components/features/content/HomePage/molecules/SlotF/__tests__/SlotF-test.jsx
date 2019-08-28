import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleK/mock';
import SlotF from '../SlotF';

describe('SlotF component', () => {
  it('SlotF component renders correctly', () => {
    const component = shallow(<SlotF {...mock} />);
    expect(component).toMatchSnapshot();
  });
});
