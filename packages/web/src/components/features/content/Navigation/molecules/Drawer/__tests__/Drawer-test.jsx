import React from 'react';
import { shallow } from 'enzyme';
import { DrawerVanilla as Drawer } from '../Drawer';

let DrawerComp;

beforeEach(() => {
  DrawerComp = shallow(
    <Drawer
      mobile
      tablet
      open
      width={{
        small: '314px',
        medium: '314px',
        large: '100%',
      }}
    >
      Renders correctly
    </Drawer>
  );
});

describe('Drawer component', () => {
  it('renders correctly', () => {
    expect(DrawerComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(DrawerComp.find('.tcp-drawer')).toHaveLength(1);
  });
});
