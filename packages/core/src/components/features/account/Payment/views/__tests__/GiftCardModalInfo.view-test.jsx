import React from 'react';
// import { List } from 'immutable';
import { shallow } from 'enzyme';
import { GiftCardModalInfoVanilla } from '../GiftCardModalInfo.view';

describe('GiftCardModalInfo Component', () => {
  it('should render correctly', () => {
    const props = {
      data: {
        heading: 'abc',
        cardText: {
          expire: 'fgh',
          cardEnd: '111',
        },
        TotalExp: '123',
        getAccNumbr: 'www',
      },
    };
    const tree = shallow(<GiftCardModalInfoVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
