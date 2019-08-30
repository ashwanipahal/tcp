import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleN/mock';
import SlotD from '../SlotD';

describe('SlotD component', () => {
  it('SlotD component renders correctly', () => {
    const component = shallow(<SlotD {...mock} />);
    expect(component).toMatchSnapshot();
  });
});
