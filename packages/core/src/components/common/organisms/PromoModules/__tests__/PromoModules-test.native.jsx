import React from 'react';
import { shallow } from 'enzyme';
import { PromoModulesVanilla } from '../views/PromoModules.view.native';

describe('PromoModulesVanilla native component', () => {
  let component;
  const props = {
    asPath: ['10', '2'],
    userType: true,
    plpTopPromos: [
      {
        richTextList: [{ text: 'Hello' }],
        contentId: '123',
        moduleName: 'moduleX',
        slotData: {},
      },
    ],
  };

  it('should match snapshot', () => {
    component = shallow(<PromoModulesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should match for moduleA', () => {
    const updatedParams = {
      asPath: '',
      userType: true,
      navigation: {
        getParam: data => {
          return data;
        },
      },
      plpTopPromos: [
        {
          richTextList: [{ text: 'Hello' }],
          contentId: '123',
          moduleName: 'moduleA',
          slotData: {},
        },
      ],
    };
    component = shallow(<PromoModulesVanilla {...updatedParams} />);
    expect(component).toMatchSnapshot();
  });
});
