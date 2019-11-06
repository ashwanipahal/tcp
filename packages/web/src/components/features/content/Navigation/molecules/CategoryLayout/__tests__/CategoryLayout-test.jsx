import React from 'react';

import { shallow } from 'enzyme';
import { CategoryLayoutVanilla as CategoryLayout } from '../views/CategoryLayout';

describe('Category Layout Component', () => {
  it('renders correctly', () => {
    const mock = [
      {
        name: 'threeColumns',
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
          {
            imageBanner: [
              {
                image: {
                  url:
                    'https://test5.childrensplace.com/image/upload/v1565180960/navigation_teaser_seesk1.jpg',
                  alt: 'Shop Bsig & Lil Sis',
                  title: 'Shop Big & Lil Sis',
                  crop_d: '',
                  crop_m: '',
                  crop_t: '',
                },
                link: {
                  url: '/Shop-Big-Lil-Sis',
                  text: 'Shop Bifg & Lil Sis',
                  title: 'Shop Big & Lil Sis',
                  target: '_blank',
                  external: 0,
                },
              },
            ],
            textBanner: null,
            shopBySize: null,
          },
          {
            imageBanner: null,
            textBanner: [
              {
                link: {
                  url: 'http://rwd-int1.childrensplace.com/us/home?true',
                  text: '',
                  target: '',
                  title: '',
                  external: 0,
                },
                textItems: [
                  {
                    style: 'style1',
                    text: '60%',
                  },
                  {
                    style: '',
                    text: 'ALL DAY',
                  },
                ],
              },
            ],
            shopBySize: null,
          },
        ],
      },
    ];
    const hideL2Nav = jest.fn();
    const categoryLayoutComp = shallow(
      <CategoryLayout categoryLayout={mock} l1Index={0} hideL2Nav={hideL2Nav} panelColCount={4} />
    );
    expect(categoryLayoutComp).toMatchSnapshot();
  });
});
