import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleQ/mock';
import StyliticsProductTabList from '../../../organisms/StyliticsProductTabList';
import { ModuleQVanilla as ModuleQ } from '../views/ModuleQ';

let ModuleQComp;
const styliticsProductTabList = {
  '2044392_10': [
    {
      id: 138548,
      imageUrl:
        '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/138548/lookbook.png',
      largeImageUrl:
        '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/138548/original.png',
      items: [
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/936320/small.png',
          name: 'Girls Uniform Cardigan',
          remoteId: '2101602_054',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/277231/small.png',
          name: 'Girls Uniform Pintuck Poplin Button Down Shirt 1',
          remoteId: '2044392_10',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/358504/small.png',
          name: 'Girls Uniform Ponte Knit Pull On Jeggings',
          remoteId: '2110252_IV',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/934353/small.png',
          name: 'Girls Uniform T Strap Sneakers',
          remoteId: '2623363_IV',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/938041/small.png',
          name: 'Girls Digital Watch',
          remoteId: '2079174_BQ',
        },
      ],
      pdpUrl:
        'https://www.childrensplace.com/us/outfit/138548/2101602_054-2044392_10-2110252_IV-2623363_IV-2079174_BQ',
    },
    {
      id: 141076,
      imageUrl:
        '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/141076/lookbook.png',
      largeImageUrl:
        '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/141076/original.png',
      items: [
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/277231/small.png',
          name: 'Girls Uniform Pintuck Poplin Button Down Shirt',
          remoteId: '2044392_10',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/276960/small.png',
          name: 'Girls Uniform Skinny Chino Pants',
          remoteId: '2045419_9S',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/934353/small.png',
          name: 'Girls Uniform T Strap Sneakers',
          remoteId: '2623363_IV',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/938041/small.png',
          name: 'Girls Digital Watch',
          remoteId: '2079174_BQ',
        },
        {
          smallImageUrl:
            '//stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/items/938048/small.png',
          name: 'Girls Uniform Windbreaker',
          remoteId: '3001063_IV',
        },
      ],
      pdpUrl:
        'https://www.childrensplace.com/us/outfit/141076/2044392_10-2045419_9S-2623363_IV-2079174_BQ-3001063_IV',
    },
  ],
};
const singleCTAButton = {
  url: 'http://www.childrensplace.com',
  text: 'SHOP ALL 3',
  title: 'SHOP ALL',
  target: '',
  external: 0,
  action: '',
};

beforeEach(() => {
  const wrapper = shallow(
    <ModuleQ
      {...mock.moduleQ.composites}
      styliticsProductTabList={styliticsProductTabList}
      singleCTAButton={singleCTAButton}
    />
  );
  ModuleQComp = wrapper;
});

describe('ModuleQ component', () => {
  it('renders correctly', () => {
    expect(ModuleQComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(ModuleQComp.find('.moduleQ-header')).toHaveLength(1);
  });

  it('Module has promo banner', () => {
    expect(ModuleQComp.find('.moduleQ-promo')).toHaveLength(1);
  });

  it('Module has tab list', () => {
    expect(ModuleQComp.find(StyliticsProductTabList)).toHaveLength(1);
  });

  it('Module has carousel', () => {
    expect(ModuleQComp.find('.moduleQ__carousel-wrapper')).toHaveLength(1);
  });

  it('Module renders carousel items', () => {
    ModuleQComp.instance().getSlideItem(styliticsProductTabList['2044392_10'][0], '1');
  });

  it('Module should set current item state', () => {
    ModuleQComp.instance().onProductTabChange('2044392_10', styliticsProductTabList['2044392_10']);
  });
});
