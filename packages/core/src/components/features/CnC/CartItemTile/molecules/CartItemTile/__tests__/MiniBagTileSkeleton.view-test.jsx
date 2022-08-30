import React from 'react';
import { shallow } from 'enzyme';
import { MiniBagTileSkeletonVanilla } from '../skelton/MiniBagTileSkeleton.view';

describe('MiniBagTileSkelton common component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'className',
    };
    const component = shallow(<MiniBagTileSkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
