import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/common/moduleH/mock';
import SlotB from '../SlotB';

describe('SlotB component', () => {
  it('SlotA component renders correctly', () => {
    const component = shallow(<SlotB {...mock} />);
    expect(component).toMatchSnapshot();
  });
});
