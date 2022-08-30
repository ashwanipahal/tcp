import React from 'react';
import { shallow } from 'enzyme';
import { ShopBySizeLink } from '../ShopBySize.style';
import ShopBySize from '../views/ShopBySize.view';

describe('ShopBySize', () => {
  it('should be defined', () => {
    expect(ShopBySize).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigate: () => {},
      links: [
        {
          url: '1',
          text: '1',
        },
      ],
      hasL3: true,
    };
    const component = shallow(<ShopBySize {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no l3', () => {
    const props = {
      navigate: () => {},
      links: [
        {
          url: '1',
          text: '1',
        },
      ],
      hasL3: false,
    };

    const component = shallow(<ShopBySize {...props} />);
    component
      .find(ShopBySizeLink)
      .props()
      .onPress();
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with l3', () => {
    const props = {
      navigate: () => {},
      links: [
        {
          url: '1',
          text: '1',
        },
      ],
      hasL3: true,
    };

    const component = shallow(<ShopBySize {...props} />);
    component
      .find(ShopBySizeLink)
      .props()
      .onPress();
    expect(component).toMatchSnapshot();
  });
});
