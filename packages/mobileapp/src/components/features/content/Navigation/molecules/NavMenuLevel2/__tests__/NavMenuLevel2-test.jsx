import React from 'react';
import { shallow } from 'enzyme';
import NavMenuLevel2View from '../views/NavMenuLevel2.view';

const LoremIpsum = 'Lorem Ipsum';
const categoryContent = {
  categoryContent: {
    description: 'Sizes 4-16',
    name: 'Girl',
    id: '47511',
    seoUrl: null,
    seoToken: 'girls-clothing',
    mainCategory: {
      categoryImage: [
        {
          url: 'https://res.cloudinary.com/tcp-dam-test/image/upload/v1565110717/fill_rvnwi1.png',
          alt: '',
          title: 'GIRL1',
          crop_d: '',
          crop_m: 'c_crop,g_face:center,q_auto:best,w_18',
          crop_t: '',
          position: 'left',
        },
      ],
      categoryLayout: [
        {
          name: 'shopBySizeTwoColumns',
          columns: [
            {
              imageBanner: null,
              textBanner: null,
              shopBySize: [
                {
                  text: {
                    text: 'SHOP BY SIZE',
                  },
                  linkList: [
                    {
                      url: '/test',
                      text: '4',
                      title: '4',
                      target: '',
                    },
                    {
                      url: '/test',
                      text: '5',
                      title: '5',
                      target: '',
                    },
                    {
                      url: '/test',
                      text: '6',
                      title: '6',
                      target: '',
                    },
                    {
                      url: '/test',
                      text: '7',
                      title: '7',
                      target: '',
                    },
                  ],
                  richText: null,
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
const paramFunc = param => {
  if (param === 'navigationObj') {
    return {
      item: {
        subCategories: [
          {
            title: 'Lorem',
          },
          {
            title: 'Categoriess',
          },
        ],
        ...categoryContent,
      },
    };
  }
  return 'GIRL';
};

describe('NavMenuLevel2', () => {
  it('should be defined', () => {
    expect(NavMenuLevel2View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        getParam: paramFunc,
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component when renderItem is called', () => {
    const props = {
      navigation: {
        getParam: param => {
          if (param === 'navigationObj') {
            return {
              item: {
                subCategories: [
                  {
                    title: LoremIpsum,
                  },
                  {
                    title: 'Categoriess',
                  },
                ],
                ...categoryContent,
              },
            };
          }
          return 'GIRL';
        },
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    const sectionList = component.find('SectionList');
    const item = sectionList.props().renderItem({
      section: {
        title: LoremIpsum,
      },
      item: {
        subCategories: [
          {
            title: 'abcd',
          },
        ],
        categoryContent: {
          mainCategory: {
            promoBadge: [
              {
                text: '1',
              },
            ],
          },
        },
      },
    });
    expect(item).toMatchSnapshot();
  });

  it('should render component when renderItem is with title categories called', () => {
    const props = {
      navigation: {
        getParam: param => {
          if (param === 'navigationObj') {
            return {
              item: {
                subCategories: [
                  {
                    title: LoremIpsum,
                  },
                  {
                    title: 'Categories',
                  },
                ],
                ...categoryContent,
              },
            };
          }
          return 'GIRL';
        },
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    const sectionList = component.find('SectionList');

    const item = sectionList.props().renderItem({
      section: {
        title: 'Categories',
      },
      item: {
        subCategories: [
          {
            title: 'abcd',
          },
        ],
        categoryContent: {
          mainCategory: {
            promoBadge: [
              {
                text: '1',
              },
            ],
          },
        },
      },
    });
    expect(item).toMatchSnapshot();
  });

  it('should render component when renderSectionHeader is called', () => {
    const props = {
      navigation: {
        getParam: paramFunc,
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    const sectionList = component.find('SectionList');
    const item = sectionList.props().renderSectionHeader({
      section: {
        title: LoremIpsum,
      },
      item: {
        subCategories: [
          {
            title: 'abcd',
          },
        ],
        categoryContent: {
          mainCategory: {
            promoBadge: [
              {
                text: '1',
              },
            ],
          },
        },
      },
    });
    expect(item).toMatchSnapshot();
  });

  it('should render component when renderSectionHeader is called with Categories', () => {
    const props = {
      navigation: {
        getParam: paramFunc,
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    const sectionList = component.find('SectionList');
    const item = sectionList.props().renderSectionHeader({
      section: {
        title: 'Categories',
      },
      item: {
        subCategories: [
          {
            title: 'abcd',
          },
        ],
        categoryContent: {
          mainCategory: {
            promoBadge: [
              {
                text: '1',
              },
            ],
          },
        },
      },
    });
    expect(item).toMatchSnapshot();
  });
});
