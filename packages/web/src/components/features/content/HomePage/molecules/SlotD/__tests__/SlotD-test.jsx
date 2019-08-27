import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleN/mock';
import SlotD from '../SlotD';

describe('SlotB component', () => {
  it('SlotA component renders correctly', () => {
    const component = shallow(<SlotD {...mock} />);
    expect(component).toMatchSnapshot();
  });
});
