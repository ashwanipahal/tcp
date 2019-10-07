import React from 'react';
import { shallow } from 'enzyme';
import { PromoListTileVanilla } from '../PromoListTile.view';

describe('PromoListTile component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'className',
      tileData: {
        class: null,
        headLine: [{ text: 'Shop Extra' }],
        subHeadLine: [{ text: 'Earn 10 points' }],
        buttonList: [{ text: 'Apply now' }],
        image: { url: 'https://test4.childrensplace.com/wcsstore/static/images/tcp_star_bag.jpg' },
      },
    };
    const component = shallow(<PromoListTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
