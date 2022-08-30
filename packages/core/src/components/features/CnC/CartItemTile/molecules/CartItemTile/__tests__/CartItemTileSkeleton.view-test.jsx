import React from 'react';
import { shallow } from 'enzyme';
import { CartItemTileSkeletonVanilla } from '../skelton/CartItemTileSkelton.view';

describe('CartItemTileSkelton common component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'className',
    };
    const component = shallow(<CartItemTileSkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
