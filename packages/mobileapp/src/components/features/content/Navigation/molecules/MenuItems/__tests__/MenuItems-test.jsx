import React from 'react';
import { shallow } from 'enzyme';
import { PromoAndArrowContainer } from '../MenuItems.style';
import MenuItems from '../views/MenuItems.view';

describe('MenuItems', () => {
  it('should be defined', () => {
    expect(MenuItems).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigate: () => {},
      maxWidthItem: '',
      item: {
        categoryContent: {
          name: 'abcd',
          mainCategory: {
            promoBadge: [
              {
                text: 'promo',
              },
            ],
          },
        },
      },
      hasBadge: false,
      promoBannerMargin: '',
      hasL3: false,
    };
    const component = shallow(<MenuItems {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with badges and submenu', () => {
    const props = {
      navigate: () => {},
      maxWidthItem: '',
      item: {
        categoryContent: {
          name: 'abcd',
          mainCategory: {
            promoBadge: [
              {
                text: 'promo',
              },
            ],
          },
        },
      },
      hasBadge: true,
      promoBannerMargin: '',
      hasL3: true,
    };
    const component = shallow(<MenuItems {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should trigger the press event with l3', () => {
    const props = {
      navigate: () => {},
      maxWidthItem: '',
      item: {
        categoryContent: {
          name: 'abcd',
          mainCategory: {
            promoBadge: [
              {
                text: 'promo',
              },
            ],
          },
        },
      },
      hasBadge: true,
      promoBannerMargin: '',
      hasL3: true,
    };
    const component = shallow(<MenuItems {...props} />);
    component
      .find(PromoAndArrowContainer)
      .props()
      .onPress();
    expect(component).toMatchSnapshot();
  });

  it('should trigger the press event without l3', () => {
    const props = {
      navigate: () => {},
      maxWidthItem: '',
      item: {
        categoryContent: {
          name: 'abcd',
          mainCategory: {
            promoBadge: [
              {
                text: 'promo',
              },
            ],
          },
        },
      },
      hasBadge: true,
      promoBannerMargin: '',
      hasL3: false,
    };
    const component = shallow(<MenuItems {...props} />);
    component
      .find(PromoAndArrowContainer)
      .props()
      .onPress();
    expect(component).toMatchSnapshot();
  });
});
