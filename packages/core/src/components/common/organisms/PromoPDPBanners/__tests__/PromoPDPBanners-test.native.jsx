import React from 'react';
import { shallow } from 'enzyme';
import { PromoPDPBannersVanilla } from '../views/PromoPDPBanners.view.native';

describe('PromoPDPBannersVanilla native component', () => {
  let component;
  const props = {
    asPath: '',
    promos: [
      {
        richTextList: [{ text: 'Hello' }],
        contentId: '123',
        moduleName: 'moduleX',
        slotData: {},
      },
    ],
  };

  it('should match snapshot', () => {
    component = shallow(<PromoPDPBannersVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should match for moduleA', () => {
    const updatedParams = {
      asPath: '',
      navigation: {
        getParam: data => {
          return data;
        },
      },
      promos: [
        {
          richTextList: [{ text: 'Hello' }],
          contentId: '123',
          moduleName: 'moduleA',
          slotData: {},
        },
      ],
    };
    component = shallow(<PromoPDPBannersVanilla {...updatedParams} />);
    expect(component).toMatchSnapshot();
  });
});
