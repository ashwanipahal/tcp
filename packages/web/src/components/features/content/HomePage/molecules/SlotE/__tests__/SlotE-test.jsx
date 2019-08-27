import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleL/mock';
import SlotE from '../SlotE';

describe('SlotB component', () => {
  it('SlotA component renders correctly', () => {
    const component = shallow(<SlotE {...mock} />);
    expect(component).toMatchSnapshot();
  });
});
