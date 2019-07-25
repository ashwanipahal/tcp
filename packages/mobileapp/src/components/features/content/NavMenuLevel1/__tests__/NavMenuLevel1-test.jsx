import React from 'react';
import { shallow } from 'enzyme';

import NavMenuLevel1View from '../views/NavMenuLevel1.view';

const navItems = {
  data: {
    navigation: {
      nav: [
        {
          categoryContent: {
            isUnique: true,
            isShortImage: false,
            longDescription: 'long description 1',
            productCount: 1853,
            description: 'Sizes 4-141',
            groupIdentifier: '',
            name: 'Girl',
            id: '47511',
            mainCategory: {
              contentId: '47511',
              name: 'GIRL',
              set: [],
              promoBadges: [],
              categoryImages: [
                {
                  url:
                    'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
                  alt: 'Image Alt text attribute value',
                  title: 'Image Title attribute value',
                  crop_d: 'c_crop,g_face:center,q_auto:best,w_393',
                  crop_t: 'c_crop,g_face:center,q_auto:best,w_932',
                  crop_m: 'c_crop,g_face:center,q_auto:best,w_961',
                },
              ],
              sizesRanges: [
                {
                  text: 'SIZES 4-161',
                },
              ],
              categoryLayouts: [],
            },
          },
        },
      ],
    },
  },
};

const navItemsNoImage = {
  data: {
    navigation: {
      nav: [
        {
          categoryContent: {
            isUnique: true,
            isShortImage: false,
            longDescription: 'long description 2',
            productCount: 1853,
            description: 'Sizes 4-14',
            groupIdentifier: '',
            name: 'Girl',
            id: '47511',
            mainCategory: {
              contentId: '47511',
              name: 'GIRL',
              set: [],
              promoBadges: [],
              categoryImages: [],
              sizesRanges: [
                {
                  text: 'SIZES 4-16',
                },
              ],
              categoryLayouts: [],
            },
          },
        },
      ],
    },
  },
};

const navItemWithImageFirst = {
  data: {
    navigation: {
      nav: [
        {
          categoryContent: {
            isUnique: true,
            isShortImage: false,
            longDescription: 'long description 3',
            productCount: 1853,
            description: 'Sizes 4-14',
            groupIdentifier: '',
            name: 'Girl',
            id: '47511',
            mainCategory: {
              contentId: '47511',
              name: 'GIRL',
              set: [],
              promoBadges: [],
              categoryImages: [
                {
                  url:
                    'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
                  alt: 'Image Alt text attribute value',
                  title: 'Image Title attribute value',
                  crop_d: 'c_crop,g_face:center,q_auto:best,w_393',
                  crop_t: 'c_crop,g_face:center,q_auto:best,w_932',
                  crop_m: 'c_crop,g_face:center,q_auto:best,w_961',
                },
              ],
              sizesRanges: [
                {
                  text: 'SIZES 4-16',
                },
              ],
              categoryLayouts: [],
            },
            imageFirst: true,
          },
        },
      ],
    },
  },
};

describe('NavMenuLevel1', () => {
  it('should be defined', () => {
    expect(NavMenuLevel1View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: navItems,
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component when renderItem is called', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: navItems,
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    const item = component.props().renderItem({ item: navItems.data.navigation.nav[0] });
    expect(item).toMatchSnapshot();
  });

  it('should render component when keyExtractor is called', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: navItems,
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    const keyString = component.props().keyExtractor(1, 12);
    expect(keyString).toEqual('12');
  });

  it('should render component when renderItem is called without nav menu image', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: navItemsNoImage,
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    const item = component.props().renderItem({ item: navItemsNoImage.data.navigation.nav[0] });
    expect(item).toMatchSnapshot();
  });

  // TODO - Fix the test case to expect something after onPress
  it('should render component when renderItem is called with image first config', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: navItemWithImageFirst,
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    const item = shallow(
      component.props().renderItem({ item: navItemWithImageFirst.data.navigation.nav[0] })
    );
    item.props().onPress();
  });

  // TODO - Fix the test case to expect something after onPress
  it('should render component when renderItem is called without nav menu image', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: navItemsNoImage,
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    const item = shallow(
      component.props().renderItem({ item: navItemsNoImage.data.navigation.nav[0] })
    );
    item.simulate('press');
  });
});
