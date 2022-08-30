import React from 'react';
import { shallow } from 'enzyme';
import PromoListTile from '../PromoListTile.view.native';

describe('PromoListTile component', () => {
  it('should renders correctly withot anchor', () => {
    const props = {
      className: 'className',
      tileData: {
        class: null,
        headLine: [{ text: 'Shop Extra' }],
        subHeadLine: [{ text: 'Earn 10 points' }],
        image: { url: 'https://test4.childrensplace.com/wcsstore/static/images/tcp_star_bag.jpg' },
      },
    };
    const component = shallow(<PromoListTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with anchor in list', () => {
    const props = {
      className: 'className',
      tileData: {
        class: null,
        headLine: [{ text: 'Shop for Extra points' }],
        subHeadLine: [{ text: 'Earn 10 points' }],
        buttonList: [{ text: 'Apply Today' }],
        image: { url: 'https://test4.childrensplace.com/wcsstore/static/images/tcp_star_bag.jpg' },
      },
    };
    const component = shallow(<PromoListTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
