import React from 'react';
import { shallow } from 'enzyme';
import NavMenuLevel2View from '../views/NavMenuLevel2.view';

const LoremIpsum = 'Lorem Ipsum';

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
              },
            };
          }
          return 'GIRL';
        },
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    const item = component.props().renderItem({
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
              },
            };
          }
          return 'GIRL';
        },
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    const item = component.props().renderItem({
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
    const item = component.props().renderSectionHeader({
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
    const item = component.props().renderSectionHeader({
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
