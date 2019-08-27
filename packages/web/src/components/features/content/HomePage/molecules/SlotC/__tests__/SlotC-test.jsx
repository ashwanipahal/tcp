import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleA/mock';
import SlotC from '../SlotC';

describe('SlotB component', () => {
  it('SlotA component renders correctly', () => {
    const component = shallow(<SlotC {...mock} />);
    expect(component).toMatchSnapshot();
  });
});
